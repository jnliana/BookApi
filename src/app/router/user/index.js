const { Router } = require("express");

const { Interactor } = require("../../../core/interactor/interactor");
const { User } = require("../../../core/interactions").Interactions;

function makeUserRouter() {
	const router = Router();

	router.post(
		"/register",
		async (req, res) => {
			const params = { 
				...req.body 
			};

			await Interactor.interactAsync(User.Register, params);
			return res.deliverMessage(201, "Successfully registered. An email for activation has been send!");
		}
	);

	router.get(
		"/activate/:activationToken",
		async (req, res) => {
			const params = { 
				activationToken: req.params.activationToken 
			};

			await Interactor.interactAsync(User.Activate, params);
			return res.deliverMessage(200, "Successfully activated your account.");
		}
	);

	return router;
}

module.exports = { makeUserRouter };