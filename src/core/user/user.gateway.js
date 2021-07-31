<<<<<<< HEAD
const Config = require('../config');
const User = require("./user.entity");
const EntityGateway = require("../entity/entity.gateway");
=======
const { Config } = require('../config');
const { User } = require("./user.entity");
const { JsonGatewayStrategy } = require("../../strategies/gateway/json/json.gateway-strategy");
>>>>>>> develop

class UserGateway extends EntityGateway {
	async findByEmail(email) {
		const user = this._entities.filter(user => user.email === email)[0] || null;
		if (user === null) return null;
		else return this._mapToEntity(user);
	}

	async findByActivationToken(activationToken) {
		const user = this._entities.filter(user => user.activation.token === activationToken)[0] || null;
		if (user === null) return null;
		else return this._mapToEntity(user);
	}

	_mapToEntity(gatewayRepresentation) {
		const user = new User();

		user.id = gatewayRepresentation.id;
		user.createdAt = gatewayRepresentation.createdAt;
		user.modifiedAt = gatewayRepresentation.modifiedAt;

		user.firstName = gatewayRepresentation.firstName;
		user.lastName = gatewayRepresentation.lastName;
		user.email = gatewayRepresentation.email;
		user.passwordHash = gatewayRepresentation.passwordHash;
		user.activated = gatewayRepresentation.activated;
		user.activation = gatewayRepresentation.activation;
		user.role = gatewayRepresentation.role;
		user.borrowedBooks = gatewayRepresentation.borrowedBooks;

		return user;
	}
}

module.exports = { UserGateway: Object.freeze(new UserGateway(Config.userDataJsonFile)) };