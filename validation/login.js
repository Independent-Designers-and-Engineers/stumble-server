const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data){
    let errors = {};

    let { phoneNumber, password } = data;

    phoneNumber = !isEmpty(phoneNumber) ? phoneNumber : "";
    password = !isEmpty(password) ? password : "";

    if(Validator.isEmpty(phoneNumber)){
        errors.phoneNumber = "Phone Number is required.";
    }
    else if(!Validator.isMobilePhone(phoneNumber)){
        errors.phoneNumber = "Enter a valid Phone Number.";
    }

    if(Validator.isEmpty(password)){
        errors.password = "Password is required.";
    }
    else if(!Validator.isLength(password, {min: 8})){
        errors.password = "Password must be a minimum of 8 characters.";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};


