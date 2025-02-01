import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {displayOption, Floor, move, moveAll, Option} from "./day11";

describe('day 11 - part1', () => {
    test('sample', () => {
        const floors : Floor[] = [];
        floors.push({
            contents: ["HM", "LM"],
        })
        floors.push({
            contents: ["HG"],
        })
        floors.push({
            contents: ["LG"],
        })
        floors.push({
            contents: [],
        })

        const option = {
            elevator: 0,
            floors,
        } as Option;

        displayOption(option);
        // var options = move(option, true)
        // options.forEach( displayOption)
        //
        // options = options.flatMap( it => move(it, true))
        // options.forEach( displayOption)
        //
        // options = options.flatMap( it => move(it, false))
        // options.forEach( displayOption)
        // console.log("----4---- ", options.length)
        // options = options.flatMap( it => move(it, false))
        // options.forEach( displayOption)
        // console.log("----5---- ", options.length)
        // options = options.flatMap( it => move(it, true))
        // options.forEach( displayOption)
        //
        // console.log("----6---- ", options.length)
        // options = options.flatMap( it => move(it, true))
        // options.forEach( displayOption)
        // elevator, can carry
        // one chip,
        // one gen,
        // one chip, one gen
        // two chips
        // two gen

        expect(moveAll(option,4)).toBe(11)
        //F3 .  .  .  .  .
        //F2 .  .  .  LG .
        //F1 .  HG .  .  .
        //F0 E  .  HM .  LM

        // up only
        // first call, either one or two chips



    })

    test('part1', () => {

        const floors : Floor[] = [];
        floors.push({
            contents: ["TG", "TM","PLG", "SG"],
        })
        floors.push({
            contents: ["PLM", "SM"],
        })
        floors.push({
            contents: ["PRG", "PRM", "RG", "RM"],
        })
        floors.push({
            contents: [],
        })

        const option = {
            elevator: 0,
            floors,
        } as Option;

        displayOption(option);

        expect(moveAll(option,10)).toBe(7)

// F0 = TG, TM, PLG, SG
// F1 = PLM, SM
// F2 = PRG, PRM, RG, RM.
        // F3 =
    })
})