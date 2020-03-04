/**
 * @class
 */
class History {
	index = -1;

	schemaList = [];

	constructor(schema) {
		this.schema = schema;
	}

	/**
	 * @param  {} data
	 */
	push(data) {
		this.schemaList.push(JSON.stringify(data).trim(" "));
		this.index++;
		this.schema.editor.fire("change");
	}
	/**
	 * @param  {} index
	 * @param  {} data
	 */
	replace(index, data) {
		this.schemaList[this.index + index] = data;
	}

	// 重做
	redo() {
		this.schema.data = JSON.parse(this.schemaList[++this.index]);
		this.schema.editor.fire("change");
	}

	// 撤销
	undo() {
		this.schema.data = JSON.parse(this.schemaList[--this.index]);
		this.schema.editor.fire("change");
	}
}
export default History;
