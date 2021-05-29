const bcryptjs = require("bcryptjs");

module.exports.hash = value => bcryptjs.hashSync(value);

module.exports.compareHash = (value, hash)  => bcryptjs.compareSync(value, hash);