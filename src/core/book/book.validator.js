const BaseValidator = require("../base/base.validator");
const NotImplementedError = require("../error/not-implemented.error");

class BookValidator extends BaseValidator {
	validate(book) {
		// throw new NotImplementedError();
	}
}

module.exports = Object.freeze(new BookValidator());