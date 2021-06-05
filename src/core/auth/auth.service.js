const AuthTokenPayload = require("./auth.token-payload");
const JwtAuthStrategy = require("../../adapters/auth-strategy/jwt/jwt.auth-strategy");

class AuthService {
	_authStrategy;

	constructor (authStrategy) {
		this._authStrategy = authStrategy;
	}

	async makeAuthToken(user) {
		const payload = new AuthTokenPayload(user.id);
		return await this._authStrategy.makeAuthToken(payload);
	}

	async getUserIdFromAuthToken(authToken) {
		await this._verifyAuthToken(authToken);
		const { userId } = await this._authStrategy.decodeAuthToken(authToken);
		return userId;
	}

	async _verifyAuthToken(authToken) {
		await this._authStrategy.verifyAuthToken(authToken);
	}
}

module.exports = Object.freeze(
	new AuthService(Object.freeze(new JwtAuthStrategy()))
);