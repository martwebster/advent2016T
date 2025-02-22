export {};

declare global {
    interface Array<T> {

        /**
         * Split the array into chunks
         * @param size the size of each chunk
         */
        chunk(size: number): Array<Array<T>>

        /**
         * Count the number of times a predicate is true
         */
        countOf(filter: (item: T) => boolean): number

        /**
         * Used when working with Maps, when you want each cell in the map to be an object other than a string
         */
        factory<T>(callback: (value: string, pos: Pos) => T): Array<Array<T>>

        /**
         * Return the first item in the array. Undefined return for empty arrays
         */
        first(): T | undefined

        /**
         * For basic arrays containing primitives, provide a grouping by count. For example,
         * if an array contains values 1,1,2,4,4
         * A map would be produced containing:
         * - 1 -> 2
         * - 2 -> 1
         * - 4 -> 2
         */
        groupByCount(): Map<T, number>

        /**
         * Return true if the object passed in, is in the array. This quite heavy so avoid using with large collections
         * @param item
         */
        includesObject(item: T): boolean

        /**
         * Determine the indices of all entries that match the item
         */
        indicesOf(item: T): number[]

        /**
         * Insert an item at the specified index.
         */
        insertAt(item: T, index: number): Array<T>

        /**
         * Return the last item in the array. Undefined returned for empty arrays
         */
        last(): T | undefined

        /**
         * Return the max value in the array. This assumes that the array contains numbers
         */
        max(): number

        /**
         * Return the maximum value of an object in array. The passed in function returns the numeric attribute
         */
        maxOf(attribute: (item: T) => number): number

        /**
         * Return the minimum value in the array. This assumes that the array contains numbers
         */
        min(): number

        /**
         * Return the minimum value of an object in array. The passed in function returns the numeric attribute
         */
        minOf(attribute: (item: T) => number): number

        /**
         * Remove an object from the specified index. A new array is returned
         * @param index
         */
        removeAtIndex(index: number): Array<T>

        /**
         * Remove any duplicates from the array. Returns a new array de-duped
         */
        removeDuplicates(): Array<T>

        /**
         * Generates an array of positions that pass the check in the called in function
         * @param callback
         */
        scan(callback: (item: T) => boolean): Array<Pos>

        /**
         *  Generates an array of positions, one for each row, column of a grid
         */
        scanAll(): Array<Pos>

        /**
         * Applies a default ascending sort on the array of numbers.
         * The sorted array is returned
         */
        sortAscending(): Array<T>

        /**
         * Applies a default descending sort on the array of numbers.
         * The sorted array is returned
         */
        sortDescending(): Array<T>

        /**
         * Split an array
         */
        split(item: T): Array<Array<T>>

        /**
         * Split the array multiple times
         */
        splitAll(item: T): Array<Array<T>>

        /**
         * Split the array using th indices of the ranges passed in
         * @param ranges for example [ [0,1], [4,5]] would return items at the indices in the ranges
         */
        splitAt(ranges: number[][]): Array<Array<T>>

        /**
         * Sum up all the elements in the array
         */
        sum(): number

        /**
         * Sum up the results of the function. This is generally used to map to a property in an object
         * @param attribute function passed through to extract a number to sum
         */
        sumOf(attribute: (item: T) => number): number

        /**
         * Swap Positions two elements in an array. This assumes a string[] or a two dimensional array
         */
        swapPositions(from: Pos, to: Pos): void

        /**
         * Converts a string[] into an array of numbers
         */
        toNumbers(): Array<number>
    }
}

Array.prototype.chunk = function (size: number): Array<Array<unknown>> {
    const result: Array<Array<unknown>> = [];
    for (let i = 0; i < this.length; i = i + size) {
        result.push(this.slice(i, i + size))
    }
    return result
}

Array.prototype.countOf = function (filter: (item: any) => boolean): number {
    return this.filter(filter).length;
}

Array.prototype.factory = function <T>(factory: (value: string, pos: Pos) => T): Array<Array<T>> {
    const all: T[][] = []
    for (let y = 0; y < this.length; y++) {
        const row = this[y];
        const rowData: T[] = []
        for (let x = 0; x < row.length; x++) {
            const pos = {
                x, y
            }
            rowData.push(factory(this[y][x], pos))
        }
        all.push(rowData)
    }
    return all
}

