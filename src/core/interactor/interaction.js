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
		
		let result = null;
		let error = null;

		try {
			result = await useCase.execute();
		}
		catch (e) {
			error = e;
		}
		
		this._completionCallback(result, error);
	}

	get useCaseKey() {
		return this.useCase.name;
	}
}

module.exports = { Interaction };