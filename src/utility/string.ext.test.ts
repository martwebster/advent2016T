import {describe, expect, test} from "vitest";
import '../utility/extensions';


describe('String.substringAfter', () => {
    test('found', () => {
        expect("test: 1".substringAfter(": ")).toBe("1")
    })
    test('Not Found', () => {
        expect("test: 1".substringAfter("fish")).toBeUndefined()
    })
})
describe('String.substringBefore', () => {
    test('found', () => {
        expect("test: 1".substringBefore(": ")).toBe("test")
    })
    test('Not Found', () => {
        expect("test: 1".substringBefore("fish")).toBeUndefined()
    })
})
describe('String.substringBetween', () => {
    test('found', () => {
        expect("test: 1".substringBetween("test", "1")).toBe(": ")
    })
    test('first part not found', () => {
        expect("test: 1".substringBetween("testing", "1")).toBeUndefined()
    })
    test('second part not found', () => {
        expect("test: 1".substringBetween("test", "2")).toBeUndefined()
    })
})
describe('String.substringAfterLast', () => {
    test('found', () => {
        expect("S1,S2".substringAfterLast("S")).toBe("2")
    })
    test('Not found', () => {
        expect("S1,S2".substringAfterLast("T")).toBeUndefined()
    })
})
describe('String.substringBeforeLast', () => {
    test('found', () => {
        expect("S1,S2".substringBeforeLast("S")).toBe("S1,")
    })
    test('Not found', () => {
        expect("S1,S2".substringBeforeLast("T")).toBeUndefined()
    })
})
describe('String.substringBetweenLast', () => {
    test('found', () => {
        expect("(1,2), (2,3)".substringBetweenLast("(",")")).toBe("2,3")
    })
    test('first part not found', () => {
        expect("(1,2), (2,3)".substringBetweenLast("[",")")).toBeUndefined()
    })
    test('second part not found', () => {
        expect("(1,2), (2,3)".substringBetweenLast("(","]")).toBeUndefined()
    })
})
describe('String.isDigit', () => {
    test('pass', () => {
        expect("0".isDigit()).toBe(true);
        expect("1".isDigit()).toBe(true);
        expect("2".isDigit()).toBe(true);
        expect("3".isDigit()).toBe(true);
        expect("4".isDigit()).toBe(true);
        expect("5".isDigit()).toBe(true);
        expect("6".isDigit()).toBe(true);
        expect("7".isDigit()).toBe(true);
        expect("8".isDigit()).toBe(true);
        expect("9".isDigit()).toBe(true);
    })
    test('fail', () => {
        expect("-".isDigit()).toBe(false);
        expect("A".isDigit()).toBe(false);
        expect("a".isDigit()).toBe(false);
        expect("@".isDigit()).toBe(false);
    })
})

describe('String.toNumbers',()=> {
    test('pass', () => {
        expect("1,2,3,4".toNumbers(",")).toStrictEqual([1,2,3,4])
        expect("1 2 3 4".toNumbers()).toStrictEqual([1,2,3,4])
        expect("".toNumbers()).toStrictEqual([])
    })
    test('fail', () => {
        expect("fred".toNumbers(",")).toStrictEqual([Number.NaN])
        expect("fred,1".toNumbers(",")).toStrictEqual([Number.NaN, 1])
    })
});

describe('String.lastChar',()=> {
    test('pass', () => {
        expect("fred".lastChar()).toBe("d")
    })
    test('fail', () => {
        expect("".lastChar()).toBeUndefined();
    })
});
describe('String.chunk',()=> {
    test('pass', () => {
        expect("0123".chunk(2)).toStrictEqual(["01","23"])
        expect("0123".chunk(4)).toStrictEqual(["0123"])
        expect("0123".chunk(5)).toStrictEqual(["0123"])
        expect("0".chunk(1)).toStrictEqual(["0"])
        expect("".chunk(1)).toStrictEqual([])
    })
});
describe('String.reverse',()=> {
    test('pass', () => {
        expect("0123".reverse()).toBe("3210")
        expect("0".reverse()).toBe("0")
        expect("".reverse()).toBe("")
    })
});
describe('String.indicesOf',()=> {
    test('pass', () => {
        expect("0103".indicesOf("0")).toStrictEqual([0,2])
        expect("0103".indicesOf("9")).toStrictEqual([])
        expect("".indicesOf("9")).toStrictEqual([])
    })
});
describe('String.splitAt',()=>{
    test('pass', () => {
        expect("0123456".splitAt([[0,3], [5,6]]))
            .toStrictEqual(["0123","56"])

        expect("0123456".splitAt([[2,3], [1,4]]))
            .toStrictEqual(["23","1234"])
    })
});

describe('String.setCharAt',()=>{
    test('pass', () => {
        expect("0123456".setCharAt(0,"-")).toBe("-123456");
        expect("0123456".setCharAt(1,"-")).toBe("0-23456");
        expect("0123456".setCharAt(10,"-")).toBe("0123456");
        expect("0123456".setCharAt(1,"--")).toBe("0--23456");
    })
});