Array.prototype.first = function () {
    if (!this.length) {
        return undefined;
    }
    return this[0];
}

Array.prototype.groupByCount = function (): Map<any, number> {
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

Array.prototype.includesObject = function (obj: unknown) {
    return this.map(item => JSON.stringify(item)).includes(JSON.stringify(obj))
}

Array.prototype.indicesOf = function (item: any): number[] {
    const result: number[] = []
    let position = 0;
    let next = this.indexOf(item, position);
    while (next != -1) {
        result.push(next);
        position = next + 1;
        next = this.indexOf(item, position);
    }
    return result;
}

Array.prototype.insertAt = function (val: number, index: number): Array<unknown> {
    return [...this.slice(0, index), val, ...this.slice(index)]
}

Array.prototype.last = function () {
    if (!this.length) {
        return undefined;
    }
    return this[this.length - 1];
}

Array.prototype.max = function () {
    return Math.max(...this);
}

Array.prototype.maxOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).max();
}

Array.prototype.min = function () {
    return Math.min(...this);
}

Array.prototype.minOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).min();
}

Array.prototype.removeAtIndex = function (index: number) {
    return [...this.slice(0, index), ...this.slice(index + 1)]
}

Array.prototype.removeDuplicates = function (): Array<unknown> {
    // Move to array
    const set = new Set<any>();
    this.forEach(it => set.add(it));
    return Array.from(set)
}

Array.prototype.scan = function (callback: (item: any) => boolean): Array<Pos> {
    const positions: Pos[] = []
    for (let y = 0; y < this.length; y++) {
        if (typeof this[y] === 'string') {
            const element = this[y] as string;
            for (let x = 0; x < element.length; x++) {
                if (callback(element[x])) {
                    positions.push({
                        x,
                        y
                    })
                }
            }
        }
        if (this[y] instanceof Array) {
            const ar = this[y] as Array<unknown>
            for (let x = 0; x < ar.length; x++) {
                if (callback(ar[x])) {
                    positions.push({
                        x,
                        y
                    })
                }
            }
        }
    }
    return positions;
}

Array.prototype.scanAll = function () {
    const positions: Pos[] = []
    for (let y = 0; y < this.length; y++) {
        if (typeof this[y] === 'string') {
            const element = this[y] as string;
            for (let x = 0; x < element.length; x++) {
                positions.push({
                    x,
                    y
                })
            }
        } else if (Array.isArray(this[y])) {
            const element = this[y] as Array<any>;
            for (let x = 0; x < element.length; x++) {
                positions.push({
                    x,
                    y
                })
            }
        }
    }
    return positions;
}

Array.prototype.sortAscending = function () {
    return this.sort((a, b) => a - b)
};
Array.prototype.sortDescending = function () {
    return this.sort((a, b) => b - a)
};

Array.prototype.split = function (item: unknown): Array<Array<unknown>> {
    return [
        this.slice(0, this.indexOf(item)),
        this.slice(this.indexOf(item) + 1)
    ]
}

Array.prototype.splitAll = function (item: unknown): Array<Array<unknown>> {
    const results: string[][] = []
    let toChunk = [...this]
    while (toChunk.includes(item)) {
        const chunkBits = toChunk.split(item)
        toChunk = chunkBits[1];
        results.push(chunkBits[0])
    }
    results.push(toChunk)
    return results
}

Array.prototype.splitAt = function (ranges: number[][]): Array<Array<unknown>> {
    const results: any[][] = []
    for (const range of ranges) {
        const rangeBit: any[] = [];
        for (let x = range[0]; x <= range[1]; x++) {
            rangeBit.push(this[x])
        }
        results.push(rangeBit)
    }
    return results
}

Array.prototype.sum = function (): number {
    return this.reduce((sum, current) => sum + current, 0);
}

Array.prototype.sumOf = function (attribute: (item: unknown) => number): number {
    return this.map(attribute).sum();
};

Array.prototype.swapPositions = function (from: Pos, to: Pos): void {
    const temp = this[to.y][to.x]
    this[to.y][to.x] = this[from.y][from.x]
    this[from.y][from.x] = temp;
}

Array.prototype.toNumbers = function (): number[] {
    return this.map(it => Number(it));
}