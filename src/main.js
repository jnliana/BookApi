const { makeApp } = require("./app/app");
const { Config } = require("./core/config");
const { Logger } = require("./core/utility/logger");
const { uncaught } = require("./core/utility/uncaught");

function main() {
	uncaught();

	if (Config.isProduction === false)
		Logger.info("🧑‍💻 Running in development mode 🧑‍💻");

	makeApp()
		.listen(
			Config.httpPort,
			() => Logger.info("🚀 App is listening on port", Config.httpPort, "🚀")
		);
}

main();