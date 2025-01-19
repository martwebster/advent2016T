function buildChars(data: string[]) {
    const allChars: string[][] = []
    for (let col = 0; col < data[0].length; col++) {
        const colChars: string[] = []
        for (let row = 0; row < data.length; row++) {
            colChars.push(data[row][col]);
        }
        allChars.push(colChars);
    }
    return allChars;
}

export const getMessage = (data: string[]): string => {
    const allChars = buildChars(data);

    return allChars.map( chars =>{
        const counts = chars.groupByCount();
        const sorted = counts.sort((a,b) => b[1] - a[1]);
        return Array.from(sorted.keys()).first()!
    }).join("")
}

export const getLastLikelyMessage = (data: string[]): string => {
    const allChars = buildChars(data);

    return allChars.map( chars =>{
        const counts = chars.groupByCount();
        const sorted = counts.sort((a,b) => a[1] - b[1]);
        return Array.from(sorted.keys()).first()!
    }).join("")
}


