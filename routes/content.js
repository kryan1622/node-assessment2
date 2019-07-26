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
    const use = new item({
        username: req.body.username,
        content: req.body.content,
        email: req.body.email,
        password: req.body.password
    });
    item.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                errors.username = "User does not exists!";
                res.status(404).send(errors);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(req.body.email, salt, (err, hash) => {
                                    if (err) throw err;
                                    use.email = hash;
                                    use.save().then(() => {
                                        res.send('complete');
                                    });
                                });
                            });
                        } else {
                            errors.password = "Password does not match username";
                            res.status(404).send(errors);
                        }
                    })
            }

        })
        .catch(err => res.status(404).send(err));


});



//@route GET content/read
//@desc gets content
//@access public


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

router.put("/updateItem", (req, res) => {

    const use = new item({
        username: req.body.username,
        content: req.body.content
    });

    item.findOne({ username: req.body.username })
        .then(items => {
            if (!items) {
                errors.noItem = "User does not exist";
                res.status(404).json(errors);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        items.remove().then(() => {
                            res.json({ success: "Content updated" });
                        })
                            .catch(err =>
                                res.status(404).json({ itemnotfound: "No User found" })
                            );

                        use.save().then(item => res.json(item))
                            .catch(err => console.log(err));

                    })
                    .catch(err => res.status(404).json({ noItem: "User does not exist" }));
            }
        });
});

//@route DELETE content/delete
//@desc deletes some content
//@access public

router.delete("/deleteUser", (req, res) => {
    let errors = {};
    item.findOne({ username: req.body.username }).then(user => {
        if (user => {
            if (!user) {
                errors.username = "User does not exist";
                res.status(404).send(errors);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.password = "Password does not match username";
                            res.status(404).send(errors);
                        } else {

                            item.remove().then(() => {
                                res.send("Success");
                            })
                                .catch(err =>
                                    res.status(404).json({ itemnotfound: "No item found" })
                                );
                        }

                    });



            }
        });
    }).catch(err => res.status(404).json({ noItem: "There is no item with that is" }));
});


module.exports = router;