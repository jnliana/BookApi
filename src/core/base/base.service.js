const NotOverridenError = require("../error/not-overriden.error");

class BaseService {
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

	async updateById(id, updatedEntity) {
		throw new NotOverridenError();
	}

	async patchById(id, patch) {
		throw new NotOverridenError();
	}

	async removeById(id) {
		return await this._gateway.removeById(id);
	}
}

module.exports = BaseService;