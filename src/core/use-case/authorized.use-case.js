<<<<<<< HEAD:src/core/use-case/authorized.use-case.js
const AuthenticatedUseCase = require("./authenticated.use-case");
const NotOverridenError = require("../error/not-overriden.error");
=======
const { AuthenticatedUseCase } = require("./authenticated.use-case");
const { NotOverridenError } = require("../../../error/not-overriden.error");
>>>>>>> develop:src/core/auth/use-cases/abstract/authorized.use-case.js

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

module.exports = { AuthorizedUseCase };