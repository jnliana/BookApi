const { parseBooleanFromEnv, parseNumberFromEnv, parseStringFromEnv } = require("../utility/env");

require("dotenv").config();
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

	isProduction = parseBooleanFromEnv("PRODUCTION");

	httpPort = parseNumberFromEnv("HTTP_PORT", 3000);

	serviceName = parseStringFromEnv("SERVICE_NAME", "command-demo");

	logLevel = parseNumberFromEnv("LOG_LEVEL", 4);

	requestTimeout = parseNumberFromEnv("REQUEST_TIMEOUT", 5000);

	responseTimeout = parseNumberFromEnv("RESPONSE_TIMEOUT", 5000);

	seperateReqResLogAfter = parseNumberFromEnv("SEPERATE_REQ_RES_LOG_AFTER", 3000);

	schedularStrategy = parseStringFromEnv("SCHEDULAR_STRATEGY", "simple");

	simpleSchedularInterval = parseNumberFromEnv("SIMPLE_SCHEDULAR_INTERVAL", 100);

	shortIdLength = parseStringFromEnv("SHORT_ID_LENGTH", 5);
}

module.exports = { Config: Object.freeze(new Config()) };