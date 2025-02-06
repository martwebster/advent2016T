import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {checkSum, dragonCurve, fillToLength} from './day16';

describe('day 16', () => {

    test('sample', () => {
        expect(dragonCurve("1")).toBe("100")
        expect(dragonCurve("0")).toBe("001")
        expect(dragonCurve("11111")).toBe("11111000000")
        expect(dragonCurve("111100001010")).toBe("1111000010100101011110000")

        expect (fillToLength("10000",20)).toBe("10000011110010000111")
        expect (checkSum("10000011110010000111")).toBe("01100")
    })

    test('part1', () => {
        const data = fillToLength("10011111011011001",272)
        expect (checkSum(data)).toBe("10111110010110110")
    })

    test('part2', () => {
        // 25 sseconds to run
        const data = fillToLength("10011111011011001",35651584)
        expect (checkSum(data)).toBe("01101100001100100")
    })
})