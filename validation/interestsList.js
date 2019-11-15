const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateInterestsListInput = data => {
    let errors = {};
    let { category, values } = data;

    category = !isEmpty(category) ? category : "";
    values = !isEmpty(category) ? values: "";

    if(Validator.isEmpty(category)) {
        errors.category = "Interests category is required.";
    }

    if(values.length == 0) {
        errors.values = "Interests values is required.";
    }
    else if(!Array.isArray(values)) {
        errors.values = "Interests values must be an array.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};