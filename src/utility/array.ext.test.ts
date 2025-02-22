import {describe, expect, test} from "vitest";
import '../utility/extensions';


describe('Array', () => {
    test('chunk', () => {
        expect([1,2,3,4].chunk(1)).toStrictEqual([[1],[2],[3],[4]])
        expect([1,2,3,4].chunk(2)).toStrictEqual([[1,2],[3,4]])
        expect([1,2,3,4].chunk(3)).toStrictEqual([[1,2,3],[4]])
        expect([1,2,3,4].chunk(4)).toStrictEqual([[1,2,3,4]])
        expect([1,2,3,4].chunk(5)).toStrictEqual([[1,2,3,4]])
    })

    test('countOf', () => {
        expect([1,1,3,4].countOf( item => item==1)).toBe(2)
        expect(["1","1","3","4"].countOf( item => item=="1")).toBe(2)
        expect([1,1,3,4].countOf( item => item==0)).toBe(0)
        expect([].countOf( item => item==0)).toBe(0)
    })
})