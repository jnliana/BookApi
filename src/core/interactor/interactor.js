const { BaseError } = require("../base/base.error");
const { UseCases } = require("../use-cases");
const { Logger } = require("../utility/logger");
const { Interaction } = require("./interaction");

const { NoopInteractionSchedular } = require("./schedular/noop.interaction.schedular");

class Interactor {
	_useCases;
	_schedular;

	constructor (useCases = [], schedular = new NoopInteractionSchedular()) {
		this._useCases = useCases;
		this._schedular = schedular;
		this._schedular.addResolveListener(async interaction => await interaction.execute());
	}

	interact(useCaseKey, params, completionCallback) {
		Logger.debug(`Interaction ${useCaseKey} issued.`);

		const useCase = this._findUseCaseByKey(useCaseKey);
		if (!useCase)
			throw new BaseError("Unsupported use case.");

		const interaction = new Interaction(useCase, params, completionCallback);
		this._schedular.schedule(interaction);
	}

	_findUseCaseByKey(useCaseKey) {
		return this._useCases.find(useCase => useCase.name === useCaseKey);
	}
}

module.exports = {
	Interactor: Object.freeze(
		new Interactor(UseCases)
	)
};