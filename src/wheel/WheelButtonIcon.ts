import { Serial } from "../Serial";
import { Util } from "../Util";
import { Wheel } from "./Wheel";
import { Vector2 } from "../Vector2";

export class WheelButtonIcon {

    private static readonly CLASS_NAME = "WheelButtonIcon";
    private static serial = new Serial();
    private element: HTMLElement;
    private id: number;

    private image:SVGImageElement;
    private text:SVGTextElement;

    constructor(position:Vector2, imageUrl:string, text:string, parent:Node=Util.body) {
        
        this.id = WheelButtonIcon.serial.next();
        this.element = <HTMLElement><unknown> document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.element.id = WheelButtonIcon.CLASS_NAME +"-"+ this.id;
        this.element.classList.add(WheelButtonIcon.CLASS_NAME);
        parent.appendChild(this.element);

        this.image = <SVGImageElement> document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.image.setAttribute("href", imageUrl);
        this.image.setAttribute("width", Wheel.WHEEL_ICON_SIZE +"px");
        this.image.setAttribute("height", Wheel.WHEEL_ICON_SIZE +"px");
        this.image.setAttribute("x", position.x - Wheel.WHEEL_ICON_SIZE/2 +"px");
        this.image.setAttribute("y", position.y - Wheel.WHEEL_ICON_SIZE/2 +"px");
        this.element.appendChild(this.image);

        this.text = <SVGTextElement> document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.text.setAttribute("x", position.x - Wheel.WHEEL_ICON_SIZE/2 + Wheel.WHEEL_ICON_SIZE / 2 +"px");
        this.text.setAttribute("y", position.y - Wheel.WHEEL_ICON_SIZE/2 + Wheel.WHEEL_ICON_SIZE +"px");
        this.text.setAttribute("text-anchor", "middle");
        this.text.setAttribute("alignment-baseline", "hanging");
        this.text.innerHTML = text;
        this.element.appendChild(this.text);

    }

    public destroy() {
        this.image.parentNode?.removeChild(this.image);
        this.text.parentNode?.removeChild(this.text);
        this.element.parentNode?.removeChild(this.element);
    }

}