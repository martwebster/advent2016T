
/*
 This uses a breadth first search, with a heavy pruning algorithm. This function is bloated to make pruning easy, with output for manual pruning
 */
export const moveAll = (floors: string[][]): number | undefined => {
    let lastPruneTime = Date.now();

    const dictionary = buildDictionary(floors)
    let options = [ initialiseOption(floors,dictionary) ];
    let steps = 0;
    let previous: string[] = [];
    while (options.length > 0) {
        options = options.flatMap(it => moveUpAndDown(it, dictionary))
        options = Array.from(new Set(options)) // removes duplicates
        options = options.filter(it => !previous.includes(it))
        previous.push(...options)

        if (options.length > 5000) {
            let cutoff = calculateCutOff(steps);
            // stats before pruning
            const max3 = options.maxOf(it => it.split("").countOf(it => it == "3"))
            const min3 = options.minOf(it => it.split("").countOf(it => it == "3"))

            const beforeOpts = options.length;
            options = options.filter(it => it.split("").countOf(it => it == "3") > cutoff)
            const afterOpts = options.length;

            const beforePrev = previous.length
            previous = previous.filter(it => it.split("").countOf(it => it == "3") > cutoff)
            const afterPrev = previous.length

            const diffFromLastPrune = Date.now() - lastPruneTime;
            console.log(`Prune at ${steps}: ${beforeOpts} -> ${afterOpts} : ${beforePrev} -> ${afterPrev} (${diffFromLastPrune}) : 3s - ${min3} - ${max3} : cutoff =${cutoff}`)
            lastPruneTime = Date.now()
        }
        steps++;
        if (options.find(it => it.substring(1).split("").countOf(it=> it=="3")==dictionary.length)) {
            return steps;
        }
    }
    return undefined
}

export const buildDictionary = (floors: string[][]): string[] => {
    const items = new Set<string>();
    for (const item of floors) {
        item.forEach(it => items.add(it))
    }
    return Array.from(items).sort((a, b) => a.localeCompare(b))
}


export const initialiseOption = (floors: string[][], dictionary: string[]): string => {
    let result = "0";
    for (const item of dictionary) {
        if (floors[0].includes(item)) {
            result = result + 0
        } else if (floors[1].includes(item)) {
            result = result + 1
        } else if (floors[2].includes(item)) {
            result = result + 2
        } else if (floors[3].includes(item)) {
            result = result + 3
        }
    }
    return result
}

const calculateCutOff = (steps: number) => {
    let cutoff = 4;

    if (steps > 44) {
        cutoff = 10
    } else if (steps > 41) {
        cutoff = 9
    } else if (steps > 34) {
        cutoff = 8
    } else if (steps > 25) {
        cutoff = 7
    }
    return cutoff;
}

export const moveUpAndDown = (option: string, dictionary: string[]): string[] => {
    return [...move(option, true, dictionary), ...move(option, false, dictionary)]
}

export const move = (option: string, up: boolean, dictionary: string[]): string[] => {
    let currentFloor = option.charAt(0)
    let targetFloorIndex = Number(currentFloor);
    targetFloorIndex = up ? targetFloorIndex + 1 : targetFloorIndex - 1;
    if (targetFloorIndex < 0 || targetFloorIndex == 4) {
        return []
    }

    const result: string[] = []

    const currentFloorIndexes = option.substring(1).indicesOf(currentFloor);

    // select upto 2 items to move. It could select the same item twice, which effectively means that a single item is being moved
    for (let itemIndex = 0; itemIndex < currentFloorIndexes.length; itemIndex++) {
        for (let secondItemIndex = itemIndex; secondItemIndex < currentFloorIndexes.length; secondItemIndex++) {
            let newOption = option.setCharAt(0, targetFloorIndex + "");

            newOption = newOption.setCharAt(currentFloorIndexes[itemIndex] + 1, targetFloorIndex + "")
            newOption = newOption.setCharAt(currentFloorIndexes[secondItemIndex] + 1, targetFloorIndex + "")

            if (isValidOption(newOption, dictionary)) {
                result.push(newOption)
            }
        }
    }
    return result
}

export const isValidOption = (option: string, dictionary: string[]): boolean => {
    return  getItemsByFloor(option, dictionary).every(isValidFloor)
}

export const isValidFloor = (contents: string[]): boolean => {
    const generators = contents.
    filter(it => it.endsWith("G")).
    map(it => it.substring(0, it.length - 1))

    const chipsNotPowered = contents.
    filter(it => it.endsWith("M")).
    map(it => it.substring(0, it.length - 1)).
    filter(chip => !generators.includes(chip));

    return !(chipsNotPowered.length > 0 && generators.length > 0);
}

export const getItemsByFloor = (option: string, dictionary: string[]): string[][] => {
    const itemsFloors = option.substring(1)
    const result: string[][] = [[], [], [], []]
    for (let index = 0; index < dictionary.length; index++) {
        const item = dictionary[index];
        const floorItem = Number(itemsFloors.charAt(index))
        result[floorItem].push(item)
    }
    return result;
}

export const displayOption = (option: string, dictionary: string[]) => {
    const floors = getItemsByFloor(option, dictionary)
    const currentFloor = Number(option.charAt(0))
    console.log("---")
    for (let floor = floors.length - 1; floor > -1; floor--) {
        const elevator = floor == currentFloor ? "E" : " ";
        console.log(`F${floor} ${elevator} : ${floors[floor].join(", ")} `);
    }
}