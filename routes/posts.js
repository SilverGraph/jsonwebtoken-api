const router = require("express").Router();
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
    res.send(req.user)
    // res.json({
    //     posts: {
    //         title: "Random data you shouldn't access!"
    //     }
    // })
})

module.exports = router