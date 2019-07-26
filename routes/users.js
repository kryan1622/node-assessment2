const express = require("express");
const router = express.Router();
const item = require("../models/item.js")

//@route POST users/create
//desc creates new user
//@access public

router.post("/create", (req,res) => {
    const use = new item({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    use.save().then(() => {
        res.send('complete');
    });
})


module.exports = router;