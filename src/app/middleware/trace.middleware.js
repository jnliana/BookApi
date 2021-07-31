const { Tracer } = require("../../core/utility/tracer");

function makeTraceMiddleware() {
	return (async (req, res, next) => {
		const span = Tracer.startSpan("http-request");
		req._span = span;

		span.addTags({
			protocol: req.protocol,
			httpVersion: req.httpVersion,
			method: req.method,
			url: req.originalUrl,
			ip: req.ip,
		});

		res.on("finish", async () => {
			span.log({ 
				event: "finish",
				statusCode: res.statusCode
			});

			span.finish();
		});
		
		next();
	});
}

function getSpanFromRequest(req) {
	return req._span;
}

function startRequestChildSpan(req, name) {
	const span = getSpanFromRequest(req);
	return Tracer.startChildSpan(name, span);
}

module.exports = { 
	makeTraceMiddleware,
	getSpanFromRequest,
	startRequestChildSpan
};