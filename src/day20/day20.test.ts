import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {exampleFunction, FirewallRule, generateGaps, getMin, merge} from './day20';

const dayNumber = "20"
describe(`day ${dayNumber}`, () => {
    test('sample', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        const rules = FirewallRule.from(data);
        expect(getMin(rules)).toBe(3);
    })

    test('part1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        const rules = FirewallRule.from(data);
        // 1 min 41 sec
        expect(getMin(rules)).toBe(19449262);
    })

    // part 2 - 0 - 4294967295

    test('merge', () => {
        expect(merge( [{ min:1, max: 6}, {min: 3, max: 8}])).toStrictEqual([{ min: 1, max:8}]);
        expect(merge( [{ min:5, max: 8}, {min: 3, max: 6}])).toStrictEqual([{ min: 3, max:8}]);
        expect(merge( [{ min:1, max: 8}, {min: 3, max: 6}])).toStrictEqual([{ min: 1, max:8}]);

        expect(merge( [{ min:1, max: 6}, {min: 3, max: 8}].reverse())).toStrictEqual([{ min: 1, max:8}]);
        expect(merge( [{ min:5, max: 8}, {min: 3, max: 6}].reverse())).toStrictEqual([{ min: 3, max:8}]);
        expect(merge( [{ min:1, max: 8}, {min: 3, max: 6}].reverse())).toStrictEqual([{ min: 1, max:8}]);

        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        const rules = FirewallRule.from(data);
        console.log(merge(rules))
    })

    test('part 2', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        let rules = FirewallRule.from(data);
        rules = merge(merge(merge(rules)))
        expect(generateGaps(4294967295, rules)).toBe(119)
    })

})