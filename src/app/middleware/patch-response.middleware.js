const { Tracer } = require("../../core/utility/tracer");
const { getSpanFromRequest } = require("../middleware/trace.middleware");

function makePatchResponseMiddleware() {
	return async (req, res, next) => {
		res.deliver = (status, { message, payload, error }) => {
			const span = getSpanFromRequest(res.req);

			return res.status(status).json({
				status,
				payload,
				message,
				error,
				trace: Tracer.getTraceIdOfSpan(span),
				sendAt: new Date()
			});
		}

		res.deliverPayload = (status, payload) => res.deliver(status, { payload });
		res.deliverMessage = (status, message) => res.deliver(status, { message });
		res.deliverError = (status, error) => res.deliver(status, { error });

		next();
	}
}

module.exports = { makePatchResponseMiddleware };