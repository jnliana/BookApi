const { BaseError } = require("../base/base.error");

class NotImplementedError extends BaseError {
	constructor (message = "The called function has not yet been implemented.") {
		super(message);

		this.name = "NotImplementedError";
	}
}

module.exports = { NotImplementedError };