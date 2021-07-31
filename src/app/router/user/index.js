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

			Interactor.interact(User.Register, params, () => {
				return res.status(201).json("Successfully registered. An email for activation has been send!");
			});
		}
	);

	router.get(
		"/activate/:activationToken",
		async (req, res) => {
			const params = { 
				activationToken: req.params.activationToken 
			};

			Interactor.interact(User.Activate, params, () => {
				return res.status(200).json("Successfully activated your account.");
			});
		}
	);

	return router;
}

module.exports = { makeUserRouter };