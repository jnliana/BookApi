const { NotFoundError } = require("../error/not-found.error");

function makeNotFoundMiddleware() {
	return (async (req, res, next) => {
		throw new NotFoundError(`No endpoint at ${req.method} ${req.originalUrl}`);
	});
}

module.exports = { makeNotFoundMiddleware };