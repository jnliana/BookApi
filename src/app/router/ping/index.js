const { Router } = require("express");

function makePingRouter() {
	const router = Router();

	router.get("/", (req, res) => res.status(200).json("pong"));

	return router;
}

module.exports = { makePingRouter };