const { BaseInteractionSchedular } = require("./base.interaction.schedular");
const { Logger } = require("../../utility/logger");

class NoopInteractionSchedular extends BaseInteractionSchedular {
	schedule(interaction) {
		Logger.debug(`Interaction ${interaction.useCaseKey} scheduled.`);
		this._resolveInteraction(interaction);
	}
}

module.exports = { NoopInteractionSchedular };