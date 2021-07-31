const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const { Config } = require("../core/config");

const { makeRouter } = require("./router");
const { makeTraceMiddleware } = require("./middleware/trace.middleware");
const { makeLogMiddleware } = require("./middleware/log.middleware");
const { makeTimeoutMiddleware } = require("./middleware/timeout.middleware");
const { makeNotFoundMiddleware } = require("./middleware/not-found.middleware");
const { makeErrorMiddleware } = require("./middleware/error.middleware");

function makeApp() {
	require("express-async-errors");

	const app = express();

	if (Config.isProduction === false)
		app.use(cors());

	app.use(helmet());
	app.use(compression());
	app.use(express.json());

	// app.use(makeTraceMiddleware());
	app.use(makeLogMiddleware());
	app.use(makeTimeoutMiddleware());

	app.use("/api", makeRouter());

	app.use(makeNotFoundMiddleware());
	app.use(makeErrorMiddleware());

	return app;
}

module.exports = { makeApp };