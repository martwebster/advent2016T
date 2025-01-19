
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {getLastLikelyMessage, getMessage} from './day6';

describe('day 6 - part1', () => {
    test('sample', () => {
        const data = readTestData('./src/day6/sample.txt');
        expect(getMessage(data)).toBe('easter');
    })
    test('part 1', () => {
        const data = readTestData('./src/day6/input.txt');
        expect(getMessage(data)).toBe('usccerug');
    })
})

describe('day 6 - part2', () => {
    test('sample', () => {
        const data = readTestData('./src/day6/sample.txt');
        expect(getLastLikelyMessage(data)).toBe('advent');
    })
    test('part 2', () => {
        const data = readTestData('./src/day6/input.txt');
        expect(getLastLikelyMessage(data)).toBe('cnvvtafc');
    })
})