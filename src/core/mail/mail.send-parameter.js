class MailSendParameter {
	to;
	subject;
	htmlContent;
	plainText;
	cc;

	constructor(to, subject, htmlContent, plainText, cc = []) {
		this.to = to;
		this.subject = subject;
		this.htmlContent = htmlContent;
		this.plainText = plainText;
		this.cc = cc;
	}
}

module.exports = MailSendParameter;