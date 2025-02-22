import {Position} from "../utility/position";
import {repeat} from "../utility/extensions";

const canMove = (map: string[], pos: Pos, explored: Set<string>) =>
    map[pos.y][pos.x] != "#" ? !explored.has(Position.toString(pos)) : false;

const step = (map: string[], currentPos: string, explored: Set<string>): string[] => {
    return Position.adjacent(Position.fromString(currentPos), false)
        .filter(pos => canMove(map, pos, explored))
        .map(Position.toString)
};

export const calcDistances = (map: string[], digit: number): Map<number, number> => {
    const distances = new Map<number, number>();
    const startPos = map.scan(item => item == digit.toString())[0]
    const explored = new Set<string>()
    let current: string[] = [Position.toString(startPos)]
    let steps = 0
    while (current.length > 0) {
        current = current.flatMap(pos => step(map, pos, explored))

        steps++

        current = current.removeDuplicates()
        current.forEach(it => explored.add(it))

        current
            .map(it => Position.fromString(it))
            .filter(it => map[it.y][it.x].isDigit())
            .forEach(pos => distances.set(Number(map[pos.y][pos.x]), steps))

    }
    return distances.sort((a, b) => a[0] - b[0])
}

export interface Path {
    previous: string,
    steps: number,
}

const travel = (current: Path, targets: number[], distances: Map<number, number>[]) => {
    const currentNode = Number(current.previous.lastChar()!)
    return targets
        .filter(next => !current.previous.includes(next.toString()))
        .map(next => ({
                previous: current.previous + next.toString(),
                steps: current.steps + distances[currentNode].get(next)!,
            })
        )
};

const travelZero = (current: Path, distances: Map<number, number>[]): Path => {
    const currentNode = Number(current.previous.lastChar()!)
    return {
        previous: current.previous + "0",
        steps: current.steps + distances[currentNode].get(0)!,
    };
};

export const calcShortest = (targets: number[], distances: Map<number, number>[], returnZero: boolean = false): number => {
    let paths: Path[] = [{
        previous: "0",
        steps: 0,
    }]
    repeat(targets.length - 1, () => {
        paths = paths.flatMap(it => travel(it, targets, distances))
    })
    if (returnZero) {
        paths = paths.map(path => travelZero(path, distances))
    }
    return paths.sort((a, b) => a.steps - b.steps)[0].steps
};