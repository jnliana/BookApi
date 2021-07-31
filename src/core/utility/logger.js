const { Config } = require("../config");

const LogLevel = Object.freeze({
	Error: 0,
	Warn: 1,
	Info: 2,
	Log: 3,
	Debug: 4,
	Trace: 5
});

class Logger {
	_logLevel;

	constructor (logLevel) {
		this._logLevel = logLevel;
	}

	trace(...args) {
		const logLevel = LogLevel.Trace;

		if (this._shouldNotLog(logLevel)) return;

		console.trace(this._prefix(logLevel), ...args);
	}

	debug(...args) {
		const logLevel = LogLevel.Debug;

		if (this._shouldNotLog(logLevel)) return;

		console.debug(this._prefix(logLevel), ...args);
	}

	log(...args) {
		const logLevel = LogLevel.Log;

		if (this._shouldNotLog(logLevel)) return;

		console.log(this._prefix(logLevel), ...args);
	}

	info(...args) {
		const logLevel = LogLevel.Info;

		if (this._shouldNotLog(logLevel)) return;

		console.info(this._prefix(logLevel), ...args);
	}

	warn(...args) {
		const logLevel = LogLevel.Warn;

		if (this._shouldNotLog(logLevel)) return;

		console.warn(this._prefix(logLevel), ...args);
	}

	error(...args) {
		const logLevel = LogLevel.Error;

		if (this._shouldNotLog(logLevel)) return;

		console.error(this._prefix(logLevel), ...args);
	}

	table(array) {
		const logLevel = LogLevel.Debug;

		if (this._shouldNotLog(logLevel)) return;

		console.debug(this._prefix(logLevel), "🧮");
		console.table(array);
	}

	inspect(object) {
		const logLevel = LogLevel.Debug;

		if (this._shouldNotLog(logLevel)) return;

		console.debug(this._prefix(logLevel), "👁️");
		console.dir(object, {
			depth: 4,
			colors: true,
			showHidden: true
		});
	}

	_prefix(logLevel) {
		const logLevelEmoji = this._getLogLevelEmoji(logLevel);

		// UTC string but without day of week and timezone
		const timestamp = new Date().toUTCString().substring(5, 25);

		return `${logLevelEmoji} [ ${timestamp} ]`;
	}

	_shouldNotLog(logLevel) {
		return logLevel > this._logLevel;
	}

	_getLogLevelEmoji(logLevel) {
		switch (logLevel) {
			case LogLevel.Error: return "🔥";
			case LogLevel.Warn: return "⚠️"
			case LogLevel.Info: return "📣";
			case LogLevel.Log: return "💬";
			case LogLevel.Debug: return "🔧";
			case LogLevel.Trace: return "⚙️";
			default: return "💭";
		}
	}
}

module.exports = {
	Logger: Object.freeze(new Logger(Config.logLevel)),
	LogLevel
};