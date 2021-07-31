const { Router } = require("express");

function makePingRouter() {
	const router = Router();

	router.get("/", (req, res) => res.deliverMessage(200, "pong"));

	return router;
}

module.exports = { makePingRouter };