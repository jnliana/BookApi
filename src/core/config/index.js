class Config {
	PRODUCTION = false;
	HTTP_PORT = 3000;
	HTTPS_PORT = 3001;
	
	SECRET = "sssshhhh";

	EMAIL_FROM_ADDRESS = "noreply@bookapi.com";
	
	NODEMAILER_EMAIL = "gdjkfhsafjgashfgjsk@hotmail.com";
	NODEMAILER_PASSWORD = "BrilliantThoughtEagleMilk";
	NODEMAILER_SERVICE = "Hotmail";
	NODEMAILER_SMTP_HOST = "smtp.office365.com";
	NODEMAILER_SMTP_PORT = 587;

	BOOK_DATA_JSON_FILE = "../../data/books.json";
	USER_DATA_JSON_FILE = "../../data/users.json";
}

module.exports = new Config();