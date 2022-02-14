export default MMEditor;
/**
 * @class
 * @extends Event
 */
export class MMEditor extends Event {
    /**
     * 初始化配置
     * @param {Object} config - 初始化配置.
     * @param {boolean} config.hideAchor - 是否隐藏磁吸.
     * @param {boolean} config.hideAchorLine - 是否隐藏磁吸线
     * @param {string} config.anchorDistance - 磁吸距离
     * @param {boolean} config.showBackGrid - 是否展示网格
     * @param {boolean} config.showMiniMap - 是否隐藏小地图
     * @param {string} config.mode - 模式是否只读，可选 view
     * @param {Object} config.dagreOption - dagre的配置
     */
    constructor(config: {
        hideAchor: boolean;
        hideAchorLine: boolean;
        anchorDistance: string;
        showBackGrid: boolean;
        showMiniMap: boolean;
        mode: string;
        dagreOption: any;
    });
    config: {
        hideAchor: boolean;
        hideAchorLine: boolean;
        anchorDistance: number;
        showBackGrid: boolean;
        showMiniMap: boolean;
        mode: any;
        dagreOption: {};
    } & {
        hideAchor: boolean;
        hideAchorLine: boolean;
        anchorDistance: string;
        showBackGrid: boolean;
        showMiniMap: boolean;
        mode: string;
        dagreOption: any;
    };
    /**
    * @property {HTMLElement} dom 容器
    */
    dom: any;
    /**
     * @property {Snap.Element} svg
     */
    svg: any;
    /**
     * @property {Snap.Element} paper
     */
    paper: any;
    /**
     * @property {HTMLElement} container 实例dom
     */
    container: any;
    /**
     * @property {Graph} graph 画布
     */
    graph: Graph;
    /**
    * @property {Controller} controller 控制器
    */
    controller: Controller;
    /**
     * @property {Schema} schema 数据管理器
     */
    schema: Schema;
    /**
     * @property {Minimap?} minimap 小地图
     */
    minimap: Minimap;
    initDom(dom: any): any;
    /**
     * 重新布局
     */
    resize(): void;
    /**
     * 销毁函数
     */
    destroy(): void;
    /**
     * 重绘
     */
    repaint(): void;
}
export namespace MMEditor {
    export { Event };
    export { Schema };
    export { Snap };
    export { Graph };
    export { Controller };
    export { Util };
}
import Event from "./Utils/Event";
import Schema from "./Model/Schema";
import Snap from "./Snap/snap.svg.js";
import Graph from "./Shape/Graph";
import Controller from "./Utils/Controller";
import { eve } from "./Snap/snap.svg.js";
import { mina } from "./Snap/snap.svg.js";
import Minimap from "./Plugins/Minimap";
import Util from "./Utils/util";
export { Event, Schema, Snap, Graph, Controller, eve, mina };
