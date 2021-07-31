const { BaseError } = require("../base/base.error");

class NotOverridenError extends BaseError {
	constructor (message = "The called function is abstract and has not yet been overriden.") {
		super(message);
	}
}

module.exports = { NotOverridenError };