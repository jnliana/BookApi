const { Config } = require("../config");
const { NotOverridenError } = require("../error/not-overriden.error");

class MailStrategy {
	_from;
	_replyTo;

	constructor () {
		this._from = Config.emailFromAddress;
		this._replyTo = Config.emailFromAddress;
	}

	async send(sendParamater) {
		throw new NotOverridenError();
	}
}

module.exports = { MailStrategy };