const BaseValidator = require("../base/base.validator");
const NotImplementedError = require("../error/not-implemented.error");

class UserValidator extends BaseValidator {
	validate(user) {
		// throw new NotImplementedError();
	}	
}

module.exports = Object.freeze(new UserValidator());