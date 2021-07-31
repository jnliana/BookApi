<<<<<<< HEAD:src/core/user/use-cases/admin/change-users-role.use-case.js
const AdminUseCase = require("../../../use-case/admin.use-case");
const UseCaseError = require("../../../use-case/use-case.error");
const UserService = require("../../user.service");
=======
const { AdminUseCase } = require("../../auth/use-cases/abstract/admin.use-case");
const { UserService } = require("../user.service");
const { UseCaseError } = require("../../error/use-case.error");
>>>>>>> develop:src/core/user/use-cases/change-users-role.use-case.js

class ChangeUsersRoleError extends UseCaseError { }

class ChangeUsersRoleUseCase extends AdminUseCase {
	_userService = UserService;

	async _executeAuthorized() {
		const { userId, role } = this._request;

		const user = await this._getUser(userId);
		await this._setNewRole(user, role);
	}

	async _getUser(userId) {
		const user = await this._userService.findById(userId);
		if (!user)
			throw new ChangeUsersRoleError("No user with that id.");
		return user;
	}

	async _setNewRole(user, role) {
		user.role = role;
		await this._userService.save(user);
	}
}

module.exports = { ChangeUsersRoleUseCase };