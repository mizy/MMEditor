import History from "./History";
import MMEditor from "../MMEditor";
import { AnyMap, Position } from "../Utils/types";
export interface MMEditorNode extends AnyMap {
    uuid?: string;
    type: string;
    x?: number;
    y?: number;
    name?: string;
    data?: AnyMap;
    iconPath?: string;
    style?: AnyMap;
    className?: string;
    linkPointsTypes?: Position[];
}
export type MMEditorLine = {
    type?: string;
    uuid?: string;
    from: string;
    to: string;
    fromPoint?: number;
    toPoint?: number;
    fromX?: number;
    fromY?: number;
    toX?: number;
    toY?: number;
    name?: string;
    data?: AnyMap;
    label?: string;
    className?: string;
    graphIndex?: number;
    labelCfg?: {
        refX?: number;
        refY?: number;
        autoRotate?: boolean;
        showNum?: number;
        style?: AnyMap;
    };
} & AnyMap;
export interface MMEditorData {
    nodes: MMEditorNode[];
    lines: MMEditorLine[];
}
export interface MMEditorSchema {
    nodesMap: Record<string, MMEditorNode>;
    linesMap: Record<string, MMEditorLine>;
}
declare class Schema {
    data: MMEditorSchema;
    editor: MMEditor;
    history: History;
    /**
     *
     * @param {MMEditor} editor - MMEditor实例
     */
    constructor(editor: MMEditor);
    /**
     * format data with dagre
     */
    format(): void;
    listenEvents(): void;
    /**
     * 历史入栈最新数据
     */
    pushHistory(): void;
    /**
     * 历史出栈
     */
    popHistory(): void;
    /**
     * 获取当前最新的map
     * TODO: 数据引用有点混乱，应该去除掉nodesMap和linesMap，改为实时获取
     */
    makeNowDataMap(): MMEditorSchema;
    setData(data: MMEditorData): Promise<void>;
    setInitData(data: MMEditorData): Promise<void>;
    parseData({ nodes, lines }: MMEditorData): void;
    /**
     * 渲染数据
     */
    renderData(): Promise<void>;
    /**
     * 重做
     */
    redo(): Promise<void>;
    /**
     * 撤销
     */
    undo(): Promise<void>;
    /**
     * 获取数据
     */
    getData(): {
        nodes: MMEditorNode[];
        lines: MMEditorLine[];
    };
}
export default Schema;
