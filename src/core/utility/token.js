const randomString = require("./random-string");

const DEFAULT_TOKEN_LENGTH = 32;

module.exports = (length = DEFAULT_TOKEN_LENGTH) => randomString(length);