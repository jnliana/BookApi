const BaseValidator = require("../base/base.validator");
const NotImplementedError = require("../error/not-implemented.error");

class UserValidator extends BaseValidator {
	validate(user) {
		// throw new NotImplementedError();
		if (!user.email) throw new Error("No email");
	}
}

module.exports = Object.freeze(new UserValidator());