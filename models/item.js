const mongoose = require("mongoose");
const Schema = mongoose.Schema


const userSchema = new Schema ({
    username: String,
    email: String,
    password: String,
    password2: String
});

const user = mongoose.model('User', userSchema);

module.exports = userSchema;
module.exports = user;