const { BaseUseCase } = require("../../base/base.use-case");
const { hoursToMiliseconds } = require("../../utility/hours-to-miliseconds");
const { UserService } = require("../user.service");
const { UseCaseError } = require("../../error/use-case.error");

class ActivationError extends UseCaseError { }

class ActivateUseCase extends BaseUseCase {
	_ACTIVATION_TOKEN_VALDITY_DURATION_IN_HOURS = 48;
	_userService = UserService;

	async execute() {
		const { activationToken } = this._request;

		const user = await this._getUser(activationToken);

		await this._checkTokenIsStillValid(user);
		await this._completeUsersActivation(user);
	}

	async _getUser(activationToken) {
		const user = await this._userService.findByActivationToken(activationToken);
		if (!user)
			throw new ActivationError("No user with that activation token");

		return user;
	}

	async _checkTokenIsStillValid(user) {
		if (!this._isActivationTokenStillValid(user))
			throw new ActivationError("Activation token no longer valid.");
	}

	_isActivationTokenStillValid(user) {
		const now = new Date().valueOf();
		const issuedAt = user.activation.issuedAt.valueOf();
		const timeSinceIssueing = now - issuedAt;
		const validityDuration = hoursToMiliseconds(this._ACTIVATION_TOKEN_VALDITY_DURATION_IN_HOURS);

		return timeSinceIssueing < validityDuration;
	}

	async _completeUsersActivation(user) {
		user.activation.completedAt = new Date();
		user.activation.completed = true;
		await this._userService.save(user);
	}
}

module.exports = { ActivateUseCase };