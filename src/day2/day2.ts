import {Position} from "../utility/position";

export const moveSingle = (keyPad: string[], pos: Pos, instruction: string): Pos => {
    let next: Pos = pos;
    switch (instruction) {
        case 'L': next = Position.left(pos); break;
        case 'U': next = Position.up(pos); break;
        case 'D': next = Position.down(pos); break;
        case 'R': next = Position.right(pos); break;
    }
    if (next.x < 0 || next.y < 0 || next.y >= keyPad.length ||next.x >= keyPad[0].length) {
        return pos;
    }
    if (keyPad[next.y][next.x] == "."){
        return pos;
    }
    return next;
}

export const move = (keyPad: string[], instructions: string[]): string => {
    let currentPos = keyPad.scan(it => it=="5").first()!
    const result: string[] = [];
    for (const buttonInstructions of instructions) {
        for (const instruction of buttonInstructions) {
            currentPos = moveSingle(keyPad, currentPos, instruction);
        }
        result.push(keyPad[currentPos.y][currentPos.x]);
    }
    return result.join("");
}
