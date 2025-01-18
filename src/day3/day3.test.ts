import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {countTriangles, countVertTriangles, isTriangle} from './day3';

describe('day 3 - part1', () => {
    test('sample', () => {
        expect(isTriangle([5,10,25])).toBe(false);
        expect(isTriangle([8,10,12])).toBe(true);
    })

    test('part1', () => {
        const data = readTestData('./src/day3/input.txt');
        expect (countTriangles(data)).toBe(983)
    })

    test('part2', () => {
        const data = readTestData('./src/day3/input.txt');
        expect (countVertTriangles(data)).toBe(1836)
    })
})