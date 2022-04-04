const router = require("express").Router();
const User = require("../model/User");
const verify = require('./verifyToken')

/******************** HOME ********************/
router.get('/home', verify, async (req, res, next) => {
    const user = await User.findById(req.user._id)
    res.json(user)
    next()
})
/******************** HOME ********************/



/******************** DASHBOARD ********************/
router.get('/dashboard', verify, async (req, res, next) => {
    const user = await User.findById(req.user._id)
    res.json(user)
    next()
})

router.get('/delete', verify, async (req, res, next) => {
    try {
        await User.deleteOne({_id: req.user._id})
    } catch (error) {
        console.log(error);
    }
    res.clearCookie('authCookie')
    res.send('User deleted!')
    // next()
})
/******************** DASHBOARD ********************/



module.exports = router