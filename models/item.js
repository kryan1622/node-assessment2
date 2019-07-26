const mongoose = require("mongoose");
const Schema = mongoose.Schema


const userSchema = new Schema ({
    username: String,
    email: String,
    password: {
        type: String,
        required: true,
        maxlength:8
    }
});

const user = mongoose.model('User', userSchema);

module.exports = userSchema;
module.exports = user;