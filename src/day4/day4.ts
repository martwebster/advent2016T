export const isRoom = (line: string): boolean => {
    const name = line.substringBeforeLast("-")!
    const checkSum = line.substringBetween("[","]")

    const letters = name.split("").filter(it => it !== "-")
    const count = letters.groupByCount();
    const sorted = count.sort((a, b) => {
        const diff = b[1]- a[1]
        if (diff == 0){
            return (a[0] as String).charCodeAt(0) - (b[0] as String).charCodeAt(0)
        }
        return diff;
    });
    const sortedKeys = Array.from(sorted.keys());
    const sortString = sortedKeys.join("");

    let prev = -1
    for (let i = 0; i < checkSum!.length; i++) {
        const current = sortString.indexOf(checkSum!.charAt(i))!
        if (current== -1 || current < prev) {
            return false;
        }
        prev = current;
    }
    return true;
}
// part 1
export const sumSectorIds = (data: string[]): number =>{
    return data
        .filter( line => isRoom(line))
        .sumOf( it => Number(it.substringBetweenLast("-", "[")))
}

// part 2
export const decryptLetter = (letter: string, times: number): string => {
    const start = letter.toUpperCase().charCodeAt(0) - 65;
    const end =  (start + times) % 26
    const endChar = 65 + end
    return String.fromCharCode(endChar);
}

export const decrypt = (line: string): string =>{
    const name = line.substringBeforeLast("-")!
    const sector = Number(line.substringBetweenLast("-", "[")!)

    return name
        .split("")
        .map( letter => letter == "-" ? " " : decryptLetter(letter, sector))
        .join("")
}