import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {
    getPosition,
    hashDecode,
    move,
    getShortestPath,
    getLongestPath
} from './day17';

describe('day 17', () => {
    test('sample', () => {
        expect(getPosition('')).toStrictEqual({x: 0, y: 0});
        expect(getPosition('D')).toStrictEqual({x: 0, y: 1});
        expect(getPosition('DU')).toStrictEqual({x: 0, y: 0});
        expect(getPosition('R')).toStrictEqual({x: 1, y: 0});
        expect(getPosition('RR')).toStrictEqual({x: 2, y: 0});
        expect(getPosition('RRLL')).toStrictEqual({x: 0, y: 0});
        expect(getPosition('DR')).toStrictEqual({x: 1, y: 1});

        expect(hashDecode("hijkl").up).toBe(true)
        expect(hashDecode("hijkl").down).toBe(true)
        expect(hashDecode("hijkl").left).toBe(true)
        expect(hashDecode("hijkl").right).toBe(false)

        expect(move("hijkl","")).toStrictEqual(['D'])
        expect(getShortestPath("hijkl")).toBeUndefined();

        expect(getShortestPath("ihgpwlah")).toBe("DDRRRD")
        expect(getShortestPath("kglvqrro")).toBe("DDUDRLRRUDRD")
        expect(getShortestPath("ulqzkmiv")).toBe("DRURDRUDDLLDLUURRDULRLDUUDDDRR")
    })

    test('part 1', () => {
       expect(getShortestPath("qtetzkpl")).toBe("RRRLDRDUDD")
    })

    test('part 2 - Longest', () => {
        expect(getLongestPath("ihgpwlah")).toBe(370)
        expect(getLongestPath("kglvqrro")).toBe(492)
        expect(getLongestPath("ulqzkmiv")).toBe(830)
    })

    test('part 2', () => {
        expect(getLongestPath("qtetzkpl")).toBe(706)
    })
})