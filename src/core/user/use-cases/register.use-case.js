const BaseUseCase = require("../../base/base.use-case");
const UserService = require("../user.service");
const UseCaseError = require("../../error/use-case.error");
const Config = require("../../config");

class RegisterError extends UseCaseError { }

class RegisterUseCase extends BaseUseCase {
	_MIN_PW_LENGTH = 0;
	_userService = UserService;

	async execute() {
		const { email, password } = this._request;

		await this._validateEmail(email);
		await this._validatePassword(password);

		const userId = await this._userService.create(this._request);
		const user = await this._userService.findById(userId);

		if (Config.PRODUCTION) await this._userService.issueActivation(user);
		else {
			user.activation.completed = true;
			await this._userService.patchById(user.id, user);
		}
	}

	async _validateEmail(email) {
		if (await this._userService.findByEmail(email))
			throw new RegisterError("Email already taken");
	}

	async _validatePassword(password) {
		if (password.length < this._MIN_PW_LENGTH)
			throw new RegisterError("Password is too short.");
	}
}

module.exports = RegisterUseCase;