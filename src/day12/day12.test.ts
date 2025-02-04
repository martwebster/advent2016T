import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {buildRegisters, copy, decrement, increment, runProgram} from './day12';

describe('day 12 - part1', () => {
    test('simple commands', () => {
        const registers = buildRegisters();
        expect(registers.size).toBe(4);

        // increment
        increment(registers, "a");
        expect(registers.get("a")).toBe(1)

        // copy a into b
        copy(registers, "a", "b");
        expect(registers.get("b")).toBe(1)

        copy(registers, "100", "c");
        expect(registers.get("c")).toBe(100)

        decrement(registers, "a");
        expect(registers.get("a")).toBe(0)
    })

    test('sample', () => {
        const data = readTestData('./src/day12/sample.txt');
        const val = runProgram(data)
        expect(val).toBe(42);
    })

    test('part1', () => {
        const data = readTestData('./src/day12/input.txt');
        const val = runProgram(data)
        expect(val).toBe(318077);
    })

    test('part1', () => {
        const data = readTestData('./src/day12/input.txt');
        const val = runProgram(data)
        expect(val).toBe(318077);
    })

    test('part2', () => {
        const data = readTestData('./src/day12/input.txt');
        const val = runProgram(data,1)
        expect(val).toBe(9227731);
    })
})