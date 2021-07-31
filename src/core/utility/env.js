function parseNumberFromEnv(key, defaultValue) {
	return process.env[key] ? Number(process.env[key]) : defaultValue;
}

function parseBooleanFromEnv(key) {
	return process.env[key] === "true" || process.env[key] === true;
}

function parseStringFromEnv(key, defaultValue) {
	return process.env[key] ? String(process.env[key]) : defaultValue;
}

module.exports = {
	parseBooleanFromEnv,
	parseNumberFromEnv,
	parseStringFromEnv
};