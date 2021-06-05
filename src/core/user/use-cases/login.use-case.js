const BaseUseCase = require("../../use-case/base.use-case");
const UseCaseError = require("../../use-case/use-case.error");
const AuthService = require("../../auth/auth.service");
const UserService = require("../user.service");

class LoginError extends UseCaseError { }

class LoginUseCase extends BaseUseCase {
	_authService = AuthService;
	_userService = UserService;
	_badCredentialsErrorMessage = "Login failed: Bad credentials.";

	async execute() {
		const { email, password } = this._request;

		const user = await this._userService.findByEmail(email);
		await this._validateCredentials(user, password);
		return await this._makeLoginResponse(user);
	}
	
	async _validateCredentials(user, password) {
		if (!user) 
			throw new LoginError(_badCredentialsErrorMessage);
			
		if (!user.checkPassword(password)) 
			throw new LoginError(_badCredentialsErrorMessage);
	}

	async _makeLoginResponse(user) {
		const token = await this._authService.makeAuthToken(user);
		return { token, userId: user.id };
	}
}

module.exports = LoginUseCase;