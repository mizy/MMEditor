import { Event } from "../Utils";
import MMEditor from "../MMEditor";
interface IPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}
declare class BrushSelector extends Event {
    paper: SVGGElement;
    editor: MMEditor;
    svg: SVGSVGElement;
    container: SVGGElement;
    dom: SVGElement;
    startPos: {
        x: number;
        y: number;
        rect: DOMRect;
    };
    position: any;
    radius: any;
    constructor(editor: MMEditor);
    init(): void;
    listenEvents(): void;
    onMouseUp: () => void;
    onMouseMove: (e: MouseEvent) => void;
    toLoaclPos(position: IPosition): IPosition;
    calcOuputInner(): void;
    render(): void;
}
export default BrushSelector;
