const NotOverridenError = require("../error/not-overriden.error");

class DbalStrategy {
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

	_transfromToEntity(dbalRepresentation) {
		throw new NotOverridenError();
	}
}

module.exports = DbalStrategy;