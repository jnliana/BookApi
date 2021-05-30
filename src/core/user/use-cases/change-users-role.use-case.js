const AdminUseCase = require("../../auth/use-cases/abstract/admin.use-case");
const UserService = require("../user.service");

class ChangeUsersRoleUseCase extends AdminUseCase {
	_userService = UserService;

	async _executeAuthorized() {
		const { userId, role } = this._request;
		const user = await this._userService.findById(userId);
		if (!user) throw new Error("No user with that id.");

		user.role = role;
		await this._userService.save(user);
	}
}

module.exports = ChangeUsersRoleUseCase;