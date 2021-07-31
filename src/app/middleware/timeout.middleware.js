const { Config } = require("../../core/config");
const { StatusCodes } = require("../status-codes");

function makeTimeoutMiddleware(requestTimeout = Config.requestTimeout, responseTimeout = Config.responseTimeout) {
	// if we were to throw an error in the setTimeout callback
	// the error.middleware would not catch that error.
	// thus we return an error manually here.

	return (async (req, res, next) => {
		req.setTimeout(requestTimeout, async () => {
			return res.status(StatusCodes.CLIENT_TIMEOUT).json({
				status: StatusCodes.CLIENT_TIMEOUT,
				message: `Request timeout for ${req.method} ${req.originalUrl} after ${requestTimeout}ms.`,
				type: "RequestTimeoutError"
			});
		});

		res.setTimeout(responseTimeout, async () => {
			return res.status(StatusCodes.SERVER_TIMEOUT).json({
				status: StatusCodes.SERVER_TIMEOUT,
				message: `Response timeout for ${req.method} ${req.originalUrl} after ${responseTimeout}ms.`,
				type: "ResponseTimeoutError"
			});
		});

		next();
	});
}

module.exports = { makeTimeoutMiddleware };