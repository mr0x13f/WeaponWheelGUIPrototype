// Used to generate unique IDs

export class Serial {

    private serial = 0;

    public next() {
        this.serial++;
        return this.serial;
    }

}