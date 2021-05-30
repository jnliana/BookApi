const ActivatedUseCase = require("../../auth/use-cases/abstract/activated.use-case");
const UserService = require("../user.service");

class ChangeProfileUseCase extends ActivatedUseCase {
	_userService = UserService;

	async _executeActivated() {
		const { firstName, lastName } = this._request;
		const user = this._issuer;
		
		if (firstName !== undefined) user.firstName = firstName;
		if (lastName !== undefined) user.lastName = lastName;

		await this._userService.save(user);
	}
}

module.exports = ChangeProfileUseCase;