import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {
    displayOption,
    move,
    moveAll,
    moveUpAndDown,
    initialiseOption
} from "./day11";

describe('day 11 - part1', () => {
    test('sample', () => {
        const floors : string[][] = []
        floors.push(["HM", "LM"])
        floors.push(["HG"])
        floors.push(["LG"])
        floors.push([])


        const dictionary = ["HG","HM","LG","LM"]
        const optionString = initialiseOption(floors,dictionary);
        console.log("---1---");
        let options = moveUpAndDown(optionString, dictionary);
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---2---");
        options = moveUpAndDown(options[0], dictionary)
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---3---");
        options = moveUpAndDown(options[1], dictionary)
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---4---");
        options = move(options[6], false, dictionary)
        console.log("---4a---");
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---5---");
        options = moveUpAndDown(options[0], dictionary)
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---6---");
        options = moveUpAndDown(options[1], dictionary)
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---7---");
        options = moveUpAndDown(options[1], dictionary)
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---8---");
        options = moveUpAndDown(options[3], dictionary)
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---9---");
        options = moveUpAndDown(options[0], dictionary)
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---10---");
        options = moveUpAndDown(options[0], dictionary)
        options.forEach(it =>  displayOption(it, dictionary))

        console.log("---11---");
        options = moveUpAndDown(options[2], dictionary)
        options.forEach(it =>  displayOption(it, dictionary))

        expect(moveAll(floors)).toBe(11)
    })

    test('part1', () => {

        const floors : string[][] = [];
        floors.push(["TG", "TM","PLG", "SG"])
        floors.push(["PLM", "SM"])
        floors.push(["PRG", "PRM", "RG", "RM"])
        floors.push([])

        expect(moveAll(floors)).toBe(31)
    })

    test('part2', () => {

        const floors : string[][] = [];
        floors.push(["TG", "TM","PLG", "SG", "EG","EM","DG","DM"])
        floors.push(["PLM", "SM"])
        floors.push(["PRG", "PRM", "RG", "RM"])
        floors.push([])

        expect(moveAll(floors)).toBe(55)
    })
})