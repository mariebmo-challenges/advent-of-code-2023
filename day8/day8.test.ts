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

const input3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;


test("should test input to be 6 for task A", () => {
    expect(A(input)).toBe(6); 
});

test("should test input2 to be 2 for task A", () => {
    expect(A(input2)).toBe(2); 
});


test("should test maininput to be 16409 for task A", () => {
    expect(A(mainInput)).toBe(16409); 
});

test("should test input to be 6 for task B", () => {
    expect(B(input3)).toBe(6); 
});


//670079 too low
//99999999 too low
/*
test("should test input to be 6 for task B", () => {
    expect(B(mainInput)).toBe(670079); 
});
*/