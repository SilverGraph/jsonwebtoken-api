const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const {registerValidation, loginValidation} = require('../validation')



/******************** REGISTER ********************/
router.post('/register', async (req, res) => {
    
    // VALIDATE DATA
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // CHECK IF USER ALREADY EXISTS
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('User already exists!')

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
        res.send({user: user._id})
    } catch (error) {
        res.status(400).send(error)
    }
})
/******************** REGISTER ********************/



/******************** LOGIN ********************/
router.post('/login', async (req, res) => {

    // VALIDATE DATA
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // CHECK IF THE EMAIL EXISTS
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email or password is wrong!')

    // CHECK PASSWORD
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Password was wrong!')

    // CREATE A JWT
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
    
    // res.send('Logged in successfully!')
})
/******************** LOGIN ********************/



module.exports = router