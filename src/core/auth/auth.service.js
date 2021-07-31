<<<<<<< HEAD
const AuthTokenPayload = require("./auth.token-payload");
const JwtAuthStrategy = require("../../adapters/auth-strategy/jwt/jwt.auth-strategy");
=======
const { UserService } = require("../user/user.service");
const { AuthTokenPayload } = require("./auth.token-payload");

const { JwtAuthStrategy } = require("../../strategies/auth/jwt/jwt.auth-strategy");
>>>>>>> develop

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

<<<<<<< HEAD
module.exports = Object.freeze(
	new AuthService(Object.freeze(new JwtAuthStrategy()))
);
=======
module.exports = {
	AuthService: Object.freeze(
		new AuthService(
			UserService,
			Object.freeze(new JwtAuthStrategy())
		)
	)
};
>>>>>>> develop
