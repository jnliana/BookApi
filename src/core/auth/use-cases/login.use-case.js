const { BaseUseCase } = require("../../base/base.use-case");
const { UserService } = require("../../user/user.service");
const { AuthService } = require("../auth.service");
const { AuthError } = require("../auth.error");

class LoginError extends AuthError { }

class LoginUseCase extends BaseUseCase {
	_authService = AuthService;
	_userService = UserService;

	async execute() {
		const { email, password } = this._request;

		const user = await this._userService.findByEmail(email);
		await this._validateCredentials(user, password);
		return await this._makeLoginResponse(user);
	}

	async _validateCredentials(user, password) {
		if (!user || !user.checkPassword(password))
			throw new LoginError("Login failed: Bad credentials.");
	}

	async _makeLoginResponse(user) {
		const token = await this._authService.makeAuthToken(user);
		return { token, userId: user.id };
	}
}

module.exports = { LoginUseCase };