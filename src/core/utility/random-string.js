const crypto = require('crypto');

module.exports = length => {
	let string = "";
	while (string.length < length) string += randomString();
	return string.substring(0, length);
}

function randomString() {
	return crypto.randomBytes(256).toString("hex");
}