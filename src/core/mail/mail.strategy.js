const Config = require("../config");
const NotOverridenError = require("../error/not-overriden.error");

class MailStrategy {
	_from;
	_replyTo;

	constructor() {
		this._from = Config.EMAIL_FROM_ADDRESS;
		this._replyTo = Config.EMAIL_FROM_ADDRESS;
	}

	async send(sendParamater) {
		throw new NotOverridenError();
	}
}

module.exports = MailStrategy;