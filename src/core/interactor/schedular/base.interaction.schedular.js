const { EventEmitter } = require("events");

const { NotOverridenError } = require("../../error/not-overriden.error");
const { Logger } = require("../../utility/logger");

class BaseInteractionSchedular {
	_eventName = "use-case:resolve";
	_emitter;

	constructor (resolveListener) {
		this._emitter = new EventEmitter();

		if (!!resolveListener) this.addResolveListener(resolveListener);
	}

	schedule(interaction) {
		throw new NotOverridenError();
	}

	addResolveListener(listener) {
		this._emitter.addListener(this._eventName, listener);
	}

	_resolveInteraction(interaction) {
		this._emitter.emit(this._eventName, interaction);
		Logger.debug(`Interaction ${interaction.useCaseKey} resolved.`);
	}
}

module.exports = { BaseInteractionSchedular };