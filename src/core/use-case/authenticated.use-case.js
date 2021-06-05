const AuthService = require("../auth/auth.service");
const AuthError = require("../auth/auth.error");
const NotOverridenError = require("../error/not-overriden.error");
const BaseUseCase = require("./base.use-case");
const UserService = require("../user/user.service");

class AuthenticatedUseCase extends BaseUseCase {
	_authService = AuthService;
	_userService = UserService;
	_authToken;
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
		const userId = await this._getUserFromToken();
		this._issuer = await this._userService.findById(userId);
	}

	async _getUserFromToken() {
		let userId;

		try {
			userId = await this._authService.getUserIdFromAuthToken(this._authToken);
		} catch {
			throw new AuthError("Invalid auth token.");
		}
		
		return userId;
	}

	async _isAuthenticatedGuard() {
		if (!this._issuer) throw new AuthError("User is not authenticated.");
	}

	async _executeAuthenticated() {
		throw new NotOverridenError();
	}
}

module.exports = AuthenticatedUseCase;