const crypto = require('crypto');

// this is a poor implementation but I can read it just fine so for now we go with readability over performance

function randomString() {
	return crypto.randomBytes(256).toString("base64");
}

module.exports = length => {
	let string = "";
	while (string.length < length) string += randomString();
	return string.substring(0, length);
}