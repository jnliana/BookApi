const { makeShortId } = require("../../core/utility/id");
const { Logger } = require("../../core/utility/logger");
const { StatusCodes } = require("../status-codes");
const { Config } = require("../../core/config");

function makeLogMiddleware() {
	return (async (req, res, next) => {
		const id = makeShortId();
		const start = Date.now();

		let didLogRequest = false;

		const timeoutId = setTimeout(
			() => {
				const requestLogArgs = makeRequestLogArgs(req);
				Logger.log(...requestLogArgs, `{${id}}`);
				didLogRequest = true;
			},
			Config.seperateReqResLogAfter
		);

		res.on("finish", async () => {
			clearTimeout(timeoutId);

			const end = Date.now();
			const duration = end - start;

			const responseLogArgs = makeResponseLogArgs(res, duration);

			if (didLogRequest)
				Logger.log(`{${id}}`, '➡️ ', ...responseLogArgs);
			else {
				const requestLogArgs = makeRequestLogArgs(req);
				Logger.log(...requestLogArgs, '➡️ ', ...responseLogArgs);
			}
		});

		next();
	});
}

function makeRequestLogArgs(req) {
	return [
		"🙋",
		req.protocol.toLocaleUpperCase(),
		req.httpVersion,
		req.method,
		req.originalUrl,
		'from',
		req.ip,
	];
}

function makeResponseLogArgs(res, duration) {
	return [
		res.statusCode,
		'after',
		duration,
		'ms',
		getStatusEmoji(res.statusCode)
	];
}

function getStatusEmoji(statusCode) {
	switch (true) {
		case statusCode === StatusCodes.OK: return "👍";
		case statusCode === StatusCodes.CREATED: return "✨";
		case statusCode >= 202 && statusCode < StatusCodes.REDIRECT: return "👍";
		case statusCode >= StatusCodes.REDIRECT && statusCode < StatusCodes.BAD_REQUEST: return "⏭️";
		case statusCode === StatusCodes.BAD_REQUEST: return "🤦";
		case statusCode === StatusCodes.NOT_AUTHENTICATED: return "🔒";
		case statusCode === 402: return "👎"
		case statusCode === StatusCodes.NOT_AUTHORIZED: return "🚫";
		case statusCode === StatusCodes.NOT_FOUND: return "🕳️";
		case statusCode === StatusCodes.CLIENT_TIMEOUT: return "wuut";
		case statusCode >= 405 && statusCode < StatusCodes.INTERNAL_ERROR: return "👎";
		case statusCode >= StatusCodes.INTERNAL_ERROR && statusCode < StatusCodes.SERVER_TIMEOUT: return "🔥";
		case statusCode === StatusCodes.SERVER_TIMEOUT: return "💀";
		case statusCode >= 504: return "🔥";

		default: return "🦄";
	}
}

module.exports = { makeLogMiddleware };