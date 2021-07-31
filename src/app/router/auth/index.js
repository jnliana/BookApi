const { Router } = require("express");
const { makeLoginRouter } = require("./login.router");

function makeAuthRouter() {
	const router = Router();

	router.use("/login", makeLoginRouter());

	return router;
}

module.exports = { makeAuthRouter };