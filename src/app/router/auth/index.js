const { Router } = require("express");

const { Interactor } = require("../../../core/interactor/interactor");
const { Auth } = require("../../../core/interactions").Interactions;

function makeAuthRouter() {
	const router = Router();

	router.post("/login", async (req, res) => {
		const params = { 
			...req.body 
		};
		const result = await Interactor.interactAsync(Auth.Login, params);
		return res.deliverPayload(200, result);
	});

	return router;
}

module.exports = { makeAuthRouter };