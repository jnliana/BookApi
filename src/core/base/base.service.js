const NotOverridenError = require("../error/not-overriden.error");

class BaseService {
	_dbal;
	_validator;

	constructor (dbal, validator) {
		this._dbal = dbal;
		this._validator = validator;
	}

	async create(entity) {
		throw new NotOverridenError();
	}

	async findById(id) {
		return await this._dbal.findById(id);
	}

	async findAll() {
		return await this._dbal.findAll();
	}

	async updateById(id, updatedEntity) {
		throw new NotOverridenError();
	}

	async patchById(id, patch) {
		throw new NotOverridenError();
	}

	async removeById(id) {
		return await this._dbal.removeById(id);
	}
}

module.exports = BaseService;