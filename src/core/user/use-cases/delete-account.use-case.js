const ActivatedUseCase = require("../../auth/use-cases/abstract/activated.use-case");
const UserService = require("../user.service");
const UseCaseError = require("../../error/use-case.error");

class DeleteAccountError extends UseCaseError { }

class DeleteAccountUseCase extends ActivatedUseCase {
	_userService = UserService;

	async _executeActivated() {
		const user = this._issuer;
		if (user.hasBorrowedABook())
			throw new DeleteAccountError("You need to return all books before deleting your account.");

		await this._userService.removeById(user.id);
	}
}

module.exports = DeleteAccountUseCase;