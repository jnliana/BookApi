const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const Config = require("../../../core/config");

const LoggingMiddleware = require("./middlewares/logging.middleware.express.http");
const NotFoundMiddleware = require("./middlewares/not-found.middleware.express.http");
const ErrorMiddleware = require("./middlewares/error.middleware.express.http");

const applyRouters = require("./routers");

module.exports = () => {
	require("express-async-errors");

	const app = express();

	buildApp(app);
	startApp(app);
}

function buildApp(app) {
	applyPreMiddlewares(app);
	applyRouters(app);	
	applyPostMiddlewares(app);
}

function applyPreMiddlewares(app) {
	if (!Config.PRODUCTION) app.use(cors());

	app.use(json());
	app.use(compression());
	app.use(helmet());

	app.use(LoggingMiddleware);
}

function applyPostMiddlewares(app) {
	app.use(NotFoundMiddleware);
	app.use(ErrorMiddleware);
}

function startApp(app) {
	const port = Config.HTTP_PORT;
	app.listen(port, () => console.log("App is listening on *:" + port));
}