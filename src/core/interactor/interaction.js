const { makeId } = require("../utility/id");

class Interaction {
	id;
	useCase;
	params;

	_completionCallback;

	constructor (useCase, params, completionCallback) {
		this.id = makeId();

		this.useCase = useCase;
		this.params = params;
		this._completionCallback = completionCallback;
	}

	async execute() {
		const useCase = new this.useCase(this.params);
		const result = await useCase.execute();
		this._completionCallback(result);
	}

	get useCaseKey() {
		return this.useCase.name;
	}
}

module.exports = { Interaction };