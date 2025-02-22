import {n} from "vitest/dist/reporters-yx5ZTtEV";

export const buildRegisters = (): Map<string, number> =>{
    const map = new Map<string, number>();
    map.set("a", 0)
    map.set("b", 0)
    map.set("c", 0)
    map.set("d", 0)

    return map;
}

export const getValue = (registers: Map<string, number>, item: string) => {
    let val = registers.get(item);
    if (val== undefined){
        val = Number(item)
    }
    return val;
}

export const increment = (registers: Map<string, number>, item: string) => {
    const val = registers.get(item);
    if (val == undefined) {
        throw new Error(`increment ${item}`);
    }
    registers.set(item, val!+1);
}
export const decrement = (registers: Map<string, number>, item: string) => {
    const val = registers.get(item);
    if (val == undefined) {
        throw new Error(`decrement ${item}`);
    }
    registers.set(item, val!-1);
}
export const copy = (registers: Map<string, number>, itemSource: string, itemDestination: string) => {
    const val = registers.get(itemSource);
    if (val == undefined) {
        registers.set(itemDestination, Number(itemSource));
    } else{
        registers.set(itemDestination, val);
    }
}

export const toggle = (line: string): string =>{
    const parts = line.split(" ");
    if (parts.length==2){
        if (parts[0]=="inc"){
            return "dec " + parts[1]
        }
        return "inc " + parts[1]
    }
    if (parts[0]=="jnz"){
        return "cpy " + parts[1] +" "+ parts[2]
    }
    return "jnz " + parts[1] +" "+ parts[2]
}



const jump = (registers: Map<string, number>, part1: string, part2: string, pos: number) => {
    const part1Value = getValue(registers, part1);
    if (part1Value==0){
        return pos + 1;
    }
    const part2Value = getValue(registers, part2);
    return pos + part2Value;
};

export const runProgram = (program: string[], a: number): number =>{
    const registers = buildRegisters();
    registers.set("a", a)

    let pos = 0;
    let steps =0
    let output = "";
    while (pos < program.length){
        steps++;
        const parts = program[pos].split(" ");
        if (parts[0] == "cpy"){
            copy(registers, parts[1], parts[2]);
            pos += 1;
        } else if (parts[0] == "dec"){
            decrement(registers, parts[1]);
            pos += 1;
        } else if (parts[0] == "inc"){
            increment(registers, parts[1]);
            pos += 1;
        } else if (parts[0] == "tgl"){
            var newPos = pos + registers.get(parts[1])!;
            if (newPos >-1 && newPos <= program.length-1){
                program[newPos] = toggle(program[newPos])
            }
            pos += 1;
        } else if (parts[0] == "mult"){
            const val1 = getValue(registers, parts[1]);
            const val2 = getValue(registers, parts[2]);
            const total = registers.get("a")!+ val1*val2;
            registers.set("a", total);
            pos += 1;
        } else if  (parts[0] == "out"){
            const outReg = getValue(registers, parts[1]);
            if (outReg != 0 && outReg!= 1){
                return -1;
            }
            if (output.length>0){
                if (output.lastChar()==outReg.toString()){
                    console.log(a, output+outReg)
                    return -1
                }
            }
            output = output + outReg;
            console.log(a,output, "01".repeat(10));
            if ("01".repeat(10) == output){
                return 0;
            }
            pos += 1;
        }
        else {
            pos = jump(registers, parts[1], parts[2], pos);
        }
        //console.log(`${parts}: a=${registers.get("a")}, b=${registers.get("b")}, c=${registers.get("c")}, d=${registers.get("d")}`);

    }
    return registers.get("a")!
}

// replace with mult c d (multiplies c * d) adding result to a

// or
// inc a
// inc d
// jnz d -2
// inc c
// jnz c -5

export const reviseProgram = (program: string[]): string[] =>{
    let pos = 0;
    const pat = [
        "inc a",
        "inc d",
        "jnz d -2",
        "inc c",
        "jnz c -5"
    ]
    const pat2 = [
        "cpy b c",
        "inc a",
        "dec c",
        "jnz c -2",
        "dec d",
        "jnz d -5"
    ]
    const newProgram = [];
    while (pos < program.length){
        if (program[pos]==pat[0] && program[pos+1]==pat[1] && program[pos+2]==pat[2] && program[pos+3]==pat[3] && program[pos+4]==pat[4]) {
            newProgram.push("mult c d")
            pos = pos + 5
        } else if (program[pos]==pat2[0] && program[pos+1]==pat2[1] && program[pos+2]==pat2[2] && program[pos+3]==pat2[3] && program[pos+4]==pat2[4] && program[pos+5] == pat2[5]){
            newProgram.push("mult b d")
            pos = pos + 6
        } else{
            newProgram.push(program[pos])
            pos++;
        }
    }
    return newProgram
}
