const id = require("../utility/id");

class Entity {
	id;
	createdAt;
	modifiedAt;

	constructor() {
		this.id = id();
		this.createdAt = new Date();
		this.modifiedAt = null;
	}
}

module.exports = Entity;