import * as fs from "fs";
import * as uiElements from "../shared/uiElements";

export function A(lines: string[]): number {
  let sum = 0;

  for (let row = 0; row < lines.length; row++) {
    let line = lines[row];
    let rowMatrix = line.split("");

    let numberString = "";

    for (let column = 0; column < rowMatrix.length; column++) {
      let curChar = rowMatrix[column];
      if (!isNaN(parseInt(curChar))) {
        numberString += curChar;
      } else if (numberString.length > 0) {
        let returnNumber = checkMatrix(
          lines,
          numberString,
          row,
          column - numberString.length,
        );
        sum += returnNumber;
        let status = returnNumber > 0 ? "it's a match!" : "no match found";
        console.log(
          "Checking " +
            numberString +
            " at " +
            row +
            ", " +
            column +
            ": " +
            status,
        );
        numberString = "";
      }
    }

    if (numberString.length > 0) {
      let returnNumber = checkMatrix(
        lines,
        numberString,
        row,
        rowMatrix.length - numberString.length,
      );
      sum += returnNumber;
      let status = returnNumber > 0 ? "it's a match!" : "no match found";
      console.log(
        "Checking " +
          numberString +
          " at " +
          row +
          ", " +
          rowMatrix.length +
          ": " +
          status,
      );
      numberString = "";
    }
  }

  return sum;
}

function checkMatrix(
  lines: string[],
  numStr: string,
  startRow: number,
  startColumn: number,
): number {
  let numLength = numStr.length;
  let sum = 0;

  for (let row = startRow - 1; row <= startRow + 1; row++) {
    for (
      let column = startColumn - 1;
      column <= startColumn + numLength;
      column++
    ) {
      if (
        row < 0 ||
        column < 0 ||
        row >= lines.length ||
        column >= lines[row].length
      ) {
        continue;
      }

      let curChar = lines[row][column];
      if (
        curChar !== "." &&
        curChar !== "\r\n" &&
        curChar !== "\n" &&
        curChar !== "\r" &&
        curChar !== " " &&
        isNaN(parseInt(curChar))
      ) {
        sum += parseInt(numStr);
      }
    }
  }

  return sum;
}

const input = fs.readFileSync("./day3.txt", "utf8").split("\n");

uiElements.printHeader("Day 3");
console.log("Task A: " + A(input));
// console.log("Task B: " + B());
uiElements.printDecorator();
