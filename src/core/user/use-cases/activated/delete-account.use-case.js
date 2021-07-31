<<<<<<< HEAD:src/core/user/use-cases/activated/delete-account.use-case.js
const ActivatedUseCase = require("../../../use-case/activated.use-case");
const UseCaseError = require("../../../use-case/use-case.error");
const UserService = require("../../user.service");
=======
const { ActivatedUseCase } = require("../../auth/use-cases/abstract/activated.use-case");
const { UserService } = require("../user.service");
const { UseCaseError } = require("../../error/use-case.error");
>>>>>>> develop:src/core/user/use-cases/delete-account.use-case.js

class DeleteAccountError extends UseCaseError { }

class DeleteAccountUseCase extends ActivatedUseCase {
	_userService = UserService;

	async _executeActivated() {
		const user = this._issuer;

		await this._checkUserHasNoBorrowedBooks(user);
		await this._userService.removeById(user.id);
	}

	async _checkUserHasNoBorrowedBooks(user) {
		if (user.hasBorrowedABook())
			throw new DeleteAccountError("You need to return all books before deleting your account.");
	}
}

module.exports = { DeleteAccountUseCase };