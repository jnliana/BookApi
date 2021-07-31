const { JsonGatewayStrategy } = require("../../strategies/gateway/json/json.gateway-strategy");

class BaseGateway extends JsonGatewayStrategy { }

module.exports = { BaseGateway };