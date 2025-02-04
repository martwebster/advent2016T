export interface Disc {
    positions: number;
    start: number;
}

export namespace Disc {
    export const from = (lines: string[]): Disc[] => {
        return lines.map((line: string) => ({
            positions: Number(line.substringBetween("has ", "positions")),
            start: Number(line.substringBetweenLast("position ", "."))
        }))
    }
}

const getPositionAtTime = (disc: Disc, time: number): number => {
    return (disc.start + time) % disc.positions
}

export const getPress = (discs: Disc[]): number | void => {
    let time = 0;
    while (true) {
        const aligned = discs.every((disc: Disc, index: number) => getPositionAtTime(disc, time + 1 + index) == 0)
        if (aligned) {
            return time;
        }
        time++
    }
}