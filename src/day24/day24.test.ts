import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {calcDistances, calcShortest} from './day24';

const dayNumber = "24"

describe(`day ${dayNumber}`, () => {
    test('sample', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);

        const targets = data.scan( (it: string) => it.isDigit()).map(it => Number(data[it.y][it.x])).sortAscending();

        const distances = targets.map( it=> calcDistances (data, it))
        expect(distances[0].get(4)).toBe(2)

        expect( calcShortest(targets, distances)).toBe(14)
    })

    test('part1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        const targets = data.scan( (it: string) => it.isDigit()).map(it => Number(data[it.y][it.x])).sortAscending();

        const distances = targets.map( it=> calcDistances (data, it))
        expect( calcShortest(targets, distances)).toBe(464)

    })

    test('part2', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        const targets = data.scan( (it: string) => it.isDigit()).map(it => Number(data[it.y][it.x])).sortAscending();

        const distances = targets.map( it=> calcDistances (data, it))
        expect( calcShortest(targets, distances, true)).toBe(652)
    })
})