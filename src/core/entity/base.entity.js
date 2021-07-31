const { makeId } = require("../utility/id");

class Entity {
	id;
	createdAt;
	modifiedAt;

	constructor() {
		this.id = makeId();
		this.createdAt = new Date();
		this.modifiedAt = null;
	}
}

module.exports = { Entity };