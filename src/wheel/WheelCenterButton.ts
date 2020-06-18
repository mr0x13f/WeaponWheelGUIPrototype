import { Serial } from "../Serial";
import { Wheel } from "./Wheel";
import { Util } from "../Util";
import { WheelButtonIcon } from "./WheelButtonIcon";
import { Vector2 } from "../Vector2";
import { IWheelConfigButton } from "./IWheelConfig";

export class WheelCenterButton {

    private static readonly CLASS_NAME = "WheelCenterButton";
    private static serial = new Serial();
    private element: HTMLElement;
    private id: number;
    
    private config: IWheelConfigButton;
    private wheel: Wheel;
    private circle: SVGCircleElement;
    private buttonIcon: WheelButtonIcon;

    constructor(config:IWheelConfigButton, wheel:Wheel, parent:Node=Util.body) {
        
        this.id = WheelCenterButton.serial.next();
        this.element = <HTMLElement><unknown> document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.element.id = WheelCenterButton.CLASS_NAME +"-"+ this.id;
        this.element.classList.add(WheelCenterButton.CLASS_NAME);
        parent.appendChild(this.element);

        this.config = config;
        this.wheel = wheel;

        this.circle = <SVGCircleElement> document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.element.appendChild(this.circle);
        this.circle.setAttribute("cx", Wheel.WHEEL_OUTER_RADIUS +"px");
        this.circle.setAttribute("cy", Wheel.WHEEL_OUTER_RADIUS +"px");
        this.circle.setAttribute("r",  Wheel.WHEEL_CENTER_RADIUS +"px");
        this.circle.classList.add("svgButton");
        this.circle.addEventListener("mouseup", (event)=>{ this.onClick(event) })
        this.circle.addEventListener("mouseover", (event)=>{ this.onHover(event) })

        this.buttonIcon = new WheelButtonIcon(
            new Vector2( Wheel.WHEEL_OUTER_RADIUS, Wheel.WHEEL_OUTER_RADIUS ),
            this.config.icon,
            this.config.name,
            parent=this.element
        );

    }

    private onClick(event:MouseEvent) {
        
        if (this.config.launch)
            Util.toast(this.config.launch);
    }

    private onHover(event:MouseEvent) {

    }

    public destroy() {
        this.buttonIcon.destroy();
        this.circle.parentNode?.removeChild(this.circle);
        this.element.parentNode?.removeChild(this.element);
    }

}