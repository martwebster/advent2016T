import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {countSafeTiles, genNextRow, genRows} from './day18';

describe('day 18', () => {
    test('sample', () => {
        expect(genNextRow('..^^.')).toBe(".^^^^")
        expect(genNextRow('.^^^^')).toBe("^^..^")

        expect(countSafeTiles(".^^.^.^^^^",10)).toBe(38)
    })

    test('part1', () => {
        const row = ".^^^^^.^^^..^^^^^...^.^..^^^.^^....^.^...^^^...^^^^..^...^...^^.^.^.......^..^^...^.^.^^..^^^^^...^."
        const count = countSafeTiles(row, 40)
        expect(count).toBe(1956);
    })

    test('part2', () => {
        const row = ".^^^^^.^^^..^^^^^...^.^..^^^.^^....^.^...^^^...^^^^..^...^...^^.^.^.......^..^^...^.^.^^..^^^^^...^."
        const count = countSafeTiles(row, 400000)
        expect(count).toBe(19995121);
    })
})