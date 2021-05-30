const ActivatedUseCase = require("../../auth/use-cases/abstract/activated.use-case");

class ViewProfileUseCase extends ActivatedUseCase {
	async _executeActivated() {
		return this._issuer;
	}
}

module.exports = ViewProfileUseCase;