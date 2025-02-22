export const buildRegisters = (): Map<string, number> =>{
    const map = new Map<string, number>();
    map.set("a", 0)
    map.set("b", 0)
    map.set("c", 0)
    map.set("d", 0)

    return map;
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

export const runProgram = (program: string[], ignitionValue?:number): number =>{
    const registers = buildRegisters();

    // part 2
    if (ignitionValue != undefined) {
        registers.set("c",ignitionValue)
    }

    let pos = 0;
    while (pos < program.length){
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
        } else { //jmp
            const val = registers.get(parts[1]);
            if (val ==0){
                pos += 1;
            } else{
                pos += Number(parts[2]);
            }
        }
    }
    return registers.get("a")!
}
