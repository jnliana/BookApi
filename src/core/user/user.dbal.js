const Config = require('../config');
const User = require("./user.entity");
const JsonDbalStrategy = require("../../adapters/dbal-strategy/json/json.dbal-strategy");

class UserDbal extends JsonDbalStrategy {
	async findByEmail(email) {
		const user = this._entities.filter(user => user.email === email)[0] || null;
		if (user === null) return null;
		else return this._transfromToEntity(user);
	}

	async findByActivationToken(activationToken) {
		const user = this._entities.filter(user => user.activation.token === activationToken)[0] || null;
		if (user === null) return null;
		else return this._transfromToEntity(user);
	}

	_transfromToEntity(dbalRepresentation) {
		const user = new User();

		user.id = dbalRepresentation.id;
		user.createdAt = dbalRepresentation.createdAt;
		user.modifiedAt = dbalRepresentation.modifiedAt;

		user.firstName = dbalRepresentation.firstName;
		user.lastName = dbalRepresentation.lastName;
		user.email = dbalRepresentation.email;
		user.passwordHash = dbalRepresentation.passwordHash;
		user.activated = dbalRepresentation.activated;
		user.activation = dbalRepresentation.activation;
		user.borrowedBooks = dbalRepresentation.borrowedBooks;

		return user;
	}
}

module.exports = Object.freeze(new UserDbal(Config.USER_DATA_JSON_FILE));