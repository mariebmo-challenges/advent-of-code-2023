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

test("should test input to be 6440 for task A", () => {
    expect(A(input)).toBe(6440); 
});

test("should test input to be 250898830 for task B", () => {
    expect(A(mainInput)).toBe(250898830); 
});