import Node from "./Node";
import Line from "./Line";
import AnchorLine from "./AnchorLine";
import MMEditor from "../MMEditor";
import { MMEditorSchema } from "../Model/Schema";
import * as Utils from "../Utils";
declare class Graph extends Utils.Event {
    editor: MMEditor;
    node: Node;
    line: Line;
    anchorLine: AnchorLine;
    linkStatus: string;
    data: MMEditorSchema;
    shadow: SVGSVGElement;
    constructor(editor: MMEditor);
    addBack(): void;
    listenEvents(): void;
    onKeyDown: (e: KeyboardEvent) => boolean;
    render(data: MMEditorSchema): Promise<void>;
    update(): void;
    initDefs(): void;
    /**
     * 清空画布
     */
    clearGraph(): void;
    destroy(): void;
}
export default Graph;
