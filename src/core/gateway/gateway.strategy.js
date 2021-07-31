const { NotOverridenError } = require("../error/not-overriden.error");

class GatewayStrategy {
	constructor(initializer) {
		initializer.initialize();
	}

	async insert(entity) {
		throw new NotOverridenError();
	}

	async findById(id) {
		throw new NotOverridenError();
	}

	async findAll() {
		throw new NotOverridenError();
	}

	async save(entity) {
		throw new NotOverridenError();
	}

	async removeById(id) {
		throw new NotOverridenError();
	}

	_mapToEntity(gatewayRepresentation) {
		throw new NotOverridenError();
	}
}

module.exports = { GatewayStrategy };