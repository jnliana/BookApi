const { parseBooleanFromEnv, parseNumberFromEnv, parseStringFromEnv } = require("../utility/env");

require("dotenv").config();
class Config {
	isProduction = parseBooleanFromEnv("PRODUCTION");

	serviceName = parseStringFromEnv("SERVICE_NAME", "command-demo");

	secret = parseStringFromEnv("SECRET", "ssssshhhh");

	schedularStrategy = parseStringFromEnv("SCHEDULAR_STRATEGY", "simple");
	simpleSchedularInterval = parseNumberFromEnv("SIMPLE_SCHEDULAR_INTERVAL", 100);

	shortIdLength = parseStringFromEnv("SHORT_ID_LENGTH", 5);

	bookDataJsonFile = process.env.BOOK_DATA_JSON_FILE || "./data/books.json";
	userDataJsonFile = process.env.USER_DATA_JSON_FILE || "./data/books.json";

	httpPort = parseNumberFromEnv("HTTP_PORT", 3000);
	logLevel = parseNumberFromEnv("LOG_LEVEL", 4);
	requestTimeout = parseNumberFromEnv("REQUEST_TIMEOUT", 5000);
	responseTimeout = parseNumberFromEnv("RESPONSE_TIMEOUT", 5000);
	seperateReqResLogAfter = parseNumberFromEnv("SEPERATE_REQ_RES_LOG_AFTER", 3000);

	emailFromAddress = parseStringFromEnv("EMAIL_FROM_ADDRESS", "noreply@bookapi.com");

	nodemailerEmail = process.env.NODEMAILER_EMAIL || "wrong@email.com";
	nodemailerPassword = process.env.NODEMAILER_PASSWORD || "wrongpassword";
	nodemailerServiced = process.env.NODEMAILER_SERVICE || "wrongservice";
	nodemailerSmtpHost = process.env.NODEMAILER_SMTP_HOST || "wrong.host.com";
	nodemailerSmtpPort = process.env.NODEMAILER_SMTP_PORT || 12345;
}

module.exports = { Config: Object.freeze(new Config()) };