const AuthenticatedUseCase = require("./authenticated.use-case");
const NotOverridenError = require("../../../error/not-overriden.error");

class AuthorizedUseCase extends AuthenticatedUseCase {
	async execute() {
		await this._setIssuer();
		await this._isAuthenticatedGuard();
		await this._isAuthorizedGuard();
		return await this._executeAuthorized();
	}

	async _isAuthorizedGuard() {
		throw new NotOverridenError();
	}

	async _executeAuthorized() {
		throw new NotOverridenError();
	}
}

module.exports = AuthorizedUseCase;