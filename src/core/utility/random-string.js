const crypto = require('crypto');

// this is a poor implementation but I can read it just fine so for now we go with readability over performance

function randomString(length) {
	let string = "";

	while (string.length < length) 
		string += generateMoreString();

	return string.substring(0, length);
}

function generateMoreString() {
	return crypto.randomBytes(256).toString("base64");
}

module.exports = { randomString };