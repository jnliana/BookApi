class MailSendParameter {
	to;
	subject;
	htmlContent;
	plainText;

	constructor(to, subject, htmlContent, plainText, cc = []) {
		this.to = to;
		this.subject = subject;
		this.htmlContent = htmlContent;
		this.plainText = plainText;
		this.cc = cc;
	}
}

module.exports = MailSendParameter;