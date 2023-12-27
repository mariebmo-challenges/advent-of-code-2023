import {A, B} from "./day7.ts";
import * as fs from "fs";
import * as path from "path";

const mainInput = fs
  .readFileSync(path.resolve(__dirname, "day7.txt"))
    .toString()

const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const input2 = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`;


test("should test input to be 6440 for task A", () => {
    expect(A(input)).toBe(6440); 
});

test("should test input to be 250898830 for task B", () => {
    expect(A(mainInput)).toBe(250898830); 
});

test("should test input to be 5905 for task B", () => {
    expect(B(input)).toBe(5905); 
});

test("should test input to be 6839 for task B", () => {
  expect(B(input2)).toBe(6839);
});

test("should expect 2233J to be full house", () => {
    expect(A("2233J 5")).toBe(5);
});

test("should test input to be 252127335 for task B", () => {
  expect(B(mainInput)).toBe(252127335);
});