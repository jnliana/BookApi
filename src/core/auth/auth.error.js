<<<<<<< HEAD
const BaseError = require("../error/base.error");
=======
const { BaseError } = require("../base/base.error");
>>>>>>> develop

class AuthError extends BaseError { 
	constructor(message) {
		super(message);

		this.name = "AuthError";
	}
}

module.exports = { AuthError };