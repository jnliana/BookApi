const BaseValidator = require("../base/base.validator");

class UserValidator extends BaseValidator {
	validate(user) {
		if (!user.email) throw new Error("No email");
	}
}

module.exports = Object.freeze(new UserValidator());