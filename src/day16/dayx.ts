export const dragonCurve = (a: string): string => {
    const b = a.reverse().split("").map(it => it == "1" ? "0" : "1").join("")
    return a + "0" + b
}

export const fillToLength = (a: string, length: number): string => {
    let line = a;
    while (line.length < length) {
        line = dragonCurve(line);
    }
    return line.substring(0, length);
}

const check = (line: string): string => {
    return line.chunk(2)
        .map(it => {
            if (it.charAt(0) == it.charAt(1)) {
                return "1"
            }
            return "0"
        })
        .join("")
}

export const checkSum = (line: string): string => {
    let checkSum = check(line);
    while (checkSum.length % 2 == 0) {
        checkSum = check(checkSum)
    }
    return checkSum
}