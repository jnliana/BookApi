<<<<<<< HEAD
const BaseUseCase = require("../../use-case/base.use-case");
const UserService = require("../user.service");
=======
const { BaseUseCase } = require("../../base/base.use-case");
const { UserService } = require("../user.service");
>>>>>>> develop

class ReissueActivationUseCase extends BaseUseCase {
	_userService = UserService;

	async execute() {
		const { email } = this._requst;

		const user = await this._getUser(email);
		await this._checkUserIsNotYetActivated(user);
		await this._userService.issueActivation(user);
	}

	async _getUser(email) {
		const user = await this._userService.findByEmail(email);
		if (!user)
			throw new Error("No user with that email.");
		return user;
	}

	async _checkUserIsNotYetActivated(user) {
		if (user.isActivated())
			throw new Error("User is already activated.");
	}
}

module.exports = { ReissueActivationUseCase };