<<<<<<< HEAD:src/core/use-case/activated.use-case.js
const AuthError = require("../auth/auth.error");
const NotOverridenError = require("../error/not-overriden.error");
const AuthenticatedUseCase = require("./authenticated.use-case");
=======
const { AuthError } = require("../../auth.error");
const { NotOverridenError } = require("../../../error/not-overriden.error");
const { AuthenticatedUseCase } = require("./authenticated.use-case");
>>>>>>> develop:src/core/auth/use-cases/abstract/activated.use-case.js

class ActivatedUseCase extends AuthenticatedUseCase {
	async execute() {
		await this._setIssuer();
		await this._isAuthenticatedGuard();
		await this._isActivatedGuard();
		return await this._executeActivated();
	}

	async _isActivatedGuard() {
		if (!this._issuer.isActivated()) throw new AuthError("User is not activated.");
	}

	async _executeActivated() {
		throw new NotOverridenError();
	}
}

module.exports = { ActivatedUseCase };