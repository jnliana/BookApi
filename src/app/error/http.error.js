const { BaseError } = require("../../core/base/base.error");
const { StatusCodes } = require("../status-codes");

class HttpError extends BaseError {
	status;

	constructor (message, status = StatusCodes.BAD_REQUEST) {
		super(message);

		this.name = "HttpError";
		this.status = status;
	}
}

module.exports = { HttpError };