const { Router } = require("express"); 
const { Routes } = require("./routes"); 

function makeRouter() {
	const router = Router();

	Routes.forEach(route => {
		router.use(route.path, route.router())
	});

	return router;
}

module.exports = { makeRouter };