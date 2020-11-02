/**
 * @class
 */
class Event {
	
	events = {};
	/**
	 * 箭头
	 * @param {String} event 
	 * @param {Function} func 
	 * @param {number} [index]
	 */
	on(event, func, index) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		index = index || this.events[event].length;
		this.events[event].push({ index, func });
		// 按照index顺序执行
		this.events[event].sort((a, b) => a.index > b.index);
	}

	/**
	 * 
	 * @param {String} event 
	 * @param {*} data 
	 */
	fire(event, data) {
		const events = this.events[event] || [];
		events.forEach(item => {
			item.func(data);
		});
	}

	/**
	 * 关闭绑定的事件
	 * @param {String} event 
	 * @param {Function} [offFunc] 不传清空所有
	 */
	off(event, offFunc) {
		this.events[event] = this.events[event].filter(func => offFunc !== func);
	}

	/**
	 * 清空
	 */
	clear() {
		delete this.events;
	}

	dispatch = this.fire;
}
export default Event;