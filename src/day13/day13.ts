import {Position} from "../utility/position";

export const isSpace = ( {x, y} : Pos, designer: number): boolean =>{
    let val = (x * x) + (3 * x) + (2 * x * y) + y + (y * y);
    val = val + designer;
    const binary = val.toString(2);
    const onesCount = binary.split("").countOf(it => it == "1");
    return onesCount % 2 == 0;
}

/**
 * Used to visually check isSpace looks good.
 */
export const displayGrid = (maxX: number, maxY: number, designer: number) => {
    for (let y = 0; y <= maxY; y++) {
        let line = "";
        for (let x = 0; x <= maxX; x++) {
            const char = isSpace({x, y}, designer) ? "." : "#";
            line = line + char
        }
        console.log(line);
    }
}

/**
 * Breadth first search with keeping a track of previous positions
 * Part 2 passes through the max steps with a wild to
 */
export const navigateTo= (to: Pos, designer: number, maxSteps? :number) : { steps: number; distinct: number } => {
    const previous = new Set<string>();

    let current = [Position.toString({x: 1, y: 1})];

    let navigated = false;
    let steps = 0;
    while (!navigated){
        current = current.flatMap( it => navigate(it, previous, designer) );
        current.forEach(it => previous.add(it))
        steps++;

        if (current.find(it => it == Position.toString(to))){
            navigated= true;
        } else if (maxSteps!= undefined && steps==maxSteps){ // part2
            navigated = true;
        }
    }
    return { steps, distinct: previous.size};
}

export const navigate = (pos: string, previous: Set<string>, designer: number): string[] =>{
    const result: string[] = [];
    const current = Position.fromString(pos);

    const up = Position.up(current);
    if (canMove(up, previous,designer )){
        result.push(Position.toString(up))
    }
    const down = Position.down(current);
    if (canMove(down, previous,designer )){
        result.push(Position.toString(down))
    }
    const left = Position.left(current);
    if (canMove(left, previous,designer )){
        result.push(Position.toString(left))
    }
    const right = Position.right(current);
    if (canMove(right, previous,designer )){
        result.push(Position.toString(right))
    }
    return result
}

export const canMove = (pos: Pos, previous: Set<string>, designer: number) => {
    if (pos.x< 0 || pos.y<0){
        return false;
    }
    if (previous.has(Position.toString(pos))){
        return false;
    }
    return isSpace(pos, designer);
}