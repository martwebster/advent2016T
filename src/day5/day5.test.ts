import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {getComplexPassword, getPassword} from './day5';

describe('day 5 - part1', () => {
    test('sample', () => {
        expect(getPassword('abc')).toBe("18f47a30");
    })

    test('part1', () => {
        expect(getPassword('ffykfhsq')).toBe("c6697b55");
    })
})
describe('day 5 - part2', () => {
    test('sample', () => {
        expect(getComplexPassword('abc')).toBe("05ace8e3");
    })

    test('part2', () => {
        expect(getComplexPassword('ffykfhsq')).toBe("8c35d1ab");
    })
})