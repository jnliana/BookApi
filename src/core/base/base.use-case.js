const NotOverridenError = require("../error/not-overriden.error");

class BaseUseCase {
	_request;

	constructor(request) {
		this._request = request;
	}

	async execute() {
		throw new NotOverridenError();
	}
}

module.exports = BaseUseCase;