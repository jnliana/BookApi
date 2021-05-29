class NodemailerTransporterSettings {
	service;
	smtpHost;
	smtpPort;
	email;
	password;

	constructor (service, smtpHost, smtpPort, email, password) {
		this.service = service;
		this.smtpHost = smtpHost;
		this.smtpPort = smtpPort;
		this.email = email;
		this.password = password;
	}
}

module.exports = NodemailerTransporterSettings;