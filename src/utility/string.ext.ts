export {};

declare global {
    interface String {
        // Functions related to substring
        substringAfter(value: string): string|undefined
        substringBefore(value: string): string|undefined;
        substringBetween(first: string, second: string): string|undefined;
        substringAfterLast(value: string): string|undefined;
        substringBeforeLast(value: string): string|undefined;
        substringBetweenLast(first: string, second: string): string|undefined;
        substringAllBetween(first: string, second: string): string[];

        isDigit(): boolean;
        /**
         * Convert string into a number array
         * @param delim defaults to " "
         */
        toNumbers(delim?: string): number[];
        lastChar(): string|undefined;
        chunk(size: number): string[];
        reverse(): string;
        /**
         * Determine the indices of all items
         */
        indicesOf(item: string): number[]
        splitAt(ranges: number[][]): Array<string>
        setCharAt(index: number, char: string): string
    }
}


// String
String.prototype.substringAfter = function (val: string) {
    if (this.indexOf(val) === -1) {
        return undefined
    }
    return this.substring(this.indexOf(val) + val.length)
};
String.prototype.substringBefore = function (val: string) {
    if (this.indexOf(val) === -1) {
        return undefined
    }
    return this.substring(0, this.indexOf(val))
};
String.prototype.substringBetween = function (val1: string, val2: string) {
    return this.substringBefore(val2)?.substringAfter(val1)
};
String.prototype.substringAfterLast = function (val: string) {
    if (this.indexOf(val) === -1) {
        return undefined
    }
    return this.substring(this.lastIndexOf(val) + val.length)
};
String.prototype.substringBeforeLast = function (val: string) {
    if (this.indexOf(val) === -1) {
        return undefined
    }
    return this.substring(0, this.lastIndexOf(val))
};
String.prototype.substringBetweenLast = function (val1: string, val2: string) {
    return this.substringBeforeLast(val2)?.substringAfterLast(val1)
};
String.prototype.isDigit = function () {
    return "0123456789".includes(this.charAt(0))
};
String.prototype.toNumbers = function (delim: string = " ") {
    return this.split(delim)
        .filter(it => it.length > 0)
        .map(it => Number(it));
}
String.prototype.lastChar = function () {
    if (this.length==0){
        return undefined
    }
    return this.charAt(this.length-1)
}

String.prototype.chunk = function (size: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < this.length; i = i+size) {
        result.push( this.substring(i, i+size))
    }
    return result
}
String.prototype.reverse = function (): string {
    return this.split("").reverse().join("")
}

/**
 * Determine the indices of all items
 */
String.prototype.indicesOf = function (item: string): number[] {
    const result : number[] = []
    let position = 0;
    let next = this.indexOf(item, position);
    while (next!= -1){
        result.push(next);
        position = next +1;
        next = this.indexOf(item, position);
    }
    return result;
}

String.prototype.splitAt = function (ranges: number[][]): Array<string>{
    const results: string[] = []
    for (const range of ranges){
        results.push(this.substring(range[0], range[1]+1))
    }
    return results
}

String.prototype.setCharAt = function (index: number, char: string): string{
    if (index >= this.length){
        return this.toString();
    }
    return this.substring(0, index) + char + this.substring(index + 1)
}

String.prototype.substringAllBetween = function (first: string, second: string): string[]{
    const result : string[] = [];
    let between = false;
    var current = "";
    for (let i = 0; i < this.length; i++) {
        if ( this.substring(i).startsWith(first)){
            between = true
            i = i+first.length-1
            current = ""
        } else if ( this.substring(i).startsWith(second)){
            between = false;
            result.push(current)
            i = i+second.length-1
        } else{
            if (between){
                current = current + this.charAt(i)
            }
        }
    }
    return result
}