const fs = require('fs');
const path = require('path');
const GatewayStrategy = require("../../../core/gateway/gateway.strategy");
const JsonGatewayError = require('./json.gateway-error');

class JsonGatewayStrategy extends GatewayStrategy {
	_file;
	_entities;

	constructor (file) {
		super();

		file = this._makeFileAbsolute(file)
		this._file = path.normalize(file);
		this._checkFileAccess();
		this._read();
	}

	async add(entity) {
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
		const entityNotFound = typeof indexOfEntity !== "number"
		if (entityNotFound) throw new JsonGatewayError("Entity cannot be saved, it doesnt exist.");

		this._entities[indexOfEntity] = entity;
		await this._write();
	}

	async removeById(id) {
		const indexOfEntity = await this._getIndexOfEntityById(id);
		const entityNotFound = typeof indexOfEntity !== "number"
		if (entityNotFound) throw new JsonGatewayError("Entity cannot be deleted, it doesnt exist.");

		this._entities.splice(indexOfEntity, 1);
		await this._write();
	}

	async _getIndexOfEntityById(id) {
		for (let i = 0; i < this._entities.length; i++) {
			if (this._entities[i].id === id) return i;
		}
		return null;
	}

	_makeFileAbsolute(file) {
		if (path.isAbsolute(file)) return file;
		else return path.join(process.cwd(), file);
	}

	_read() {
		const fileContent = fs.readFileSync(this._file).toString();
		const fileIsEmpty = fileContent === ""
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

	_checkFileAccess() {
		this._checkFileExists();
		this._checkFilePermission();
		this._checkFileIsNotDirectory();
	}

	_checkFileIsNotDirectory() {
		const fileIsDirectory = fs.statSync(this._file).isDirectory();
		if (fileIsDirectory) {
			throw new JsonGatewayError("Provied file is actually a directory!");
		}
	}

	_checkFilePermission() {
		try {
			fs.accessSync(this._file);
		} catch (e) {
			throw new JsonGatewayError("Not allowed no access the file.");
		}
	}

	_checkFileExists() {
		const fileDoeNotExist = fs.existsSync(this._file) === false;
		if (fileDoeNotExist) {
			throw new JsonGatewayError("JSON file for data storage does not exist: " + this._file);
		}
	}
}

module.exports = JsonGatewayStrategy;