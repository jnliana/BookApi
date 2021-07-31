const { UserService } = require("../user/user.service");
const { AuthTokenPayload } = require("./auth.token-payload");

const { JwtAuthStrategy } = require("../../adapters/auth-strategy/jwt/jwt.auth-strategy");

class AuthService {
	_userService;
	_authStrategy;

	constructor (userService, authStrategy) {
		this._userService = userService;
		this._authStrategy = authStrategy;
	}

	async makeAuthToken(user) {
		const payload = new AuthTokenPayload(user.id);
		return await this._authStrategy.makeAuthToken(payload);
	}

	async getUserFromAuthToken(authToken) {
		await this._verifyAuthToken(authToken);
		const { userId } = await this._authStrategy.decodeAuthToken(authToken);
		return this._userService.findById(userId);
	}

	async _verifyAuthToken(authToken) {
		await this._authStrategy.verifyAuthToken(authToken);
	}
}

module.exports = {
	AuthService: Object.freeze(
		new AuthService(
			UserService,
			Object.freeze(new JwtAuthStrategy())
		)
	)
};