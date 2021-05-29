const Config = require("../config");
const NotImplementedError = require("../error/not-implemented.error");

class AuthStrategy {
	_secret;

	constructor () {
		this._secret = Config.SECRET;
	}

	async makeAuthToken(payload) {
		throw new NotImplementedError();
	}

	async verifyAuthToken(authToken) {
		throw new NotImplementedError();
	}

	async decodeAuthToken(authToken) {
		throw new NotImplementedError();
	}
}

module.exports = AuthStrategy;