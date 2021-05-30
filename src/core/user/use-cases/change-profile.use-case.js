const ActivatedUseCase = require("../../auth/use-cases/abstract/activated.use-case");
const UserService = require("../user.service");

class ChangeProfileUseCase extends ActivatedUseCase {
	_userService = UserService;

	async _executeActivated() {
		const user = this._issuer;
		
		await this._applyChanges(user, this._request);
		await this._userService.save(user);
	}

	async _applyChanges(user, { firstName, lastName }) {
		if (firstName !== undefined)
			user.firstName = firstName;
			
		if (lastName !== undefined)
			user.lastName = lastName;
	}
}

module.exports = ChangeProfileUseCase;