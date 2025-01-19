export interface Cell{
    display : string
    pos : Pos
}

export const buildScreen = (screenWidth: number = 7, screenHeight: number = 3): Cell[] => {
    const screen : Cell[] = []

    for (let y = 0; y < screenHeight; y++) {
        for (let x = 0; x < screenWidth; x++) {
            screen.push( { display : '.', pos : {x,y} } )
        }
    }
    return screen;
}

export const displayScreen = (screen :Cell[], chunk?: number):void => {
    console.log("---Display Screen---")

    const screenHeight = screen.maxOf( it => it.pos.y)+1
    const screenWidth = screen.maxOf( it => it.pos.x)+1

    for (let y = 0; y < screenHeight; y++) {
        let row = "";
        for (let x = 0; x < screenWidth; x++) {
            row = row + screen.find(it => it.pos.x == x && it.pos.y == y)?.display!

            if (chunk && x%chunk==4){
                row = row+ "  "
            }
        }
        console.log(row)
    }
}

export const rect = (screen:Cell[], width: number, height: number) => {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            screen.find( it => it.pos.x == x && it.pos.y == y )!.display = "#"
        }
    }
}

export const rotateCol = (screen:Cell[], col: number, amount: number) => {
    const colCells = screen.filter( it => it.pos.x == col)
    colCells.forEach( cell =>{
        cell.pos.y = (cell.pos.y + amount) % colCells.length;
    })
}
export const rotateRow = (screen:Cell[], row: number, amount: number) => {
    const rowCells = screen.filter( it => it.pos.y == row)
    rowCells.forEach( cell =>{
        cell.pos.x = (cell.pos.x + amount) % rowCells.length;
    })
}

export const apply = (screen:Cell[], instruction: string) => {
    if (instruction.startsWith("rect ")) {
        rect(screen, Number(instruction.substringBetween(" ", "x")), Number(instruction.substringAfter("x")))
    } else if (instruction.startsWith("rotate row")) {
        rotateRow(screen, Number(instruction.substringBetween("y=", " by")), Number(instruction.substringAfter("by ")))
    } else if (instruction.startsWith("rotate column")) {
        rotateCol(screen, Number(instruction.substringBetween("x=", " by")), Number(instruction.substringAfter("by ")))
    } else{
        throw Error ("Unknown" + instruction)
    }
}


