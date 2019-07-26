const express = require("express");
const router = express.Router();
const item = require("../models/item.js")
const bcrypt = require("bcrypt");
const Validation = require("../validation/validate.js")

//@route POST users/create
//desc creates new user
//@access public

router.post("/create", (req,res) => {
    const inValid = Validation(req.body);
    if (!inValid.isValid){
        return res.status(400).json(inValid.errors);
    }
    const use = new item({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(req.body.password, salt, (err,hash) => {
            if (err) throw err;
            use.password = hash;
            use.save().then(() => {
            res.send('complete');
           });
        });
    }); 
});

//@route GET users/get
//@desc get users method created to test create methos was working as expected

router.get("/get", (req,res) => {
item.find().then(items => {
    res.json(items);
})
.catch(err => res.status(404).json({ noItems: "There are no items"}));
});



module.exports = router;