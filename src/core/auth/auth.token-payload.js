const { makeId } = require("../utility/id");

class AuthTokenPayload {
	id;
	createdAt;
	userId;

	constructor (userId) {
		this.id = makeId();
		this.createdAt = new Date();
		this.userId = userId;
	}
}

module.exports = { AuthTokenPayload };