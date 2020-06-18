import { Vector2 } from "./Vector2";
import { Wheel } from "./wheel/Wheel";
import { Util } from "./Util";
import { IWheelConfig } from "./wheel/IWheelConfig";

window.onload = main;

let currentWheel:Wheel;
let config: IWheelConfig;

function main() {

    Util.init();

    config = JSON.parse( Util.httpGetMainThread("wheel.json") );

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

}

function onMouseDown(event:MouseEvent) {
    // Open the wheel at current mouse position
    setWheel(new Wheel(new Vector2(event.clientX, event.clientY), config));
}

function onMouseUp(event:MouseEvent) {
    setWheel(null); // Close the wheel
    event.preventDefault(); // Prevent mouse4/5 from changing the page
}

export function setWheel(wheel:Wheel|null) {

    if (currentWheel)
        currentWheel.destroy();

    if (wheel)
        currentWheel = wheel;

}