const { NotOverridenError } = require("../error/not-overriden.error");

class EntityService {
	_gateway;
	_validator;

	constructor (gateway, validator) {
		this._gateway = gateway;
		this._validator = validator;
	}

	async create(entity) {
		throw new NotOverridenError();
	}

	async findById(id) {
		return await this._gateway.findById(id);
	}

	async findAll() {
		return await this._gateway.findAll();
	}

	async removeById(id) {
		return await this._gateway.removeById(id);
	}

	async save(entity) {
		entity.modifiedAt = new Date();
		await this._gateway.save(entity);
	}
}

<<<<<<< HEAD:src/core/entity/entity.service.js
module.exports = EntityService;
=======
module.exports = { BaseService };
>>>>>>> develop:src/core/base/base.service.js
