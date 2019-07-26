const mongoose = require("mongoose");
const Schema = mongoose.Schema


const userSchema = new Schema ({
    username: String,
    email: String,
    password: String,
    password2: String
});

const user = mongoose.model('User', userSchema);

const contentSchema = new Schema ({
    username: String,
    content: {
        type: String,
        required: true,
        maxlength:500
    },
    email:String
})

const item = mongoose.model('Content', contentSchema);

module.exports = contentSchema;
module.exports = item;
module.exports = userSchema;
module.exports = user;