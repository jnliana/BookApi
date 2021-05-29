const BaseUseCase = require("../../base/base.use-case");
const hoursToMiliseconds = require("../../utility/hours-to-miliseconds");
const UserService = require("../user.service");

class ActivateUseCase extends BaseUseCase {
	_ACTIVATION_TOKEN_VALDITY_DURATION_IN_HOURS = 48;
	_userService = UserService;

	async execute() {
		const { activationToken } = this._request;
		const user = await this._userService.findByActivationToken(activationToken);
		if (!user) throw new Error("No user with that activation token");
		if (!this._isActivationTokenStillValid(user)) throw new Error("Activation token no longer valid.");

		user.activated = true;
		user.activation.completedAt = new Date();
	}

	_isActivationTokenStillValid(user) {
		const now = new Date().valueOf();
		const issuedAt = user.activation.issuedAt.valueOf();
		const timeSinceIssueing = now - issuedAt;
		const validityDuration = hoursToMiliseconds(this._ACTIVATION_TOKEN_VALDITY_DURATION_IN_HOURS);

		return timeSinceIssueing < validityDuration;
	}
}

module.exports = ActivateUseCase;