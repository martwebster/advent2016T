import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { exampleFunction } from './dayx';

const dayNumber = "x"
describe(`day ${dayNumber}`, () => {
    test('sample', () => {
        expect(exampleFunction('1')).toBe(1);
    })

    test('part1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        const sum = data.map(line => exampleFunction(line)).sum();
        expect(sum).toBe(6);
    })
})