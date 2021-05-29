const AuthService = require("../../auth.service");
const BaseUseCase = require("../../../base/base.use-case");
const NotOverridenError = require("../../../error/not-overriden.error");
const AuthError = require("../../auth.error");

class AuthenticatedUseCase extends BaseUseCase {
	_authToken;
	_authService = AuthService;
	_issuer;

	constructor (request, authToken) {
		super(request);
		this._authToken = authToken;
	}

	async execute() {
		await this._setIssuer();
		await this._isAuthenticatedGuard();
		return await this._executeAuthenticated();
	}

	async _setIssuer() {
		try {
			this._issuer = await this._authService.getUserFromAuthToken(this._authToken);
		} catch (e) {
			this._issuer = null;
		}
	}

	async _isAuthenticatedGuard() {
		if (!this._issuer) throw new AuthError("User is not authenticated.");
	}

	async _executeAuthenticated() {
		throw new NotOverridenError();
	}
}

module.exports = AuthenticatedUseCase;