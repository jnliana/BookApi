class Config {
	HTTP_PORT = 3000;
	HTTPS_PORT = 3001;
	
	SECRET = "sssshhhh";

	EMAIL_FROM_ADDRESS = "whatever@mail.com";
	
	NODEMAILER_EMAIL = "whatever@mail.com";
	NODEMAILER_PASSWORD = "wrongpassword";
	NODEMAILER_SERVICE = "servico";
	NODEMAILER_SMTP_HOST = "123.456.789";
	NODEMAILER_SMTP_PORT = 1234;

	BOOK_DATA_JSON_FILE = "../../data/books.json";
	USER_DATA_JSON_FILE = "../../data/users.json";
}

module.exports = new Config();