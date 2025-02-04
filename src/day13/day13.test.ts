import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {displayGrid, exampleFunction, navigateTo} from './day13';

describe('day 13', () => {
    test('sample', () => {
        displayGrid(9,6, 10);

        expect(navigateTo({x:7,y:4}, 10).steps).toBe(11)
    })

    test('part1', () => {
        displayGrid(40,40, 1350);

        expect(navigateTo({x:31,y:39}, 1350).steps).toBe(92)
    })

    test('part2', () => {
        expect(navigateTo({x:100,y:100}, 1350, 50).distinct).toBe(124)
    })
})