const BaseUseCase = require("../../base/base.use-case");
const UserService = require("../user.service");

class ReissueActivationUseCase extends BaseUseCase {
	_userService = UserService;

	async execute() {
		const { email } = this._requst;
		const user = await this._userService.findByEmail(email);
		if (!user) throw new Error("No user with that email.");
		if (user.isActivated()) throw new Error("User is already activated.");

		await this._userService.issueActivation(user);
	}
}

module.exports = ReissueActivationUseCase;