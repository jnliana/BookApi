const { randomString } = require("./random-string");

const DEFAULT_TOKEN_LENGTH = 32;

function makeToken(length = DEFAULT_TOKEN_LENGTH) {
	return randomString(length);
}

module.exports = { makeToken };