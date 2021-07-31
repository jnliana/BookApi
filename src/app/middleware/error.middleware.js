const { BaseError } = require("../../core/base/base.error");
const { ValidationError } = require("../../core/error/validation.error");
const { UseCaseError } = require("../../core/error/use-case.error");
const { Logger } = require("../../core/utility/logger");
const { HttpError } = require("../error/http.error");

const { NotFoundError } = require("../error/not-found.error");
const { StatusCodes } = require("../status-codes");

function makeErrorMiddleware() {
	return (async (error, req, res, next) => {
		let status = StatusCodes.INTERNAL_ERROR;
		let type = "Unknown error";
		let message = "Interal error";

		if ((error instanceof BaseError) === false)
			Logger.error(error);

		else {
			type = error.name;
			message = error.message;
		}

		if (error instanceof UseCaseError) 
			status = StatusCodes.BAD_REQUEST;

		else if (error instanceof HttpError) 
			status = error.status;

		switch (true) {
			case error instanceof ValidationError: {
				status = StatusCodes.BAD_REQUEST;
				message = error.message;
				break;
			}

			case error instanceof NotFoundError: {
				status = StatusCodes.NOT_FOUND;
				message = error.message;
				break;
			}
		}

		return res.status(status).json({
			status,
			type,
			message
		});
	});
}

module.exports = { makeErrorMiddleware };