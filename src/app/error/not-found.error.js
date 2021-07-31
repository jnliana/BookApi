const { HttpError } = require("./http.error");

class NotFoundError extends HttpError {
	constructor (message) {
		super(message);

		this.name = "NotFoundError";
	}
}

module.exports = { NotFoundError };