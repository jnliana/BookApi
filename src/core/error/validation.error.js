const { BaseError } = require("../base/base.error");

class ValidationError extends BaseError { }

module.exports = { ValidationError };