import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { exampleFunction } from './dayx';

describe('day X - part1', () => {
    test('sample', () => {
        expect(exampleFunction('1')).toBe(1);
    })

    test('part1', () => {
        const data = readTestData('./src/dayx/part1.txt');
        const sum = data.map(line => exampleFunction(line)).sum();
        expect(sum).toBe(6);
    })
})