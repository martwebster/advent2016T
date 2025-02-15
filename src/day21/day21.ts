// part 1
export const scramble = (instructions: string[], password: string ): string =>{
    for (const instruction of instructions) {
        password = performInstruction(instruction, password);
    }
    return password;
}

// part 2
export const unScramble = (instructions: string[], password: string ): string =>{
    const reversedInstructions = instructions.reverse();
    for (const instruction of reversedInstructions) {
        password = performInstruction(instruction, password, true);
    }
    return password;
}

export const performInstruction = (line: string, value: string, reverse: boolean = false): string => {
    if (line.startsWith("swap position")){
        const swapFrom = Number(line.substringBetween("position ", " with"));
        const swapTo = Number(line.substringAfterLast("position "));
        return value.swap(swapFrom, swapTo)
    }
    if (line.startsWith("swap letter")){
        const letterFrom = line.substringBetween("letter ", " with")!;
        const letterTo = line.substringAfterLast("letter ")!;
        return value.swapLetters(letterFrom, letterTo)
    }
    if (line.startsWith("reverse positions")){
        const reverseFrom = Number(line.substringBetween("positions ", " through"));
        const reverseTo = Number(line.substringAfterLast("through "));
        return value.reverseBetween(reverseFrom, reverseTo)
    }
    if (line.startsWith("rotate left")){
        const rotationLeft = Number(line.substringBetween("left ", " step"));
        if (reverse){
            return value.rotateRight(rotationLeft)
        }
        return value.rotateLeft(rotationLeft)
    }
    if (line.startsWith("rotate right")){
        const rotationRight = Number(line.substringBetween("right ", " step"));
        if (reverse){
            return value.rotateLeft(rotationRight)
        }
        return value.rotateRight(rotationRight)
    }
    if (line.startsWith("move position")){
        const from = Number(line.substringBetween("position ", " to"));
        const to = Number(line.substringAfterLast("position "));
        if (reverse){
            return value.moveChar(to, from)
        }
        return value.moveChar(from, to)
    }
    if (line.startsWith("rotate based on position")) {
        const letter = line.substringAfter("letter ")!;
        if (reverse){
            return rotateLeftBasedOnPosition(value, letter)
        }
        return rotateRightBasedOnPosition(value, letter)
    }
    throw Error ("Unexpected line: " + line)
}

export const rotateLeftBasedOnPosition = (value: string, letter: string): string =>{
    // bit of a hacky solution
    for (let i = 1; i <= value.length; i++) {
        var rotated = value.rotateLeft(i)
        if (rotateRightBasedOnPosition(rotated,letter) == value ) {
            return rotated;
        }
    }
    return value
}

export const rotateRightBasedOnPosition = (value: string, letter: string): string => {
    const index = value.indexOf(letter);
    let rotation = 1 + index;
    if (index >= 4){
        rotation++;
    }
    return value.rotateRight(rotation)
}


