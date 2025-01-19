import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {apply, buildScreen, displayScreen} from './day8';

describe('day 8', () => {
    test('sample', () => {
        const screen = buildScreen()
        displayScreen(screen);
        apply(screen, "rect 3x2")
        displayScreen(screen);
        apply(screen, "rotate column x=1 by 1")
        displayScreen(screen);
        apply(screen, "rotate row y=0 by 4")
        displayScreen(screen);
        apply(screen, "rotate column x=1 by 1")
        displayScreen(screen);
    })

    test('part1&2', () => {
        const data = readTestData('./src/day8/input.txt');
        const screen = buildScreen(50,6)
        data.forEach( it => apply(screen, it));
        const pixels = screen.countOf( it=> it.display=="#")
        expect (pixels).toBe(128)
        displayScreen(screen, 5);
        //View output EOARGPHYAO
    })
})