const BaseUseCase = require("../../base/base.use-case");
const NotImplementedError = require("../../error/not-implemented.error");

class ConfirmEmailResetUseCase extends BaseUseCase {
	async _execute() {
		throw new NotImplementedError();
	}
}

module.exports = ConfirmEmailResetUseCase;