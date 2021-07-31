const { makeApp } = require("./app/app");
const { Config } = require("./core/config");
const { Logger } = require("./core/utility/logger");

process.on("uncaughtException", error => {
	Logger.warn("Uncaught exception!");
	Logger.error(error);
});

process.on("unhandledRejection", (reason, promise) => {
	Logger.warn("Unhandeled promise rejection!");
	Logger.error(reason, promise);
});

if (Config.isProduction === false)
	Logger.info("🧑‍💻 Running in development mode 🧑‍💻");

makeApp()
	.listen(
		Config.httpPort,
		() => Logger.info("🚀 App is listening on port", Config.httpPort, "🚀")
	);