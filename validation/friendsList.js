const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateFriendsListInput = data => {
    let errors = {};
    let { friend } = data;
    friend = !isEmpty(friend) ? friend : "";

    if (Validator.isEmpty(friend)) {
        errors.blocked = "Friend id is required.";
    }
    else if (!Validator.isMongoId(friend)) {
        errors.blocked = "Friend id must be a valid MongoID";
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    };
};