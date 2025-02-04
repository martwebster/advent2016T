import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {Disc, getPress} from './day15';

describe('day 15', () => {
    test('sample', () => {
        const data = readTestData('./src/day15/sample.txt');
        const discs = Disc.from(data);
        expect(discs.length).toBe(2);
        expect(getPress(discs)).toBe(5);
    })

    test('part1', () => {
        const data = readTestData('./src/day15/input.txt');
        const discs = Disc.from(data);
        expect(discs.length).toBe(6);
        expect(getPress(discs)).toBe(16824);
    })

    test('part2', () => {
        const data = readTestData('./src/day15/input.txt');
        const discs = Disc.from(data);
        const newDiscs = [...discs, {
            positions: 11,
            start: 0
        }]
        expect(newDiscs.length).toBe(7);
        expect(getPress(newDiscs)).toBe(3543984);
    })
})