const { NodemailerMailStrategy } = require("../../strategies/mail/nodemailer/nodemailer.mail-strategy");
const { BaseError } = require("../base/base.error");
const { Config } = require("../config");
const { MailSendParameter } = require("./mail.send-parameter");

class MailError extends BaseError { }

class MailService {
	_mailStrategy;

	constructor (mailStrategy) {
		this._mailStrategy = mailStrategy;
	}

	async send(to, subject, content) {
		const sendParamater = new MailSendParameter(to, subject, content, "No plain text for ya, sunhine.");
		try {
			await this._mailStrategy.send(sendParamater);
			return;
		} catch (e) {
			console.error(e);
			throw new MailError("Failed to send mail.");
		}
	}
}

module.exports = {
	MailService: Object.freeze(
		new MailService(Object.freeze(new NodemailerMailStrategy({
			service: Config.nodemailerServiced,
			smtpHost: Config.nodemailerSmtpHost,
			smtpPort: Config.nodemailerSmtpHost,
			email: Config.nodemailerEmail,
			password: Config.nodemailerPassword
		})))
	)
};