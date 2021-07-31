const useCases = Object.freeze([
	...require("./auth/use-cases").UseCases,
	...require("./book/use-cases").UseCases,
	...require("./user/use-cases").UseCases
]);

module.exports = { UseCases: useCases };