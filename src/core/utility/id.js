const uuid = require("uuid");
const nanoid = require("nanoid");

const { Config } = require("../config");

function makeId() {
	return uuid.v4();
}

function makeShortId() {
	return nanoid.nanoid(Config.shortIdLength);
}

function isId(value) {
	return uuid.validate(String(value));
}

module.exports = {
	makeId,
	makeShortId,
	isId
};