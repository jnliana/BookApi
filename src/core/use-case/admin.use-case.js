<<<<<<< HEAD:src/core/use-case/admin.use-case.js
const NotOverridenError = require("../error/not-overriden.error");
const AuthError = require("../auth/auth.error");
const UserRoles = require("../user/user.roles");
const AuthorizedUseCase = require("./authorized.use-case");
=======
const { AuthorizedUseCase } = require("./authorized.use-case");
const { NotOverridenError } = require("../../../error/not-overriden.error");
const { UserRoles } = require("../../../user/user.roles");
const { AuthError } = require("../../auth.error");
>>>>>>> develop:src/core/auth/use-cases/abstract/admin.use-case.js

class AdminUseCase extends AuthorizedUseCase {
	async _isAuthorizedGuard() {
		if (this._issuer.role !== UserRoles.ADMIN) throw new AuthError("User is not an admin.");
	}

	async _executeAuthorized() {
		throw new NotOverridenError();
	}
}

module.exports = { AdminUseCase };