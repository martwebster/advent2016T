import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {decomp, decompCount} from './day9';

describe('day 9 - part1', () => {
    test('sample', () => {
        expect(decomp('ADVENT')).toBe("ADVENT");
        expect(decomp('A(1x5)BC')).toBe("ABBBBBC")
        expect(decomp('(3x3)XYZ')).toBe("XYZXYZXYZ")
        expect(decomp('A(2x2)BCD(2x2)EFG')).toBe('ABCBCDEFEFG')
        expect(decomp('(6x1)(1x3)A')).toBe('(1x3)A')
        expect(decomp('X(8x2)(3x3)ABCY')).toBe('X(3x3)ABC(3x3)ABCY')
    })

    test('part1', () => {
        const data = readTestData('./src/day9/input.txt');
        const decompression = decomp(data[0])

        expect(decompression.length).toBe(102239);
    })

    test('sample 2', () => {
        expect(decompCount('(3x3)XYZ')).toBe(9);
        expect(decompCount('X(8x2)(3x3)ABCY')).toBe(20)
        expect(decompCount('(27x12)(20x12)(13x14)(7x10)(1x12)A')).toBe(241920)
        expect(decompCount('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN')).toBe(445)
    })

    test('part2', () => {
        const data = readTestData('./src/day9/input.txt');
        const decompression = decompCount(data[0])

        expect(decompression).toBe(10780403063);
    })
})