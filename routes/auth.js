const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const {registerValidation, loginValidation} = require('../validation')



/******************** REGISTER ********************/
router.post('/register', async (req, res) => {
    
    // VALIDATE DATA
    const {error} = registerValidation(req.body)
    if(error) return res.send('Invalid data!')

    // CHECK IF USER ALREADY EXISTS
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.send('User already exists!')

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    
    // IF USER IS VALID THEN REGISTER NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    })

    try {
        const savedUser = await user.save()
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.cookie('authCookie', token, {httpOnly: true})
        res.send('Signed up successfully!')
    } catch (error) {
        res.status(400).send(error)
    }
})
/******************** REGISTER ********************/



/******************** LOGIN ********************/
router.post('/login', async (req, res, next) => {

    // console.log(req.body);

    // VALIDATE DATA
    const {error} = loginValidation(req.body)
    if(error) return res.json({message: 'Invalid email or password', isLoggedIn: false})

    // CHECK IF THE EMAIL EXISTS
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.json({message: 'Invalid email or password', isLoggedIn: false})

    // CHECK PASSWORD
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.json({message: "Email and password don't match!", isLoggedIn: false})

    // CREATE A JWT
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    // console.log(token);
    // res.header('auth-token', token).send(token)
    res.cookie('authCookie', token, {httpOnly: true})
    res.json({message: 'Logged in successfully', isLoggedIn: true})
})
/******************** LOGIN ********************/



/******************** LOGOUT ********************/
router.get('/logout', (req, res, next) => {
    // res.cookie('authCookie', req.cookies.authCookie, {maxAge: 0})
    res.clearCookie('authCookie')
    // console.log(req.cookies);
    res.end()
    // next()
})
/******************** LOGOUT ********************/
module.exports = router