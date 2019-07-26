const Validator = require("validator")
const isEmpty = require("./isEmpty.js")

module.exports = function validateCredentials(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.username = !isEmpty(data.username) ? data.username : "";

    if (!Validator.isAlphanumeric(data.username)){
        errors.username = "Username must only contain letters or numbers";
    }
    
    if (Validator.isEmpty(data.username)){
        errors.username = "Please enter a valid username";
    }

    if (!Validator.isEmail(data.email)){
        errors.email = "Email entered is not valid";
    }

    if (Validator.isEmpty(data.email)){
        errors.email = "Please enter a valid email";
    }

    if (!Validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords do not match"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}