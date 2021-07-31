const { Router } = require("express");

const { Interactor } = require("../../../core/interactor/interactor");
const { Auth } = require("../../../core/interactions").Interactions;

function makeAuthRouter() {
	const router = Router();

	router.post("/login", async (req, res) => {
		const params = { 
			...req.body 
		};

		Interactor.interact(Auth.Login, params, result => {
			return res.status(200).json(result);
		});
	});

	return router;
}

module.exports = { makeAuthRouter };