export {};

declare global {
    interface Number {
        between(min: number, max: number): boolean;
    }
}

Number.prototype.between = function (min: number, max: number): boolean {
    return this.valueOf() >= min && this.valueOf() <= max;
};