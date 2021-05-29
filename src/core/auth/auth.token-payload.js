const id = require("../utility/id");

class AuthTokenPayload {
	id;
	createdAt;
	userId;

	constructor(userId) {
		this.id = id();
		this.createdAt = new Date();
		this.userId = userId;
	}
}

module.exports = AuthTokenPayload;