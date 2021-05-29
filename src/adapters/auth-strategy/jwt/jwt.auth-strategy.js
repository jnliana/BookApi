const jwt = require("jsonwebtoken");
const AuthStrategy = require("../../../core/auth/auth.strategy");

class JwtAuthStrategy extends AuthStrategy {
	async makeAuthToken(payload) {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, this._secret, (err, token) => {
				if (err) return reject(err);
				else return resolve(token);
			});
		});
	}

	async verifyAuthToken(authToken) {
		return new Promise((resolve, reject) => {
			jwt.verify(authToken, this._secret, (err, decoded) => {
				if (err) return reject(err);
				else return resolve();
			});
		});
	}

	async decodeAuthToken(authToken) {
		return jwt.decode(authToken);
	}
}

module.exports = JwtAuthStrategy;