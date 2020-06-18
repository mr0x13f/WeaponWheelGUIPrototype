// Describes dist/wheel.json

export interface IWheelConfig {

    c: IWheelConfigButton|null;
    n: IWheelConfigButton|null;
    ne: IWheelConfigButton|null;
    e: IWheelConfigButton|null;
    se: IWheelConfigButton|null;
    s: IWheelConfigButton|null;
    sw: IWheelConfigButton|null;
    w: IWheelConfigButton|null;
    nw: IWheelConfigButton|null;

}

export interface IWheelConfigButton {

    name: string,
    icon: string,
    launch: string|null,
    wheel: IWheelConfig

}