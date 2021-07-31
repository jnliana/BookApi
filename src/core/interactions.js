function useCasesToInteractions(useCases) {
	return useCases.reduce((accumulator, currentValue) => {
		const name = currentValue.name;
		const key = name.replace("UseCase", "");
		accumulator[key] = name;
		return accumulator;
	}, {});
}

const interactions = Object.freeze({
	Auth: useCasesToInteractions(require("./auth/use-cases").UseCases),
	Book: useCasesToInteractions(require("./book/use-cases").UseCases),
	User: useCasesToInteractions(require("./user/use-cases").UseCases)
});

module.exports = { Interactions: interactions };