const NodemailerMailStrategy = require("../../adapters/mail-strategy/nodemailer/nodemailer.mail-strategy");
const BaseError = require("../base/base.error");
const config = require("../config");
const MailSendParameter = require("./mail.send-parameter");

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

module.exports = Object.freeze(
	new MailService(Object.freeze(new NodemailerMailStrategy({
		service: config.NODEMAILER_SERVICE,
		smtpHost: config.NODEMAILER_SMTP_HOST,
		smtpPort: config.NODEMAILER_SMTP_HOST,
		email: config.NODEMAILER_EMAIL,
		password: config.NODEMAILER_PASSWORD
	})))
);