import { Serial } from "../Serial";
import { Vector2 } from "../Vector2";
import { WheelSliceButton } from "./WheelSliceButton";
import { WheelCenterButton } from "./WheelCenterButton";
import { Util } from "../Util";
import { IWheelConfig, IWheelConfigButton } from "./IWheelConfig";
import { DisabledSlice } from "./DisabledSlice";

export class Wheel {

    // Wheel constants
    public static readonly WHEEL_INNER_RADIUS = 120;
    public static readonly WHEEL_INNER_SEGMENTS = 64;
    public static readonly WHEEL_OUTER_RADIUS = 250;
    public static readonly WHEEL_OUTER_SEGMENTS = 128;
    public static readonly WHEEL_CENTER_RADIUS = 70;
    public static readonly WHEEL_ICON_SIZE = 50;
    public static readonly WHEEL_CENTER = new Vector2(Wheel.WHEEL_OUTER_RADIUS, Wheel.WHEEL_OUTER_RADIUS);

    private static readonly CLASS_NAME = "Wheel";
    private static serial = new Serial();
    private element: HTMLElement;
    private id: number;

    private config: IWheelConfig;
    public position: Vector2;

    private center:     WheelCenterButton|null = null;
    private north:      WheelSliceButton|DisabledSlice;
    private northEast:  WheelSliceButton|DisabledSlice;
    private east:       WheelSliceButton|DisabledSlice;
    private southEast:  WheelSliceButton|DisabledSlice;
    private south:      WheelSliceButton|DisabledSlice;
    private southWest:  WheelSliceButton|DisabledSlice;
    private west:       WheelSliceButton|DisabledSlice;
    private northWest:  WheelSliceButton|DisabledSlice;

    constructor(position:Vector2, config:IWheelConfig, parent:Node=Util.body) {

        this.id = Wheel.serial.next();
        this.element = <HTMLElement><unknown> document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.element.id = Wheel.CLASS_NAME +"-"+ this.id;
        this.element.classList.add(Wheel.CLASS_NAME);
        parent.appendChild(this.element);

        this.config = config;
        this.position = position;

        this.element.setAttribute("width", Wheel.WHEEL_OUTER_RADIUS * 2 +"px");
        this.element.setAttribute("height", Wheel.WHEEL_OUTER_RADIUS * 2 +"px");
        this.element.style['left'] = position.x +"px";
        this.element.style['top'] = position.y +"px";

        // Set all the buttons on this wheel
        // If necessary, set the back button on the wheels that the buttons lead to
        
        if (config.c)
            this.center = new WheelCenterButton( config.c, this, parent=this.element);
        
        if (config.n) {
            if (config.n.wheel && !config.n.wheel.s)
                config.n.wheel.s = this.backButton();
            this.north = new WheelSliceButton(0, config.n, this, this.element)
        } else
            this.north = new DisabledSlice(0, this.element);

        if (config.ne) {
            if (config.ne.wheel && !config.ne.wheel.sw)
                config.ne.wheel.sw = this.backButton();
            this.northEast = new WheelSliceButton(1, config.ne, this, this.element)
        } else
            this.northEast = new DisabledSlice(1, this.element);

        if (config.e) {
            if (config.e.wheel && !config.e.wheel.w)
                config.e.wheel.w = this.backButton();
            this.east = new WheelSliceButton(2, config.e, this, this.element)
        } else
            this.east = new DisabledSlice(2, this.element);

        if (config.se) {
            if (config.se.wheel && !config.se.wheel.nw)
                config.se.wheel.nw = this.backButton();
            this.southEast = new WheelSliceButton(3, config.se, this, this.element)
        } else
            this.southEast = new DisabledSlice(3, this.element);

        if (config.s) {
            if (config.s.wheel && !config.s.wheel.n)
                config.s.wheel.n = this.backButton();
            this.south = new WheelSliceButton(4, config.s, this, this.element)
        } else
            this.south = new DisabledSlice(4, this.element);

        if (config.sw) {
            if (config.sw.wheel && !config.sw.wheel.ne)
                config.sw.wheel.ne = this.backButton();
            this.southWest = new WheelSliceButton(5, config.sw, this, this.element)
        } else
            this.southWest = new DisabledSlice(5, this.element);

        if (config.w) {
            if (config.w.wheel && !config.w.wheel.e)
                config.w.wheel.e = this.backButton();
            this.west = new WheelSliceButton(6, config.w, this, this.element)
        } else
            this.west = new DisabledSlice(6, this.element);

        if (config.nw) {
            if (config.nw.wheel && !config.nw.wheel.se)
                config.nw.wheel.se = this.backButton();
            this.northWest = new WheelSliceButton(7, config.nw, this, this.element)
        } else
            this.northWest = new DisabledSlice(7, this.element);

    }

    public destroy() {

        this.center?.destroy();
        this.north?.destroy();
        this.northEast?.destroy();
        this.east?.destroy();
        this.southEast?.destroy();
        this.south?.destroy();
        this.southWest?.destroy();
        this.west?.destroy();
        this.northWest?.destroy();

        this.element.parentNode?.removeChild(this.element);

    }

    private backButton():IWheelConfigButton {
        return {
            name: "Back",
            icon: "",
            wheel: this.config,
            launch: null
        };
    }

}