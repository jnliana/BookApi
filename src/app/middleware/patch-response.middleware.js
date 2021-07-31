const { Tracer } = require("../../core/utility/tracer");
const { getSpanFromRequest } = require("../middleware/trace.middleware");

function makePatchResponseMiddleware() {
	return async (req, res, next) => {
		res.deliver = (status, { message, payload }) => {
			const span = getSpanFromRequest(res.req);

			return res.status(status).json({
				status,
				payload,
				message,
				trace: Tracer.getTraceIdOfSpan(span),
				sendAt: new Date()
			});
		}

		res.deliverPayload = (status, payload) => res.deliver(status, { payload });
		res.deliverMessage = (status, message) => res.deliver(status, { message });

		next();
	}
}

module.exports = { makePatchResponseMiddleware };