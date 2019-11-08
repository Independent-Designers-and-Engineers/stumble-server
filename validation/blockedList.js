const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateBlockedListInput = data => {
    let errors = {};
    let { blocked } = data;
    blocked = !isEmpty(blocked) ? blocked : "";

    if (Validator.isEmpty(blocked)) {
        errors.blocked = "Blocked id is required.";
    }
    else if (!Validator.isMongoId(blocked)) {
        errors.blocked = "Blocked id must be a valid MongoID";
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    };
};