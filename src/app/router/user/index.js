const { Router } = require("express");

const { RegisterUseCase } = require("../../../core/user/use-cases/register.use-case");
const { ActivateUseCase } = require("../../../core/user/use-cases/activate.use-case");

function makeUserRouter() {
	const router = Router();

	router.post(
		"/register",
		async (req, res) => {
			const useCase = new RegisterUseCase(req.body);
			await useCase.execute();

			return res.status(201).json("Successfully registered. An email for activation has been send!");
		}
	);

	router.get(
		"/activate/:activationToken",
		async (req, res) => {
			const { activationToken } = req.params;

			const useCase = new ActivateUseCase({ activationToken });
			await useCase.execute();

			return res.status(200).json("Successfully activated your account.");
		}
	);

	return router;
}

module.exports = { makeUserRouter };