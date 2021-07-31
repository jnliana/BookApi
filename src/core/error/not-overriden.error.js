<<<<<<< HEAD
const BaseError = require("./base.error");
=======
const { BaseError } = require("../base/base.error");
>>>>>>> develop

class NotOverridenError extends BaseError {
	constructor (message = "The called function is abstract and has not yet been overriden.") {
		super(message);

		this.name = "NotOverridenError";
	}
}

module.exports = { NotOverridenError };