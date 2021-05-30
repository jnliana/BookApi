const AuthorizedUseCase = require("./authorized.use-case");
const NotOverridenError = require("../../../error/not-overriden.error");
const UserRoles = require("../../../user/user.roles");
const AuthError = require("../../auth.error");

class LibrarianUseCase extends AuthorizedUseCase {
	async _isAuthorizedGuard() {
		if (![UserRoles.ADMIN, UserRoles.LIBRARIAN].includes(this._issuer.role))
			throw new AuthError("User is not a librarian.");
	}

	async _executeAuthorized() {
		throw new NotOverridenError();
	}
}

module.exports = LibrarianUseCase;