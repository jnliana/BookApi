const { Router } = require("express");

function makeTimeoutRouter() {
	const router = Router();

	router.get("/", async (req, res) => { });

	return router;
}

module.exports = { makeTimeoutRouter };