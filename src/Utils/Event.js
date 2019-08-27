export default class Event {
	events = {};
	on(event, func, index) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		index = index || this.events[event].length;
		this.events[event].push({ index, func });
		// 按照index顺序执行
		this.events[event].sort((a, b) => a.index > b.index);
	}

	fire(event, data) {
		const events = this.events[event] || [];
		events.forEach(item => {
			item.func(data);
		});
	}

	off(event, offFunc) {
		this.events[event] = this.events[event].filter(func => offFunc !== func);
	}

	clear() {
		delete this.events;
	}

	dispatch = this.fire;
}
