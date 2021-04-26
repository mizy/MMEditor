/**
 * @class
 */
class Event {
<<<<<<< HEAD
	
	events = {};
	/**
	 * 箭头
	 * @param {String} event 
	 * @param {Function} func 
	 * @param {number} [index]
=======
	events = {};
	/**
	 * 箭头
	 * @param {*} event 
	 * @param {*} func 
	 * @param {*} index 
>>>>>>> tddevelop
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
<<<<<<< HEAD
	 * @param {String} event 
=======
	 * @param {*} event 
>>>>>>> tddevelop
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
<<<<<<< HEAD
	 * @param {String} event 
	 * @param {Function} [offFunc] 不传清空所有
=======
	 * @param {*} event 
	 * @param {*} offFunc 不传清空所有
>>>>>>> tddevelop
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