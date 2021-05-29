const { Router } = require("express");
const RegisterUseCase = require("../../../../core/user/use-cases/register.use-case");
const ActivateUseCase = require("../../../../core/user/use-cases/activate.use-case");
const BaseExpressRouter = require("./base.express.router");

class UserExpressRouter extends BaseExpressRouter {
	async _register(req, res) {
		const useCase = new RegisterUseCase(req.body);
		await useCase.execute();

		return res.status(201).json("Successfully registered. An email for activation has been send!");
	}

	async _activate(req, res) {
		const { activationToken } = req.params;

		const useCase = new ActivateUseCase({ activationToken });
		await useCase.execute();

		return res.status(200).json("Successfully activated your account.");
	}

	makeExpressRouter() {
		const router = Router();

		router.post(
			"/register",
			async (req, res) => await this._register(req, res)
		);

		router.get(
			"/activate/:activationToken",
			async (req, res) => await this._activate(req, res)
		);

		return router;
	}
}

module.exports = Object.freeze(new UserExpressRouter());