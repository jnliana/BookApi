<<<<<<< HEAD
const BaseError = require("./base.error");
=======
const { BaseError } = require("../base/base.error");
>>>>>>> develop

class NotImplementedError extends BaseError {
	constructor (message = "The called function has not yet been implemented.") {
		super(message);

		this.name = "NotImplementedError";
	}
}

module.exports = { NotImplementedError };