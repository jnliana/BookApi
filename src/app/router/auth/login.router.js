const { Router } = require("express");

const { Interactions } = require("../../../core/interactions");
const { Interactor } = require("../../../core/interactor/interactor");

function makeLoginRouter() {
	const router = Router();

	router.post("/", async (req, res) => {
		Interactor.interact(Interactions.Auth.Login, req.body, result => {
			return res.status(200).json(result);
		});
	});

	return router;
}

module.exports = { makeLoginRouter };