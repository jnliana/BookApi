const NodemailerMailStrategy = require("../../adapters/mail-strategy/nodemailer.mail-strategy");
const config = require("../config");
const MailSendParameter = require("./mail.send-parameter");

class MailService {
	_mailStrategy;

	constructor (mailStrategy) {
		this._mailStrategy = mailStrategy;
	}

	async send(to, subject, content) {
		const sendParamater = new MailSendParameter(to, subject, content, "No plain text for ya, sunhine.");
		return await this._mailStrategy.send(sendParamater);
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