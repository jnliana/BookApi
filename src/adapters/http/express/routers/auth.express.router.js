const { Router } = require("express");
const LoginUseCase = require("../../../../core/auth/use-cases/login.use-case");
const BaseExpressRouter = require("./base.express.router");

class AuthExpressRouter extends BaseExpressRouter {
	async _login(req, res) {
		const useCase = new LoginUseCase(req.body);
		const result = await useCase.execute();
		
		return res.status(200).json(result);
	}

	makeExpressRouter() {
		const router = Router();

		router.post("/login", async (req, res) => await this._login(req, res));

		return router;
	}
}

module.exports = Object.freeze(new AuthExpressRouter());