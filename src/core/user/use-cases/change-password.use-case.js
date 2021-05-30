const ActivatedUseCase = require("../../auth/use-cases/abstract/activated.use-case");
const UseCaseError = require("../../error/use-case.error");
const UserService = require("../user.service");

class ChangePasswordError extends UseCaseError { }

class ChangePasswordUseCase extends ActivatedUseCase {
	_userService = UserService;

	async _executeActivated() {
		const { currentPassword, newPassword } = this._request;
		const user = this._issuer;

		if (!user.checkPassword(currentPassword))
			throw new ChangePasswordError("Given current password is not correct.");

		await this._userService.validatePassword(newPassword);

		user.setPassword(newPassword);
		await this._userService.save(user);
	}
}

module.exports = ChangePasswordUseCase;