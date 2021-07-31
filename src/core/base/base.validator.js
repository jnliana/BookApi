const { NotOverridenError } = require("../error/not-overriden.error");

class BaseValidator {
	validate() {
		throw new NotOverridenError();
	}
}

module.exports = { BaseValidator };