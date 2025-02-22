import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {calcWinner, getWinnerToLeft, opp} from './day19';

const dayNumber = "19"
describe(`day ${dayNumber}`, () => {
    test('sample', () => {
        // expect (getWinner(2)).toBe(1)
        // expect (getWinner(3)).toBe(3)
        // expect (getWinner(4)).toBe(1)
        // expect (getWinner(5)).toBe(3)
        // expect (getWinner(6)).toBe(5)
        // expect (getWinner(7)).toBe(7)
        // expect (getWinner(9)).toBe(3)
        for (let i = 0; i < 100; i++) {
            console.log(i, getWinnerToLeft(i), calcWinner(i))
        }
    })

    test('part1', () => {
        expect(calcWinner(3018458)).toBe(1842613);
    })

    test('sample part 2 ', () => {
        const winner = opp(3018458)
        expect(winner).toBe(1424135)

    })
})