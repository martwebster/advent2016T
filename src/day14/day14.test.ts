import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {generateHash, generateKeys, searchForTriplet} from './day14';

describe('day 14', () => {
    test('sample', () => {
        expect (searchForTriplet(generateHash("abc", 22728))).toBe("ccc")

        expect (searchForTriplet("0034e0923cc38887a57bd7b1d4f953df")).toStrictEqual("888")
        expect(generateKeys("abc")).toBe(22728)
    })
    test('part 1', () => {
        expect(generateKeys("jlmsuwbz")).toBe(35186)
    })

    test('sample 2', () => {
       expect(generateKeys("abc", true)).toBe(22551)
    })

    test('part 2', () => {
        expect(generateKeys("jlmsuwbz", true)).toBe(22429)
    })
});