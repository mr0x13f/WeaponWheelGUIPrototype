import { Serial } from "../Serial";
import { Wheel } from "./Wheel";
import { Util } from "../Util";
import { Vector2 } from "../Vector2";
import { WheelButtonIcon } from "./WheelButtonIcon";
import { setWheel } from "../main";
import { IWheelConfigButton } from "./IWheelConfig";

export class WheelSliceButton {

    private static readonly CLASS_NAME = "WheelSliceButton";
    private static serial = new Serial();
    private element: HTMLElement;
    private id: number;

    private wheel: Wheel;
    private sliceIndex: number;
    private centerPoint: Vector2;
    private path: SVGPathElement;
    private buttonIcon: WheelButtonIcon;
    private config:IWheelConfigButton

    constructor(sliceIndex:number, config:IWheelConfigButton, wheel:Wheel, parent:Node=Util.body) {
        
        this.id = WheelSliceButton.serial.next();
        this.element = <HTMLElement><unknown> document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.element.id = WheelSliceButton.CLASS_NAME +"-"+ this.id;
        this.element.classList.add(WheelSliceButton.CLASS_NAME);
        parent.appendChild(this.element);

        this.config = config;
        this.wheel = wheel;
        this.sliceIndex = sliceIndex;
        this.centerPoint = this.getCenterPoint();

        this.path = <SVGPathElement> document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.element.appendChild(this.path);
        this.path.setAttribute("d", this.createWheelSlice());
        this.path.addEventListener("mouseover", (event)=>{ this.onHover(event) })
        this.path.addEventListener("mouseup", (event)=>{ this.onClick(event) });
        this.path.classList.add("svgButton");

        this.buttonIcon = new WheelButtonIcon(
            Wheel.WHEEL_CENTER.add(this.centerPoint),
            config.icon,
            config.name + ( config.wheel ? "..." : "" ),
            parent=this.element
        );

    }

    private onClick(event:MouseEvent) {

        if (this.config.launch)
            Util.toast(this.config.launch);
    }

    private onHover(event:MouseEvent) {

        if (this.config.wheel)
            setWheel( new Wheel( this.wheel.position.add(this.centerPoint), this.config.wheel ));
    }

    public destroy() {
        this.buttonIcon.destroy();
        this.path.parentNode?.removeChild(this.path);
        this.element.parentNode?.removeChild(this.element);
    }

    private getCenterPoint():Vector2 {

        let radius = (Wheel.WHEEL_OUTER_RADIUS - Wheel.WHEEL_INNER_RADIUS)/2 + Wheel.WHEEL_INNER_RADIUS;
        let angleDeg = 360/8 * this.sliceIndex;
        let angleRad = angleDeg / 180 * Math.PI;

        return new Vector2(
            Math.sin(angleRad) * radius,
            -Math.cos(angleRad) * radius,
        );
    }

    private createWheelSlice():string {

        let points = Util.createArcPoints(Wheel.WHEEL_CENTER, Wheel.WHEEL_INNER_RADIUS, 360/8, 360/8*this.sliceIndex, Wheel.WHEEL_INNER_SEGMENTS/8);
        points = points.concat( Util.createArcPoints(Wheel.WHEEL_CENTER, Wheel.WHEEL_OUTER_RADIUS, 360/8, 360/8*this.sliceIndex, Wheel.WHEEL_OUTER_SEGMENTS/8, true) );
        points.push(points[0]);
        return Util.linePath(points);
    
    }

}