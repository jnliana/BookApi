const AuthError = require("../auth/auth.error");
const NotOverridenError = require("../error/not-overriden.error");
const AuthenticatedUseCase = require("./authenticated.use-case");

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

module.exports = ActivatedUseCase;