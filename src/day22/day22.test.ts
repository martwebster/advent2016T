import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {displayNodes, FileNode, getViablePairs} from './day22';

const dayNumber = "22"
describe(`day ${dayNumber}`, () => {
    test('part1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        const nodes = FileNode.from(data)
        expect (nodes[0].pos).toStrictEqual({x: 0, y: 0})
        expect (nodes[0].size).toBe(92)
        expect (nodes[0].used).toBe(73)
        expect (nodes[0].avail).toBe(19)
        expect (nodes[0].use).toBe(79)
        expect (getViablePairs(nodes)).toBe(1020)
    })

    test('part2', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        const nodes = FileNode.from(data)
        console.log(nodes.filter( it => it.used!= 0).minOf( it => it.used))
        console.log(nodes.filter( it => it.used!= 0).maxOf( it => it.avail))

        // just need to spacer to top right.
        const spacePos = nodes.find( it => it.used == 0)?.pos!
        // then
        console.log(spacePos)
        // max x is 29
        // so need to move spacer to x=28, y=0
        const movesSoFar = 25 + 4 + 28
        // to get to 0,0
        // 5 for each step to move once.
        const moves = movesSoFar + (5*28) +1
        //195 is too low
        expect (moves).toBe(198)
    })

    test('part2 sample', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        const nodes = FileNode.from(data)
        displayNodes(nodes)
        console.log(nodes.filter( it => it.used!= 0).minOf( it => it.used))
        console.log(nodes.filter( it => it.used!= 0).maxOf( it => it.avail))

        // just need to spacer to top right.
        const spacePos = nodes.find( it => it.used == 0)?.pos!
        // then
        console.log(spacePos)
        // max x is 29
        // so need to move spacer to x=28, y=0
        const movesSoFar = 1
        // to get to 0,0
        // 5 for each step to move once.
        const moves = movesSoFar + (5*1) +1
        //190 is too low
        expect (moves).toBe(7)
    })

})