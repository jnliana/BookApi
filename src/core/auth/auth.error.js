const { BaseError } = require("../base/base.error");

class AuthError extends BaseError { 
	constructor(message) {
		super(message);

		this.name = "AuthError";
	}
}

module.exports = { AuthError };