const { hashSync, compareSync } = require("bcryptjs");

function hash(data) {
	return hashSync(data);
}

function compare(hash, data) {
	return compareSync(data, hash);
}

module.exports = {
	hash,
	compare
};