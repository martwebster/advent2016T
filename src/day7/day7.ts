const isAbba = (line: string, i: number) : boolean=> {
    return line.charAt(i)!== line.charAt(i+1) &&
        line.charAt(i) === line.charAt(i+3) &&
        line.charAt(i+1)=== line.charAt(i+2)
}



export const supportsTLS = (line: string): boolean => {

    let insideBrackets = 0;
    let supports = false;
    for (let index = 0; index <line.length-3; index++) {
        if (line.charAt(index) === '[') {
            insideBrackets = insideBrackets+1
        } else if (line.charAt(index) === ']') {
            insideBrackets = insideBrackets-1
        } else{
            const abba = isAbba(line, index)
            if (insideBrackets>0 && abba) {
                return false;
            }
            if (abba) {
                supports = true;
            }
        }
    }
    return supports;
}

// part 2
const isAba = (line: string, i: number) : boolean=> {
    const word = line.charAt(i) + line.charAt(i+1)+ line.charAt(i+2);
    if (word.includes("[") || word.includes("]")) {
        return false;
    }
    return line.charAt(i)!== line.charAt(i+1) &&
        line.charAt(i) === line.charAt(i+2)
}

export const supportSsl = (line: string): boolean => {
    var hypernetSequences = line.substringAllBetween("[", "]");

    var insideBrackets = 0
    var supports = false
    for (let i = 0; i <line.length-2; i++) {
        if (line.charAt(i) === '[') {
            insideBrackets = insideBrackets+1
        } else if (line.charAt(i) === ']') {
            insideBrackets = insideBrackets-1
        } else{
            const aba = isAba(line, i)
            if (insideBrackets==0 && aba) {
                const bab = line.charAt(i+1) + line.charAt(i) + line.charAt(i+1)
                const isBabFound = hypernetSequences.some( it=> it.includes(bab))
                if (isBabFound) {
                    supports = true
                }
            }
        }
    }
    return supports;
}
