<<<<<<< HEAD
const BaseUseCase = require("../../use-case/base.use-case");
const NotImplementedError = require("../../error/not-implemented.error");
=======
const { BaseUseCase } = require("../../base/base.use-case");
const { NotImplementedError } = require("../../error/not-implemented.error");
>>>>>>> develop

class ResetPasswordUseCase extends BaseUseCase {
	async _execute() {
		throw new NotImplementedError();
	}
}

module.exports = { ResetPasswordUseCase };