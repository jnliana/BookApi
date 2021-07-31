<<<<<<< HEAD:src/core/user/use-cases/activated/change-password.use-case.js
const ActivatedUseCase = require("../../../use-case/activated.use-case");
const UseCaseError = require("../../use-case/use-case.error");
const UserService = require("../../user.service");
=======
const { ActivatedUseCase } = require("../../auth/use-cases/abstract/activated.use-case");
const { UseCaseError } = require("../../error/use-case.error");
const { UserService } = require("../user.service");
>>>>>>> develop:src/core/user/use-cases/change-password.use-case.js

class ChangePasswordError extends UseCaseError { }

class ChangePasswordUseCase extends ActivatedUseCase {
	_userService = UserService;

	async _executeActivated() {
		const { currentPassword, newPassword } = this._request;
		const user = this._issuer;

		await this._validateCurrentPassword(user, currentPassword);
		await this._validateNewPassword(newPassword);

		await this._setNewPassword(user, newPassword);
	}

	async _validateCurrentPassword(user, currentPassword) {
		if (!user.checkPassword(currentPassword))
			throw new ChangePasswordError("Given current password is not correct.");
	}

	async _validateNewPassword(newPassword) {
		await this._userService.validatePassword(newPassword);
	}

	async _setNewPassword(user, newPassword) {
		user.setPassword(newPassword);
		await this._userService.save(user);
	}
}

module.exports = { ChangePasswordUseCase }