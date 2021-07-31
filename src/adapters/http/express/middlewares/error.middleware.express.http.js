const { AuthError } = require("../../../../core/auth/auth.error");
const { UseCaseError } = require("../../../../core/error/use-case.error");
const { ValidationError } = require("../../../../core/error/validation.error");

module.exports = async (error, req, res, next) => {
	let status = 500;
	let message = "Something went wrong.";
	let type = "Internal error";

	if (error instanceof AuthError) status = 401;
	if (error instanceof UseCaseError || error instanceof ValidationError) status = 400;

	if (status !== 500) {
		type = error.constructor.name;
		message = error.message;
	}
	else console.error(error);

	return res.status(status).json({ status, type, message });
};