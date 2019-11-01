const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateCreateInput = data => {
    let errors = {};
    let { firstName, lastName, phoneNumber, password, dateOfBirth } = data;

    firstName = !isEmpty(firstName) ? firstName : "";
    lastName = !isEmpty(lastName) ? lastName : "";
    phoneNumber = !isEmpty(phoneNumber) ? phoneNumber : "";
    password = !isEmpty(password) ? password : "";
    dateOfBirth = !isEmpty(dateOfBirth) ? dateOfBirth : "";

    if(Validator.isEmpty(phoneNumber)){
        errors.phoneNumber = "Phone Number is required.";
    } else if (!Validator.isMobilePhone(phoneNumber)) {
        errors.phoneNumber = "Enter a valid Phone Number.";
    }

    if (Validator.isEmpty(password)) {
        errors.password = "Password is required.";
    } else if (!Validator.isLength(password, {min: 8})) {
        errors.password = "Password must be a minimum of 8 characters.";
    }

    if (Validator.isEmpty(firstName)) {
        errors.firstName = "First name is required.";
    }
    if (Validator.isEmpty(lastName)) {
        errors.lastName = "Last name is required.";
    }

    if (Validator.isEmpty(dateOfBirth)) {
        errors.dateOfBirth = "Password is required.";
    } else if (!Validator.toDate(dateOfBirth)) {
        errors.dateOfBirth = "Date of birth must be a valid date.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}


