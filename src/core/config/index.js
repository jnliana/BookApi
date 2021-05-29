const dotenv = require("dotenv");

dotenv.config();
class Config {
	PRODUCTION = process.env.PRODUCTION === true || process.env.PRODUCTION === "true";
	HTTP_PORT = process.env.HTTP_PORT || 3000;
	HTTPS_PORT = process.env.HTTPS_PORT || 3001;
	
	SECRET = process.env.SECRET ||"sssshhhh";

	EMAIL_FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS || "noreply@bookapi.com";
	
	NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL || "gdjkfhsafjgashfgjsk@hotmail.com";
	NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD || "BrilliantThoughtEagleMilk";
	NODEMAILER_SERVICE = "Hotmail";
	NODEMAILER_SMTP_HOST = "smtp.office365.com";
	NODEMAILER_SMTP_PORT = 587;

	BOOK_DATA_JSON_FILE = process.env.BOOK_DATA_JSON_FILE || "./data/books.json";
	USER_DATA_JSON_FILE = process.env.USER_DATA_JSON_FILE || "./data/books.json";
}

module.exports = Object.freeze(new Config());