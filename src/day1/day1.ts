import {Dir} from "../utility/direction";
import {Position} from "../utility/position";

const changeDirection = (leftOrRight: string, direction: Dir): Dir => {
    if (leftOrRight === "L") {
        return Dir.turnAntiClockwise(direction)
    }
    return Dir.turnClockwise(direction)
}

export const countBlocksAway = (line: string): number => {
    const instructions = line.split(", ");

    let direction = Dir.North;
    let pos = Position.Zero;

    for (const instruction of instructions) {
        direction = changeDirection(instruction[0], direction)
        pos = Dir.moveForward(pos, direction, Number(instruction.substring(1)))
    }
    return Math.abs(pos.x) + Math.abs(pos.y)
}

export const getFirstLocationTwice = (line: string): number => {
    const instructions = line.split(", ");

    let direction = Dir.North;
    let pos = Position.Zero;
    const trail : Pos[] = [pos]
    for (const instruction of instructions) {
        direction = changeDirection(instruction[0], direction)

        const distance = Number(instruction.substring(1))
        for (let _ = 0; _ < distance; _++) {
            pos = Dir.moveForward(pos, direction)
            if (trail.includesObject(pos)){
                return Math.abs(pos.x) + Math.abs(pos.y);
            }
            trail.push(pos)
        }
    }
    return -1;
}
