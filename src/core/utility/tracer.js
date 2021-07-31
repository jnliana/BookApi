const { initTracer } = require("jaeger-client");
const { Config } = require("../config");

class Tracer {
	_tracer;

	constructor (serviceName) {
		this._tracer = initTracer({
			serviceName: serviceName,
			sampler: {
				type: "const",
				param: 1
			}
		});
	}

	startSpan(name) {
		return this._tracer.startSpan(name);
	}

	startChildSpan(name, parentSpan) {
		return this._tracer.startSpan(name, { childOf: parentSpan });
	}

	getTraceIdOfSpan(span) {
		return span._spanContext.traceId.toString("hex");
	}
}

module.exports = { Tracer: Object.freeze(new Tracer(Config.serviceName)) };