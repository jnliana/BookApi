const { parseBooleanFromEnv, parseNumberFromEnv, parseStringFromEnv } = require("../utility/env");

require("dotenv").config();
class Config {
	isProduction = parseBooleanFromEnv("PRODUCTION");

	serviceName = parseStringFromEnv("SERVICE_NAME", "command-demo");

	secret = parseStringFromEnv("SECRET", "ssssshhhh");

	schedularStrategy = parseStringFromEnv("SCHEDULAR_STRATEGY", "simple");
	simpleSchedularInterval = parseNumberFromEnv("SIMPLE_SCHEDULAR_INTERVAL", 100);

	shortIdLength = parseStringFromEnv("SHORT_ID_LENGTH", 5);

	bookDataJsonFile = parseStringFromEnv("BOOK_DATA_JSON_FILE", "./data/books.json");
	userDataJsonFile = parseStringFromEnv("USER_DATA_JSON_FILE", "./data/books.json");

	httpPort = parseNumberFromEnv("HTTP_PORT", 3000);
	logLevel = parseNumberFromEnv("LOG_LEVEL", 4);
	requestTimeout = parseNumberFromEnv("REQUEST_TIMEOUT", 5000);
	responseTimeout = parseNumberFromEnv("RESPONSE_TIMEOUT", 5000);
	seperateReqResLogAfter = parseNumberFromEnv("SEPERATE_REQ_RES_LOG_AFTER", 3000);

	emailFromAddress = parseStringFromEnv("EMAIL_FROM_ADDRESS", "noreply@bookapi.com");

	nodemailerEmail = parseStringFromEnv("NODEMAILER_EMAIL", "wrong@email.com");
	nodemailerPassword = parseStringFromEnv("NODEMAILER_PASSWORD", "wrongpassword");
	nodemailerServiced = parseStringFromEnv("NODEMAILER_SERVICE", "wrongservice");
	nodemailerSmtpHost = parseStringFromEnv("NODEMAILER_SMTP_HOST", "wrong.host.com");
	nodemailerSmtpPort = parseNumberFromEnv("NODEMAILER_SMTP_PORT", 12345);
}

module.exports = { Config: Object.freeze(new Config()) };