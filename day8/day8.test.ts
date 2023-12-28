import {A, B} from "./day8.ts";
import * as fs from "fs";
import * as path from "path";

const mainInput = fs
    .readFileSync(path.resolve(__dirname, "day8.txt"))
    .toString();

const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;


const input2 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;


test("should test input to be 6 for task A", () => {
    expect(A(input)).toBe(6); 
});

test("should test input2 to be 2 for task A", () => {
    expect(A(input2)).toBe(2); 
});


test("should test maininput to be 16409 for task A", () => {
    expect(A(mainInput)).toBe(16409); 
});
