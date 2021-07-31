const StatusCodes = Object.freeze({
	OK: 200,
	CREATED: 201,
	REDIRECT: 300,
	BAD_REQUEST: 400,
	NOT_AUTHENTICATED: 401,
	NOT_AUTHORIZED: 403,
	NOT_FOUND: 404,
	CLIENT_TIMEOUT: 408,
	INTERNAL_ERROR: 500,
	SERVER_TIMEOUT: 503
});

module.exports = { StatusCodes };