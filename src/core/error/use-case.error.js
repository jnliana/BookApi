const { BaseError } = require("../base/base.error");

class UseCaseError extends BaseError {
	constructor (message) {
		super(message);

		this.name = "UseCaseError";
	}
}

module.exports = { UseCaseError };