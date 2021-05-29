const nodemailer = require("nodemailer");

const MailStrategy = require("../../core/mail/mail.strategy");

class NodemailerMailStrategy extends MailStrategy {
	_service;
	_smtpHost;
	_smtpPort;
	_email;
	_password;
	
	constructor({ service, smtpHost, smtpPort, email, password }) {
		this._service = service;
		this._smtpHost = smtpHost;
		this._smtpPort = smtpPort;
		this._email = email;
		this._password = password;
	}
	
	async send(sendParameter) {
		const transporter = this._makeTransporter();
		const options = this._makeOptionsFromSendParameter(sendParameter);
		
		const result = await transporter.sendMail(options);
		transporter.close();
		
		return result;
	}

	_makeTransporter() {
		return nodemailer.createTransport({
			service: this._service,
			host: this._smtpHost,
			port: this._smtpPort,
			auth: {
				user: this._email,
				pass: this._password
			}
		});
	}

	_makeOptionsFromSendParameter(sendParameter) {
		return {
			from: this._from,
			to: sendParameter.to,
			subject: sendParameter.subject,
			html: sendParameter.htmlContent,
			cc: sendParameter.cc
		};
	}
}

module.exports = NodemailerMailStrategy;