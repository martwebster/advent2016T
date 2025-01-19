import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {supportSsl, supportsTLS} from './day7';

describe('day 7 - part1', () => {
    test('sample', () => {
        expect(supportsTLS('abba[mnop]qrst')).toBe(true);
        expect(supportsTLS('abcd[bddb]xyyx')).toBe(false);
        expect(supportsTLS('aaaa[qwer]tyui')).toBe(false);
        expect(supportsTLS('ioxxoj[asdfgh]zxcvbn')).toBe(true);
    })

    test('part 1', () => {
        const data = readTestData('./src/day7/input.txt');
        const count = data.countOf( it => supportsTLS(it))
        expect(count).toBe(115);
    })
})

describe('day 7 - part2', () => {
    test('sample', () => {
        expect(supportSsl('aba[bab]xyz')).toBe(true);
        expect(supportSsl('xyx[xyx]xyx')).toBe(false);
        expect(supportSsl('aaa[kek]eke')).toBe(true);
        expect(supportSsl('zazbz[bzb]cdb')).toBe(true);
    })

    test('part 2', () => {
        const data = readTestData('./src/day7/input.txt');
        const count = data.countOf( it => supportSsl(it))
        expect(count).toBe(231);
    })
})