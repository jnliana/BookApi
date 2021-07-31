class Queue {
	_items;

	constructor(items = []) {
		this._items = items;
	}

	enqueue(item) {
		this._items.push(item);
	}

	dequeue() {
		return this._items.shift();
	}

	peek() {
		if (this.isEmpty()) 
			return null;

		return this._items[0];
	}

	length() {
		return this._items.length;
	}

	isEmpty() {
		return this.length() === 0;
	}
}

module.exports = { Queue };