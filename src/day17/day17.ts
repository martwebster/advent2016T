import {Md5} from "ts-md5";
import {Position} from "../utility/position";

export const getPosition = (path: string): Pos => {
    return {
        x: path.split("")
            .filter(it => it == "L" || it == "R")
            .sumOf(it => it == "L" ? -1 : 1),
        y: path.split("")
            .filter(it => it == "U" || it == "D")
            .sumOf(it => it == "U" ? -1 : 1),
    }
}

export const hashDecode = (str: string): { up: boolean; down: boolean; left: boolean; right: boolean } => {
    const hash = Md5.hashStr(str).split("")
    const validValues = "bcdef"
    return {
        up: validValues.includes(hash[0]),
        down: validValues.includes(hash[1]),
        left: validValues.includes(hash[2]),
        right: validValues.includes(hash[3]),
    }
}

export const isInGrid = (pos: Pos): boolean => {
    return pos.x.between(0, 3) && pos.y.between(0, 3)
}

export const move = (passcode: string, path: string): string[] => {
    const result: string[] = []
    const openDoors = hashDecode(passcode + path);
    const currentPos = getPosition(path)

    if (isInGrid(Position.up(currentPos)) && openDoors.up) {
        result.push(path + "U")
    }
    if (isInGrid(Position.down(currentPos)) && openDoors.down) {
        result.push(path + "D")
    }
    if (isInGrid(Position.left(currentPos)) && openDoors.left) {
        result.push(path + "L")
    }
    if (isInGrid(Position.right(currentPos)) && openDoors.right) {
        result.push(path + "R")
    }
    return result
}

export const getShortestPath = (passcode: string): string | undefined => {
    let paths = [""];
    while (paths.length > 0) {
        paths = paths.flatMap(path => move(passcode, path))
        if (paths.find(it => Position.toString(getPosition(it)) == "3:3")) {
            return paths.find(it => Position.toString(getPosition(it)) == "3:3")!
        }
    }
    return undefined
}

export const getLongestPath = (passcode: string): number => {
    let steps = 0;
    let paths = [""];
    let longest = 0;

    while (paths.length > 0) {
        paths = paths.flatMap(path => move(passcode, path))
        steps += 1;
        const pathsAtEnd = paths.filter(it => Position.toString(getPosition(it)) == "3:3")
        if (pathsAtEnd.length > 0) {
            longest = steps;
        }
        paths = paths.filter(it => !pathsAtEnd.includes(it))
    }
    return longest
}
