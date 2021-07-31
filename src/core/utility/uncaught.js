const { Logger } = require("../utility/logger");

function uncaught() {
	process.on("uncaughtException", error => {
		Logger.warn("Uncaught exception!");
		Logger.error(error);
	});

	process.on("unhandledRejection", (reason, promise) => {
		Logger.warn("Unhandeled promise rejection!");
		Logger.error(reason, promise);
	});
}

module.exports = { uncaught };