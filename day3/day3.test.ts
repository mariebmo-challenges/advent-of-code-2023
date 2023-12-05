import { A } from "./day3.ts";
import * as fs from "fs";
import * as path from "path";

let mainInput = fs
  .readFileSync(path.resolve(__dirname, "day3.txt"))
  .toString()
  .split("\n");

let input1 = ["....", ".*..", "..27"];
let input2 = [
  "12.......*..",
  "+.........34",
  ".......-12..",
  "..78........",
  "..*....60...",
  "78..........",
  ".......23...",
  "....90*12...",
  "............",
  "2.2......12.",
  ".*.........*",
  "1.1.......56",
];
let input3 = [
  "12.......*..",
  "+.........34",
  ".......-12..",
  "..78........",
  "..*....60...",
  "78.........9",
  ".5.....23..$",
  "8...90*12...",
  "............",
  "2.2......12.",
  ".*.........*",
  "1.1..503+.56",
];

let input4 = ["........", ".24..4..", "......*."];

let input5 = [
  "....................",
  "..-52..52-..52..52..",
  "..................-.",
];

let input6 = ["100 200"];

test("should test input1 to be 27 for task A", () => {
  expect(A(input1)).toBe(27);
});

test("should test input2 to be 413 for task A", () => {
  expect(A(input2)).toBe(413);
});

test("should test input3 to be 925 for task A", () => {
  expect(A(input3)).toBe(925);
});

test("should test input4 to be 4 for task A", () => {
  expect(A(input4)).toBe(4);
});

test("should test input5 to be 156 for task A", () => {
  expect(A(input5)).toBe(156);
});

test("should test input6 to be 0 for task A", () => {
  expect(A(input6)).toBe(0);
});

test("should test mainInput to be 556057 for task A", () => {
  expect(A(mainInput)).toBe(556057);
});




