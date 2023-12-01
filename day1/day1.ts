import * as fs from "fs";
import * as uiElements from "../shared/uiElements";

const lines = fs.readFileSync("day1.txt", "utf8").split("\n");

function A(): number {
  let sum = 0;

  lines.forEach((line) => {
    const numbers = line.split("").filter((char) => parseInt(char) >= 0);
    sum += parseInt(numbers[0] + numbers[numbers.length - 1]);
  });

  return sum;
}

function B(): number {
  let sum = 0;
  const extraNums = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "zero",
  ];

  lines.forEach((line) => {
    const allNums: string[] = [];

    for (let i = 0; i < line.length; i++) {
      if (parseInt(line[i]) >= 0) {
        allNums.push(line[i]);
      } else {
        for (let j = 0; j < extraNums.length; j++) {
          if (line.substring(i, i + extraNums[j].length) === extraNums[j]) {
            allNums.push((j + 1).toString());
            break;
          }
        }
      }
    }

    sum += parseInt(allNums[0] + allNums[allNums.length - 1]);
  });

  return sum;
}

uiElements.printHeader("Day 1");
console.log("Task A: " + A());
console.log("Task B: " + B());
uiElements.printDecorator();
