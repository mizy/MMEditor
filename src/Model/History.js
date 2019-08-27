class History {
	index = -1;

	schemaList = [];

	constructor(schema) {
		this.schema = schema;
	}

	push(data) {
		console.log(this.index);
		this.schemaList.push(JSON.stringify(data).trim(" "));
		this.index++;
		this.schema.editor.fire("change");
	}

	replace(index, data) {
		this.schemaList[this.index + index] = data;
	}

	// 重新设置shema
	redo() {
		this.schema.data = JSON.parse(this.schemaList[++this.index]);
		this.schema.editor.fire("change");
	}

	undo() {
		this.schema.data = JSON.parse(this.schemaList[--this.index]);
		this.schema.editor.fire("change");
	}
}
export default History;
