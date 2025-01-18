export const isTriangle = (dims: number[]): boolean => {
    const options = [[0, 1, 2], [0, 2, 1], [1, 2, 0]];
    const result = options.find (it =>
        dims[it[0]] + dims[it[1]] <= dims[it[2]])
    return result == undefined;
}

export const countTriangles = (data: string[]): number =>{
    return data.countOf( it=> isTriangle(it.toNumbers(" ")))
}

export const countVertTriangles = (data: string[]): number =>{
    const rows = data.chunk(3)
    const triangles :number[][] = [];
    for (const row of rows){
        const row1 = row[0].toNumbers();
        const row2 = row[1].toNumbers();
        const row3 = row[2].toNumbers();
        triangles.push([row1[0], row2[0], row3[0]])
        triangles.push([row1[1], row2[1], row3[1]])
        triangles.push([row1[2], row2[2], row3[2]])
    }
    return triangles.countOf( it=> isTriangle(it))
}