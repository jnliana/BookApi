const { BaseError } = require("../base/base.error");

class AuthError extends BaseError { }

module.exports = { AuthError };