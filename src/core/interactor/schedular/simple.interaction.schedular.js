const { BaseInteractionSchedular } = require("./base.interaction.schedular");
const { Config } = require("../../config");
const { Queue } = require("../../utility/queue");
const { Logger } = require("../../utility/logger");

/*
	The simple command schedular uses an in memory queue of commands.
	In a fixed interval a command is popped of the queue and resolved.
*/
class SimpleInteractionSchedular extends BaseInteractionSchedular {
	_interactionQueue;
	_intervalId;
	_interval;

	constructor (interval = Config.simpleSchedularInterval) {
		super();

		this._interval = interval;
		this._interactionQueue = new Queue();

		this._setResolveInterval();
	}

	schedule(interval) {
		this._interactionQueue.enqueue(interval);
		Logger.debug(`Interaction ${interval.useCaseKey} scheduled.`);
	}

	_setResolveInterval() {
		this._intervalId = setInterval(
			() => {
				if (this._interactionQueue.isEmpty())
					return;

				const interaction = this._interactionQueue.dequeue();
				this._resolveCommand(interaction);
			},
			this._interval
		);
	}
}

module.exports = { SimpleInteractionSchedular };