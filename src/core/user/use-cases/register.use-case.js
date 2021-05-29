const BaseUseCase = require("../../base/base.use-case");
const UserService = require("../user.service");

class RegisterUseCase extends BaseUseCase {
	_userService = UserService;

	async execute() {
		const userId = await this._userService.create(request);
		const user = await this._userService.findById(userId);
		await this._userService.issueActivation(user);
	}
}

module.exports = RegisterUseCase;