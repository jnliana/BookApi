<<<<<<< HEAD
const BaseError = require("./base.error");
=======
const { BaseError } = require("../base/base.error");
>>>>>>> develop

class ServiceError extends BaseError {
	constructor(message) {
		super(message);

		this.name = "ServiceError";
	}
 }

module.exports = { ServiceError };