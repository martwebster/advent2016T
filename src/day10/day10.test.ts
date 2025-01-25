import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {applyValues, Bot, Value} from './day10';

describe('day X - part1', () => {
    test('sample', () => {
        const data = readTestData('./src/day10/sample1.txt');
        const values = Value.fromData(data)
        expect(values.length).toBe(3);
        const bots = Bot.fromData(data)
        expect(bots.length).toBe(3);
        const output = applyValues(bots, values);
        expect(output).toStrictEqual( [5,2,3])
    })

    test('part1&2', () => {
        const data = readTestData('./src/day10/input.txt');
        const values = Value.fromData(data)
        const bots = Bot.fromData(data)
        const output = applyValues(bots, values);
        const bot = bots.find( it => it.values.includes(17) && it.values.includes(61))

        // part 1
        expect(bot!.id).toBe(161)

        // part 2
        const val = output[0] * output[1] * output[2];
        expect (val).toBe(133163)
    })
})