const express = require("express");
const app = express();
const router = express.Router();
const newArr = new Array();
const lodash = require("lodash");
const Validation = require("../validation/validate.js")
const item = require("../models/item.js");
const bcrypt = require("bcrypt");

//@route POST content/create
//@desc creates some content
//@access public

router.post("/createContent", (req, res) => {
    const errors = {};
    // const inValid = Validation(req.body);
    // if (!inValid.isValid) {
    //     return res.status(400).json(inValid.errors);
    // }
    const use = new item({
        username: req.body.username,
        content: req.body.content,
        email: req.body.email
    });
    item.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
            errors.username = "User does not exists!";
                res.status(404).send(errors);
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.email, salt, (err, hash) => {
                        if (err) throw err;
                        use.email = hash;
                        use.save().then(() => {
                            res.send('complete');
                        });
                    });
                });
            }
        })
    .catch(err => res.status(404).send(err));
});



//@route GET content/read
//@desc gets content
//@access public

router.get("/get", (req, res) => {
    res.send(newArr);
});

router.get("/getAll", (req, res) => {
    item.find({}, '-email -__v -password -password2')
        .then(items => {
            res.json(items);
        })
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

//@route PUT content/update
//@desc updates some content
//@access public

router.put("/put", (req, res) => {
    lodash.set(newArr, req.body.index, req.body.item);
    res.send(newArr);
});


router.put("/update", (req, res) => {
    item.updateOne({ 'username': req.body.username },
        { $set: { 'content': req.body.content } })
        .then(() =>
            res.send('updated'));
});

//@route DELETE content/delete
//@desc deletes some content
//@access public

router.delete("/deleteUser", (req, res) => {
    let errors = {};
    const email = req.body.email;
    const id = req.body._id;

    item.findById(req.body._id).then(item => {
        bcrypt.compare(req.body.email, item.email).then(isMatch => {
            if (isMatch) {
                item.remove().then(() => {
                    res.send("sucess");
                })
                    .catch(err =>
                        res.status(404).json({ itemnotfound: "No item found" })
                    );
            } else {
                errors.email = "Email Incorrect";
                return res.status(400).json(errors)
            }
        });
    }).catch(err => res.status(404).json({ noItem: "There is no item with that is" }));
});


module.exports = router;