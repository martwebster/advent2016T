import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {reviseProgram, runProgram} from './day23';

const dayNumber = "23"
describe(`day ${dayNumber}`, () => {
    test('sample', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        expect (runProgram(data,0)).toBe(3)
    })

    test('part 1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        expect (runProgram(data,7)).toBe(11893)
    })

    test('part 2', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        //12! + 89*77
        const program = reviseProgram(data)
        expect (runProgram(program,12)).toBe(479008453)
    })
})