const { BaseError } = require("../base/base.error");

class ServiceError extends BaseError {
	constructor(message) {
		super(message);

		this.name = "ServiceError";
	}
 }

module.exports = { ServiceError };