
export const getWinnerToLeft = (size: number) :number => {
    let presents = "1".repeat(size);
    let pos = 0;
    while (presents.split('').countOf(it => it == "1") >1){
        if (presents.charAt(pos)=="1"){
            let others = presents.indicesOf("1");
            // any greater need to come first
            const greater = others.filter(it => it > pos);
            const less = others.filter(it => it <= pos);
            others = [...greater, ...less]
            const next = others.first()!;
            if (next != pos){
                presents = presents.setCharAt(next, "0")
            }
        }
        pos = pos + 1;
        if (pos >= presents.length){
            pos = 0
        }
    }
    return presents.indexOf("1")+1;
}

export const calcWinner = (size: number) :number =>{
    let power = 0;
    while (Math.pow(2,power)<= size){
        power++;
    }
    const baseline = size - Math.pow(2, power - 1);
    return (baseline *2)+1
}

export const opp = (target: number): number =>{
    let largest = 1
    let result = 1
    for (let current = 1; current <= target; current++) {
        if (result + 2 > current){
            largest = result
            result = 1
        }
        else if (result < largest){
            result += 1
        } else{
            result += 2
        }
    }
    return result
}