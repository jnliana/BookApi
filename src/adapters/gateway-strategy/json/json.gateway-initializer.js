const fs = require('fs');
const path = require('path');
const GatewayInitializer = require('../../../core/gateway/gateway.initializer');
const JsonGatewayError = require('./json.gateway-error');

class JsonGatewayInitializer extends GatewayInitializer {
	_file;

	static properifyFile(file) {
		if (path.isAbsolute(file) === false)
			file = path.join(process.cwd(), file);

		return path.normalize(file);
	}

	constructor (file) {
		super();

		this._file = JsonGatewayInitializer.properifyFile(file);
	}

	async initialize() {
		this._checkFileIsJson();

		if (this._doesFileExist()) this._checkFileAccess();
		else this._createNewFile();

		this._ensureFileContainsAnArray();
	}

	_checkFileIsJson() {
		if (this._file.endsWith(".json") === false)
			throw new JsonGatewayError("File for JsonGateway needs to end with .json!");
	}

	_doesFileExist() {
		return fs.existsSync(this._file);
	}

	_checkFileAccess() {
		this._checkFilePermission();
		this._checkFileIsNotDirectory();
	}

	_checkFilePermission() {
		try {
			fs.accessSync(this._file);
		} catch (e) {
			console.error(e);
			throw new JsonGatewayError("Not allowed no access the file.");
		}
	}

	_checkFileIsNotDirectory() {
		const fileIsDirectory = fs.statSync(this._file).isDirectory();
		if (fileIsDirectory) {
			throw new JsonGatewayError("Provied file is actually a directory!");
		}
	}

	_createNewFile() {
		fs.writeFileSync(this._file, "");
	}

	_ensureFileContainsAnArray() {
		const stringContent = fs.readFileSync(this._file).toString();

		const contentIsAnArray = stringContent.startsWith("[") && stringContent.endsWith("]");
		if (contentIsAnArray === false) {
			fs.writeFileSync(this._file, "[]");
		}
	}
}

module.exports = JsonGatewayInitializer;