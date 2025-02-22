import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { findLowest} from './day25';

const dayNumber = "25"
describe(`day ${dayNumber}`, () => {

    test('part1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        const lowest = findLowest(data);
        expect(lowest).toBe(6);
    })
})