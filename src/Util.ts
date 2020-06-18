import { Vector2 } from "./Vector2";

declare var M:any // Materialize

export module Util {

    export let body:Node;

    export function init() {
        body = <Node> document.querySelector("body");
    }

    export function toast(message:string) {
        M.toast({html: message})
    }

    export function httpGetMainThread(url:string): string {
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        return request.responseText;
    }; 

    export function createArcPoints(center:Vector2, radius:number, angleDegrees:number, centerAngleDegrees:number, segments:number, invert:boolean=false):Vector2[] {
    
        let points:Vector2[] = [];
        let angleRad = angleDegrees / 180 * Math.PI;
        let centerAngleRad = centerAngleDegrees / 180 * Math.PI;
        let segmentAngle = angleRad / segments;
    
        for (let i=0; i<=segments; i++) {
            let angle;
            if (invert)
                angle = centerAngleRad + angleRad/2 - segmentAngle*i;
            else
                angle = centerAngleRad - angleRad/2 + segmentAngle*i;
    
            points.push( new Vector2(
                center.x + Math.sin(angle) * radius,
                center.y + -Math.cos(angle) * radius,
            ));
        }
    
        return points;
    
    }
    
    export function linePath(points:Vector2[]):string {
    
        let out = "";
        let first = true;
    
        for (let point of points) {
            if (first) {
                out += " M "+point.x+" "+point.y;
                first = false;
                continue;
            }
    
            out += " L "+point.x+" "+point.y;
        }
    
        return out;
    
    }


}