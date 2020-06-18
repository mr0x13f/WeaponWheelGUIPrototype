export class Vector2 {

    constructor(
        public x:number=0,
        public y:number=x,
    ) {}

    public add(vec:Vector2):Vector2 {
        return new Vector2(
            this.x + vec.x,
            this.y + vec.y,
        );
    }

}
