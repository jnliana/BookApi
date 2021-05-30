const BaseUseCase = require("../../base/base.use-case");
const NotImplementedError = require("../../error/not-implemented.error");

class ResetPasswordUseCase extends BaseUseCase {
	async _execute() {
		throw new NotImplementedError();
	}
}

module.exports = ResetPasswordUseCase;