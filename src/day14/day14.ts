import {Md5} from 'ts-md5'


export const generate = (salt: string, index: number): string => {
    return Md5.hashStr(salt + index.toString())
}

export const generateKeys = (salt: string, stretch: boolean = false): number => {
    const possibles = new Map<number, string>();
    const keys : number[] = []

    let complete = false;
    let index = 0;
    while (!complete) {
        let hash = generate(salt, index);
        if (stretch) {
            hash = stretchHash(hash);
        }
        // process any fives on this line
        const fives = getFives(hash)
        for (const five of fives) {
            const matchingTriplets = possibles
                .filter((possible) => possible[0] >= index - 1000 && possible[1].charAt(0) == five.charAt(0))
            for (const match of matchingTriplets.keys()) {
                possibles.delete(match)
                keys.push(match)
            }
        }
        if (keys.length >= 64) {
            complete = true
        } else {
            const triplet = searchForTriplet(hash)
            if (triplet) {
                possibles.set(index, triplet)
            }
            index++;
        }
    }
    return keys.sortAscending()[63]
}

export const searchForTriplet = (line: string) => {
    let prev = "";
    for (const char of line) {
        if (prev.length == 0) {
            prev = char;
        } else if (prev.includes(char)) {
            prev = prev + char;
        } else {
            prev = char;
        }
        if (prev.length == 3) {
            return prev;
        }
    }
}

export const getFives = (line: string): string[] => {
    const fives = new Set<string>();

    let prev = "";
    for (const char of line) {
        if (prev.length == 0) {
            prev = char;
        } else if (prev.includes(char)) {
            prev = prev + char;
        } else {
            prev = char;
        }

        if (prev.length == 5) {
            fives.add(prev);
            prev = "";
        }
    }
    return Array.from(fives);
}

export const stretchHash = (hash: string): string => {
    for (let i = 0; i < 2016; i++) {
        hash = Md5.hashStr(hash)
    }
    return hash;
}

