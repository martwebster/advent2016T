import {repeat} from "../utility/extensions";

export const isTrap = (left: boolean, centre: boolean, right:boolean) =>{
    if (left && centre && !right){
        return true;
    }
    if (centre && right && !left){
        return true;
    }
    if (left && !centre && !right){
        return true;
    }
    return !left && !centre && right;

}

export const genNextRow = (row: string): string =>{
    let result = ""
    for (let i = 0; i < row.length; i++){
        const left = i <0 ? false: row.charAt(i-1)=="^"
        const centre = row.charAt(i)=="^"
        const right = i == row.length-1 ? false: row.charAt(i+1)=="^"

        if (isTrap(left, centre, right)){
            result = result + "^"
        } else{
            result = result + "."
        }
    }
    return result;
}

export const genRows = (initial: string, count: number): string[] =>{
    const result: string[] = [initial];
    let current = initial;
    repeat(count-1, ()=>{
        current = genNextRow(current)
        result.push(current);
    } )
    return result;
}

export const countSafeTiles = (initial: string, count: number): number =>{
    const rows = genRows(initial, count);
    return rows.sumOf( row => row.split("").countOf( it=> it =="."))
}