"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
const fs = __importStar(require("fs"));
const uiElements = __importStar(require("../shared/uiElements"));
const input = fs.readFileSync("./day3.txt", "utf8").split("\n");
function A(lines) {
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
  }
  return sum;
}
exports.A = A;
function checkMatrix(lines, numStr, startRow, startColumn) {
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
      if (lines[row][column] !== "." && isNaN(parseInt(lines[row][column]))) {
        sum += parseInt(numStr);
      }
    }
  }
  return sum;
}
uiElements.printHeader("Day 3");
console.log("Task A: " + A(input));
// console.log("Task B: " + B());
uiElements.printDecorator();
