const { BaseError } = require("../base/base.error");

class ValidationError extends BaseError { 
	constructor(message) {
		super(message);

		this.name = "ValidationError";
	}
}

module.exports = { ValidationError };