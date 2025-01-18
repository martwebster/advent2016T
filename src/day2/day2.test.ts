import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {move} from './day2';

describe('day 2 - part1', () => {
    const keyPad = ["123","456", "789"]
    test('sample', () => {
        const instrctions = [
            "ULL",
            "RRDDD",
            "LURDL",
            "UUUUD"
        ]
        expect(move(keyPad, instrctions)).toBe("1985");
    })

    test('part1', () => {
        const data = readTestData('./src/day2/input.txt');
        const keyPad = ["123","456", "789"]
        expect(move(keyPad, data)).toBe("53255");
    })
})

describe('day 2 - part2', () => {
    const keyPad = ["..1..",".234.", "56789", ".ABC.","..D.."]
    test('sample', () => {
        const instrctions = [
            "ULL",
            "RRDDD",
            "LURDL",
            "UUUUD"
        ]
        expect(move(keyPad, instrctions)).toBe("5DB3");
    })

    test('part1', () => {
        const data = readTestData('./src/day2/input.txt');
        expect(move(keyPad, data)).toBe("7423A");
    })
})