const dotenv = require("dotenv");

dotenv.config();
class Config {
	PRODUCTION = process.env.PRODUCTION === true || process.env.PRODUCTION === "true";
	HTTP_PORT = process.env.HTTP_PORT || 3000;

	SECRET = process.env.SECRET || "sssshhhh";

	EMAIL_FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS || "noreply@bookapi.com";

	NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL || "wrong@email.com";
	NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD || "wrongpassword";
	NODEMAILER_SERVICE = process.env.NODEMAILER_SERVICE || "wrongservice";
	NODEMAILER_SMTP_HOST = process.env.NODEMAILER_SMTP_HOST || "wrong.host.com";
	NODEMAILER_SMTP_PORT = process.env.NODEMAILER_SMTP_PORT || 12345;

	BOOK_DATA_JSON_FILE = process.env.BOOK_DATA_JSON_FILE || "./data/books.json";
	USER_DATA_JSON_FILE = process.env.USER_DATA_JSON_FILE || "./data/books.json";
}

module.exports = Object.freeze(new Config());