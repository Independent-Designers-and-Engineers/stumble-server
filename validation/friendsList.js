const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateFriendsListInput = data => {
    let errors = {};
    let { friend } = data;
    friend = !isEmpty(friend) ? friend : "";

    if (Validator.isEmpty(friend)) {
        errors.friend = "Friend id is required.";
    }
    else if (!Validator.isMongoId(friend)) {
        errors.friend = "Friend id must be a valid MongoID";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};