import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {countBlocksAway, getFirstLocationTwice} from './day1';

describe('day 1 - part1', () => {
    test('sample', () => {
        expect(countBlocksAway('R2, L3')).toBe(5);
        expect(countBlocksAway('R2, R2, R2')).toBe(2);
        expect(countBlocksAway('R5, L5, R5, R3')).toBe(12);

    })

    test('part1', () => {
        const data = readTestData('./src/day1/input.txt');
        expect(countBlocksAway(data[0])).toBe(287);
    })

    test('Part 2 - sample', () => {
        expect(getFirstLocationTwice('R8, R4, R4, R8')).toBe(4);
    })

    test('part2', () => {
        const data = readTestData('./src/day1/input.txt');
        expect(getFirstLocationTwice(data[0])).toBe(133);
    })
})