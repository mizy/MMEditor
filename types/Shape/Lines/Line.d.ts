import Graph from "../Graph";
import { InstanceLine } from "../Line";
import { AnyMap } from "../../Utils/types";
import { MMEditorLine } from "../../Model/Schema";
import MMEditor from "../../MMEditor";
export interface LineRender extends AnyMap {
    graph?: Graph;
    adsorb?: [number, number];
    render?: (instanceLine: InstanceLine) => SVGElement;
    renderArrow?: (instanceLine: InstanceLine) => SVGElement;
    renderArrow2?: (instanceLine: InstanceLine) => SVGElement;
    renderLabel?: (instanceLine?: InstanceLine) => SVGElement;
    checkNewLine?: (lineData: MMEditorLine, editor: MMEditor) => boolean;
}
export interface LabelInstance {
    text: SVGTextElement;
    textRect: SVGRectElement;
    textBBox?: DOMRect;
    oldText?: string;
    labelGroup: SVGGElement;
}
export type Direction = "left" | "right" | "top" | "bottom";
declare const DefaultLine: LineRender;
export default DefaultLine;
