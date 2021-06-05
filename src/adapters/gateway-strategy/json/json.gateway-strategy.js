const fs = require('fs');
const GatewayStrategy = require("../../../core/gateway/gateway.strategy");
const JsonGatewayError = require('./json.gateway-error');
const JsonGatewayInitializer = require('./json.gateway-initializer');

class JsonGatewayStrategy extends GatewayStrategy {
	_file;
	_entities;

	constructor (file) {
		super(new JsonGatewayInitializer(file));

		this._file = JsonGatewayInitializer.properifyFile(file);
		this._read();
	}

	async insert(entity) {
		this._entities.push(entity);
		await this._write();
	}

	async findById(id) {
		const entity = this._entities.filter(e => e.id === id)[0] || null;
		if (entity === null) return null;
		else return this._mapToEntity(entity);
	}

	async findAll() {
		return this._entities.map(e => this._mapToEntity(e));
	}

	async save(entity) {
		const indexOfEntity = await this._getIndexOfEntityById(entity.id);
		const entityNotFound = typeof indexOfEntity !== "number";
		if (entityNotFound) throw new JsonGatewayError("Entity cannot be saved, it doesnt exist.");

		this._entities[indexOfEntity] = entity;
		await this._write();
	}

	async removeById(id) {
		const indexOfEntity = await this._getIndexOfEntityById(id);
		const entityNotFound = typeof indexOfEntity !== "number";
		if (entityNotFound) throw new JsonGatewayError("Entity cannot be removed, it doesnt exist.");

		this._entities.splice(indexOfEntity, 1);
		await this._write();
	}

	async _getIndexOfEntityById(id) {
		for (let i = 0; i < this._entities.length; i++) {
			if (this._entities[i].id === id) return i;
		}
		return null;
	}

	_read() {
		const fileContent = fs.readFileSync(this._file).toString();
		const fileIsEmpty = fileContent === "";
		if (fileIsEmpty) this._entities = [];
		else this._entities = JSON.parse(fileContent);
	}

	async _write() {
		const newFileContent = JSON.stringify(this._entities);
		return new Promise((resolve, reject) => {
			fs.writeFile(this._file, newFileContent, error => {
				if (error) return reject(error);
				else return resolve();
			});
		});
	}
}

module.exports = JsonGatewayStrategy;