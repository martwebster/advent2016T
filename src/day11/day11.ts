export interface Floor {
    contents: string[],
}

export interface Option {
    elevator: number,
    floors: Floor[]
}

export const isValid = (contents: string[]): boolean => {

    // generator on the same floor with a chip not powered
    const chips = contents.filter(it => it.endsWith("M")).map(it=> it.substring(0, it.length-1))
    const generators = contents.filter(it => it.endsWith("G")).map(it=> it.substring(0, it.length-1))

    const chipsNotPowered = chips.filter( chip => !generators.includes(chip));

    if (chipsNotPowered.length > 0 && generators.length>0){
        return false
    }
    return true;
}

export const moveUpAndDown = (option: Option): Option[] =>{
    return [ ...move(option, true ), ...move(option, false ) ]
}

export const removeDuplicates = <T>(items: T[]): T[] =>{
    const result : T[] = [];
    var objects: string[] = [];
    for (const item of items) {
        const obj = JSON.stringify(item)
        if (!objects.includes(obj)){
            objects.push(obj);
            result.push(item);
        }
    }
    return result
}

export const prune = (options: Option[]): Option[] => {
    return removeDuplicates(options);
}

const score = (option: Option): number =>{
    const score = option.floors.map( (item: Floor, index: number) => (index+1)*10 * (item.contents.length))
    return score.sum()
}

export const moveAll = (initial: Option, length: number): number =>{
    var options = [initial]
    var steps = 0;
    while (options.length > 0){
       options = options.flatMap( it => moveUpAndDown(it))
       options = prune(options)
       const scores = options.map(score)
       if (scores.length > 5000){
           const minScores = scores.min();
           const maxScores = scores.max();
           const cutOff = (maxScores - minScores)/2 + minScores;
           //const cutOff = maxScores-50;
           options = options.filter( it=> score(it)>= cutOff)
       }
       steps++;
       if (options.find( it=> it.floors[3].contents.length==length)){
           return steps;
       }

    }
    return -1
}

export const move = (option: Option, up: boolean): Option[]=> {
    const currentFloor = option.floors[option.elevator]

    var targetFloorIndex = option.elevator;
    targetFloorIndex = up? targetFloorIndex+1: targetFloorIndex-1;
    if (targetFloorIndex<0 || targetFloorIndex == option.floors.length){
        return []
    }
    const targetFloor = option.floors[targetFloorIndex]

    const result : Option[] = []

    for (let itemIndex = 0; itemIndex < currentFloor.contents.length; itemIndex++) {
        // second item
        for (let secondItemIndex = itemIndex; secondItemIndex < currentFloor.contents.length; secondItemIndex++) {
           // which could be itself
           const firstItem = currentFloor.contents[itemIndex]
           const secondItem = currentFloor.contents[secondItemIndex]

           var currentFloorContent = currentFloor.contents.removeAtIndex(secondItemIndex)
           var targetFloorContent = [...targetFloor.contents, secondItem];
           if (itemIndex !== secondItemIndex) {
               targetFloorContent = [...targetFloorContent, firstItem];
               currentFloorContent = currentFloorContent.removeAtIndex(itemIndex);
           }
           if (isValid(currentFloorContent) && isValid(targetFloorContent)) {
                const newOption = {
                    elevator: targetFloorIndex,
                    floors: option.floors.map((item) => ({
                        contents: [...item.contents]
                    })),
                }
                newOption.floors[option.elevator].contents = currentFloorContent.sortAscending();
                newOption.floors[targetFloorIndex].contents = targetFloorContent.sortAscending();
                result.push(newOption)
           }
        }
    }
    return result
}

export const displayOption = (option: Option) => {
    console.log("---")
    for (let i = option.floors.length-1; i > -1 ; i--) {
        var ele = i == option.elevator? "E": " ";
        console.log(`F${i} ${ele} : ${option.floors[i].contents.join(", ")} `);
    }
}


// F3 =
// F2 = PRG, PRM, RG, RM.
// F1 = PLM, SM
// F0 = TG, TM, PLG, SG

//---Step 1-----
// F3  =
// F2  = PRG, PRM, RG, RM.
// F1* = PLM, SM, TM
// F0  = TG,PLG, SG
