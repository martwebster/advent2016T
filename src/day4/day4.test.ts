import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {decrypt, decryptLetter, isRoom, sumSectorIds} from './day4';

describe('day 4 - part1', () => {
    test('sample', () => {
        const rooms = [
            'aaaaa-bbb-z-y-x-123[abxyz]',
            'a-b-c-d-e-f-g-h-987[abcde]',
            'not-a-real-room-404[oarel]',
            'totally-real-room-200[decoy]'
        ]
        expect(isRoom('aaaaa-bbb-z-y-x-123[abxyz]')).toBe(true);
        expect(isRoom('a-b-c-d-e-f-g-h-987[abcde]')).toBe(true);
        expect(isRoom('a-b-c-d-e-f-g-h-987[bacde]')).toBe(false);
        expect(isRoom('not-a-real-room-404[oarel]')).toBe(true);
        expect(isRoom('totally-real-room-200[decoy]')).toBe(false);
        expect(sumSectorIds(rooms)).toBe(1514)
    })

    test('part1', () => {
        const data = readTestData('./src/day4/input.txt');
        const sum = sumSectorIds(data);
        expect(sum).toBe(278221);
    })
    test('sample dec', () => {
        expect(decryptLetter("A",1)).toBe("B")
        expect(decryptLetter("A",25)).toBe("Z")
        expect(decryptLetter("a",26)).toBe("A")
        expect(decryptLetter("q",343)).toBe("V")
        expect(decrypt("qzmt-zixmtkozy-ivhz-343[").toLowerCase()).toBe("very encrypted name")
    })

    test('part2', () => {
        const data = readTestData('./src/day4/input.txt');
        const result =
            data.filter( it => isRoom(it))
                .filter(it => decrypt(it) == "NORTHPOLE OBJECT STORAGE")
                .map (it => it.substringBetweenLast("-","["))
                .first();
        expect (result).toBe("267")
    })
})