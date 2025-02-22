import {runProgram} from "../day23/day23";

export const findLowest = (program: string[]): number =>{
    const maxAttempts = 1000;
    for (let i = 1; i <= maxAttempts; i++){
        const result = runProgram(program,i)
        if ( result==0){
            return i;
        }
    }
    return 2;
}