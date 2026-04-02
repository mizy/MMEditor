import Schema, { MMEditorSchema } from "./Schema";
/**
 * History
 */
declare class History {
    index: number;
    schemaList: string[];
    schema: Schema;
    constructor(schema: Schema);
    /**
     */
    push(data: MMEditorSchema): void;
    pop(): void;
    replace(index: number, data: string): void;
    redo(): boolean;
    undo(): boolean;
    clear(): void;
    reset(): void;
}
export default History;
