import { Serial } from "../Serial";
import { Wheel } from "./Wheel";
import { Util } from "../Util";

export class DisabledSlice {

    private static readonly CLASS_NAME = "DisabledSlice";
    private static serial = new Serial();
    private element: HTMLElement;
    private id: number;

    private sliceIndex: number;
    private path: SVGPathElement;

    constructor(sliceIndex:number, parent:Node=Util.body) {
        
        this.id = DisabledSlice.serial.next();
        this.element = <HTMLElement><unknown> document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.element.id = DisabledSlice.CLASS_NAME +"-"+ this.id;
        this.element.classList.add(DisabledSlice.CLASS_NAME);
        parent.appendChild(this.element);

        this.sliceIndex = sliceIndex;

        this.path = <SVGPathElement> document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.element.appendChild(this.path);
        this.path.setAttribute("d", this.createWheelSlice());
        this.path.classList.add("svgButtonDisabled");

    }

    public destroy() {
        this.path.parentNode?.removeChild(this.path);
        this.element.parentNode?.removeChild(this.element);
    }

    // Create the funny pizza shape
    private createWheelSlice():string {

        let points = Util.createArcPoints(Wheel.WHEEL_CENTER, Wheel.WHEEL_INNER_RADIUS, 360/8, 360/8*this.sliceIndex, Wheel.WHEEL_INNER_SEGMENTS/8);
        points = points.concat( Util.createArcPoints(Wheel.WHEEL_CENTER, Wheel.WHEEL_OUTER_RADIUS, 360/8, 360/8*this.sliceIndex, Wheel.WHEEL_OUTER_SEGMENTS/8, true) );
        points.push(points[0]);
        return Util.linePath(points);
    
    }

}