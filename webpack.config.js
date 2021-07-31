const path = require('path');
const { Config } = require('./src/core/config');

module.exports = {
	entry: './src/main.js',
	mode: Config.isProduction ? "production" : "development",
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		clean: false
	}
};