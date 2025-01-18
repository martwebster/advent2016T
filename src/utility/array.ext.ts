export {};

declare global {
    interface Array<T> {
        /**
         * Return the last item in the array. Undefined returned for empty arrays
         */
        last(): T | undefined
        /**
         * Return the first item in the array. Undefined return for empty arrays
         */
        first(): T | undefined
        /**
         * Sum up all the elements in the array
         */
        sum(): number
        /**
         * Sum up the results of the function. This is generally used to map to a property in an object
         * @param attribute function passed through to extract a number to sum
         */
        sumOf(attribute: (item: T) => number): number
        min(): number
        minOf(attribute: (item: T) => number): number
        max(): number
        maxOf(attribute: (item: T) => number): number
        /**
         * Count the number of times a predicate is true
         */
        countOf(filter: (item: T) => boolean): number
        includesObject(obj: unknown): boolean
        sortAscending(): Array<T>
        sortDescending(): Array<T>
        removeAtIndex(index: number): Array<T>
        /**
         *  Generates an array of positions, one for each row, column of a grid
         */
        scanAll(): Array<Pos>

        scan( callback: ( item: any) => boolean ): Array<Pos>
        /**
         * Split an array
         */
        split(item: T): Array<Array<T>>

        /**
         * Split the array multiple times
         */
        splitAll(item: T): Array<Array<T>>

        /**
         * Determine the indices of all items
         */
        indicesOf(item: T): number[]
        /**
         * Swap two elements in an array
         */
        swap( from: Pos, to:Pos): void

        /**
         * For basic arrays, provide a grouping by count. For example,
         * if an array contains values 1,1,2,4,4
         * A map would be produced containing:
         * - 1 -> 2
         * - 2 -> 1
         * - 4 -> 2
         */
        groupByCount() : Map<any, number>

        factory2D<T>(callback:(value: string, pos: Pos) => T ): Array<Array<T>>

        toNumbers() : Array<number>

        insertAt(val: number, index:number): Array<T>

        splitAt(ranges: number[][]): Array<Array<T>>
    }
}

Array.prototype.last = function () {
    if (!this.length) {
        return undefined;
    }
    return this[this.length - 1];
};
Array.prototype.first = function () {
    if (!this.length) {
        return undefined;
    }
    return this[0];
};
Array.prototype.sum = function () {
    return this.reduce((sum, current) => sum + current, 0);
};
Array.prototype.sumOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).sum();
};

Array.prototype.min = function () {
    return Math.min(...this);
};
Array.prototype.minOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).min();
};
Array.prototype.max = function () {
    return Math.max(...this);
};
Array.prototype.maxOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).max();
};

Array.prototype.maxOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).max();
};
Array.prototype.includesObject = function (obj: unknown) {
    return this.map(item => JSON.stringify(item)).includes(JSON.stringify(obj))
};
Array.prototype.sortAscending = function () {
    return this.sort((a, b) => a - b)
};
Array.prototype.sortDescending = function () {
    return this.sort((a, b) => b - a)
};
Array.prototype.removeAtIndex = function (index: number) {
    return [...this.slice(0, index), ...this.slice(index + 1)]
}
Array.prototype.scanAll = function() {
    const positions : Pos[] = []
    for (let y = 0; y < this.length; y++) {
        if (typeof this[y] === 'string'){
            const element = this[y] as string;
            for (let x = 0; x < element.length; x++) {
                positions.push( {
                    x,
                    y 
                })   
            }
        } else if (Array.isArray(this[y])){
            const element = this[y] as Array<any>;
            for (let x = 0; x < element.length; x++) {
                positions.push( {
                    x,
                    y
                })
            }
        }
    }
    return positions;
}
Array.prototype.scan = function( callback: ( item: any) => boolean ): Array<Pos>{
    const positions : Pos[] = []
    for (let y = 0; y < this.length; y++) {
        if (typeof this[y] === 'string'){
            const element = this[y] as string;
            for (let x = 0; x < element.length; x++) {
                if (callback(element[x])){
                    positions.push( {
                        x,
                        y 
                    })   
                }   
            }
        }
        if (this[y] instanceof Array){
            const ar = this[y] as Array<unknown>
            for (let x = 0; x < ar.length; x++) {
                if (callback(ar[x])){
                    positions.push( {
                        x,
                        y 
                    })   
                }
            }
        }
    }
    return positions;
}

Array.prototype.split = function(item: unknown): Array<Array<unknown>>{
    return [
        this.slice(0, this.indexOf(item)),
        this.slice(this.indexOf(item)+1)
    ]
}

Array.prototype.splitAll = function(item: unknown): Array<Array<unknown>>{
    const results: string[][] = []
    let toChunk = [...this]
    while (toChunk.includes(item)){
        const chunkBits = toChunk.split(item)
        toChunk = chunkBits[1];
        results.push(chunkBits[0])
    }
    results.push(toChunk)
    return results
}

/**
 * Count the number of times a predicate is true
 */
Array.prototype.countOf = function (filter: (item: any) => boolean): number {
    return this.filter(filter).length;
}

Array.prototype.swap = function (from: Pos, to: Pos ) : void {
    const temp = this[to.y][to.x]
    this[to.y][to.x] = this[from.y][from.x]
    this[from.y][from.x] = temp;
}

Array.prototype.groupByCount = function () : Map<any, number> {
    const groups = new Map<any, number>()
    for (const val of this) {
        const current = groups.get(val)
        if (current == undefined) {
            groups.set(val, 1)
        } else {
            groups.set(val, current + 1)
        }
    }
    return groups.sort((a, b) => a[0] - b[0])
}

Array.prototype.factory2D = function<T>(factory:(value: string, pos: Pos) => T ): Array<Array<T>>{
    const all: T[][] = []
    for (let y = 0; y < this.length; y++) {
        const row = this[y];
        const rowData: T[] = []
        for (let x = 0; x < row.length; x++) {
            const pos = {
                x, y
            }
            rowData.push( factory(this[y][x], pos))
        }
        all.push(rowData)
    }
    return all
}

Array.prototype.toNumbers = function (): number[]{
    return this.map (it => Number(it));
}


Array.prototype.insertAt = function (val: number, index:number): Array<unknown>{
    return [...this.slice(0, index), val, ...this.slice(index)]
}

/**
 * Determine the indices of all items
 */
Array.prototype.indicesOf = function (item: any): number[] {
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

Array.prototype.splitAt = function (ranges: number[][]): Array<Array<unknown>>{
    const results: any[][] = []
    for (const range of ranges){
        const rangeBit : any[] = [];
        for (let x = range[0]; x <= range[1]; x++) {
            rangeBit.push(this[x])
        }
        results.push(rangeBit)
    }
    return results
}