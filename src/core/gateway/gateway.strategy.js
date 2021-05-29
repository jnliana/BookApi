const NotOverridenError = require("../error/not-overriden.error");

class GatewayStrategy {
	async add(entity) {
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

	_transfromToEntity(GatewayRepresentation) {
		throw new NotOverridenError();
	}
}

module.exports = GatewayStrategy;