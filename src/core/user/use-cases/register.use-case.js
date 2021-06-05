const BaseUseCase = require("../../use-case/base.use-case");
const UserService = require("../user.service");
const UserRoles = require("../user.roles");
const UseCaseError = require("../../use-case/use-case.error");
const Config = require("../../config");

class RegisterError extends UseCaseError { }

class RegisterUseCase extends BaseUseCase {
	_MIN_PW_LENGTH = 0;
	_userService = UserService;

	async execute() {
		const { email, password } = this._request;

		await this._checkEmailIsUnique(email);
		await this._userService.validatePassword(password);

		const user = await this._makeUser();

		if (Config.PRODUCTION)
			await this._userService.issueActivation(user);
		else
			await this._DEV_ONLY_activateUserRightNow(user);
	}

	async _checkEmailIsUnique(email) {
		if (await this._userService.findByEmail(email))
			throw new RegisterError("Email already taken");
	}

	async _makeUser() {
		const userId = await this._userService.create({ ...this._request, role: UserRoles.READER });
		const user = await this._userService.findById(userId);
		return user;
	}

	async _DEV_ONLY_activateUserRightNow(user) {
		user.activation.completed = true;
		await this._userService.save(user);
	}
}

module.exports = RegisterUseCase;