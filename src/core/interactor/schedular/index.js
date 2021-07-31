const { Config } = require("../../config");
const { NoopInteractionSchedular } = require("./noop.interaction.schedular");
const { SimpleInteractionSchedular } = require("./simple.interaction.schedular");

const SchedularStrategies = {
	Simple: SimpleInteractionSchedular,
	Noop: NoopInteractionSchedular
};

function determineStrategy() {
	for (const strategy in SchedularStrategies) {
		if (strategy === Config.schedularStrategy)
			return SchedularStrategies[strategy];
	}

	return SchedularStrategies.Noop;
}

module.exports = { InteractionSchedular: determineStrategy() };