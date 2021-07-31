const { makeAuthRouter } = require("./auth");
const { makePingRouter } = require("./ping");
const { makeTimeoutRouter } = require("./timeout");
const { makeUserRouter } = require("./user");
const { makeBookRouter } = require("./book");

const Routes = Object.freeze([
	{
		path: "/ping",
		router: makePingRouter
	}, {
		path: "/timeout-test",
		router: makeTimeoutRouter
	}, {
		path: "/auth",
		router: makeAuthRouter
	}, {
		path: "/book",
		router: makeBookRouter,
	}, {
		path: "/user",
		router: makeUserRouter
	}
]);

module.exports = { Routes };