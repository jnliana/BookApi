const ActivatedUseCase = require("../../auth/use-cases/abstract/activated.use-case");
const NotImplementedError = require("../../error/not-implemented.error");

class ChangeEmailUseCase extends ActivatedUseCase {
	async _executeActivated() {
		throw new NotImplementedError();
	}
}

module.exports = ChangeEmailUseCase;