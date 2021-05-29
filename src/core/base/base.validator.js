const NotImplementedError = require("../error/not-implemented.error");

class BaseValidator {
	validateEntity(entity) {
		throw new NotImplementedError();
	}

	_validateString(options) {
		throw new NotImplementedError();
	}

	_validateNumber(options) {
		throw new NotImplementedError();
	}

	_validateDate(options) {
		throw new NotImplementedError();
	}
}

module.exports = BaseValidator;