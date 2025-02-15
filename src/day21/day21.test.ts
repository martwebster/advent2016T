import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {scramble, performInstruction, unScramble, rotateRightBasedOnPosition} from './day21';

const dayNumber = "21"
describe(`day ${dayNumber}`, () => {
    test('scramble', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        expect (performInstruction(data[0], "abcde")).toBe("ebcda")
        // swap letter, b,d
        expect (performInstruction(data[1], "ebcda")).toBe("edcba")
        // reverse 0, 4
        expect (performInstruction(data[2], "edcba")).toBe("abcde")
        //rotate left 1
        expect (performInstruction(data[3], "abcde")).toBe("bcdea")
        //move position 1 to 4
        expect (performInstruction(data[4], "bcdea")).toBe("bdeac")
        //move position 3 to 0
        expect (performInstruction(data[5], "bdeac")).toBe("abdec")
        //rotate based on position of letter b
        expect (performInstruction(data[6], "abdec")).toBe("ecabd")
        //rotate based on position of letter b
        expect (performInstruction(data[7], "ecabd")).toBe("decab")
        expect( scramble(data, "abcde")).toBe("decab")
    })

    test('part1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        // not the right answer - fgdhabce
        expect( scramble(data, "abcdefgh")).toBe("gbhafcde")
    })

    test('rotate testing', () => {
        //const value = "01234567" -- same length strings have duplicate answers
        const value = "012345"
        for (let i = 0; i < value.length; i++) {
            console.log( i, rotateRightBasedOnPosition(value, value.charAt(i)).indexOf(value.charAt(i)))
        }
    })

    test('scramble - part 2', () => {
        // 8 length does not have duplicates
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        expect (performInstruction(data[0], "abcdefgh")).toBe("ebcdafgh")
        // swap letter, b,d
        expect (performInstruction(data[1], "ebcdafgh")).toBe("edcbafgh")
        // reverse 0, 4
        expect (performInstruction(data[2], "edcbafgh")).toBe("abcdefgh")
        //rotate left 1
        expect (performInstruction(data[3], "abcdefgh")).toBe("bcdefgha")
        //move position 1 to 4
        expect (performInstruction(data[4], "bcdefgha")).toBe("bdefcgha")
        //move position 3 to 0
        expect (performInstruction(data[5], "bdefcgha")).toBe("fbdecgha")
        //rotate based on position of letter b
        expect (performInstruction(data[6], "fbdecgha")).toBe("hafbdecg")
        //rotate based on position of letter b
        expect (performInstruction(data[7], "hafbdecg")).toBe("fbdecgha")
        expect( scramble(data, "abcdefgh")).toBe("fbdecgha")
    })

    test('Un scramble - part 2', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        //rotate based on position of letter b
        expect (performInstruction(data[7], "fbdecgha", true)).toBe("hafbdecg")
        //rotate based on position of letter b
        expect (performInstruction(data[6], "hafbdecg", true)).toBe("fbdecgha")
        //move position 3 to 0
        expect (performInstruction(data[5], "fbdecgha", true)).toBe("bdefcgha")
        //move position 1 to 4
        expect (performInstruction(data[4], "bdefcgha", true)).toBe("bcdefgha")
        //rotate left 1
        expect (performInstruction(data[3], "bcdefgha", true)).toBe("abcdefgh")
        // reverse 0, 4
        expect (performInstruction(data[2], "abcdefgh", true)).toBe("edcbafgh")
        // swap letter, b,d
        expect (performInstruction(data[1], "edcbafgh", true)).toBe("ebcdafgh")
        expect (performInstruction(data[0], "ebcdafgh", true)).toBe("abcdefgh")
        expect( unScramble(data, "fbdecgha")).toBe("abcdefgh")
    })


    test('part2', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        expect( unScramble(data, "fbgdceah")).toBe("bcfaegdh")
    })
})