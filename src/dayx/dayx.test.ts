import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { exampleFunction } from './dayx';

describe('day x', () => {
    test('sample', () => {
        expect(exampleFunction('1')).toBe(1);
    })

    test('part1', () => {
        const data = readTestData('./src/day10/input.txt');
        const sum = data.map(line => exampleFunction(line)).sum();
        expect(sum).toBe(6);
    })
})