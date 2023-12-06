import {A, B} from "./day6.ts";
import * as fs from "fs";
import * as path from "path";

const mainInput = fs
  .readFileSync(path.resolve(__dirname, "day6.txt"))
  .toString()

  const input = `Time:       7  15   30
  Distance:   9  40  200`;

test("should test input to be 27 for task A", () => {
    expect(A(input)).toBe(288); 
});

test("should test mainInput to be 27 for task A", () => {
    expect(A(mainInput)).toBe(2344708);
});