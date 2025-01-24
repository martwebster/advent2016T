export const decomp = (line: string): string => {
    const result : string[] = [];
    let currentPos = 0;
    while (currentPos < line.length){
        if (line.charAt(currentPos) === '(') {
            const endInstruction = line.indexOf(")", currentPos);
            const instruction = line.substring(currentPos + 1, endInstruction);

            const charCount = Number(instruction.substringBefore("x"))
            const rep = Number(instruction.substringAfter("x"))
            currentPos = endInstruction+1;

            const charsToRepeat = line.substring(currentPos, currentPos + charCount)
            result.push(charsToRepeat.repeat(rep))

            currentPos = currentPos + charCount
        } else{
            result.push(line.charAt(currentPos))
            currentPos += 1
        }
    }
    return result.join("")
}

// part 2
export const decompCount = (line: string): number => {
    let count = 0;
    let pos = 0;
    while (pos < line.length){
        if (line.charAt(pos) === '(') {
            const endInstruction = line.indexOf(")", pos);
            const instruction = line.substring(pos + 1, endInstruction);
            const charCount = Number(instruction.substringBefore("x"))
            const repeat = Number(instruction.substringAfter("x"))

            pos = endInstruction+1;
            const charsToRepeat = line.substring(pos, pos + charCount)
            count += decompCount(charsToRepeat) * repeat
            pos += charCount
        } else{
            count = count + 1
            pos += 1
        }
    }
    return count;
}