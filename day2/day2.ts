import * as fs from "fs";
import * as uiElements from "../shared/uiElements";

const lines = fs.readFileSync("day2.txt", "utf8").split("\n");

function A(): number {
  let maxRed = 12;
  let maxGreen = 13;
  let maxBlue = 14;

  let possibilities = 0;

  lines.forEach((line) => {
    var split = line.split(":");

    let gameId = parseInt(split[0].split(" ")[1]);
    let rounds = split[1].split(";");

    let validRound = true;

    rounds.forEach((round) => {
      let roundSplit = round.split(",");

      let red = 0;
      let green = 0;
      let blue = 0;

      roundSplit.forEach((color) => {
        if (color.includes("red")) {
          red += parseInt(color.split(" ")[1]);
        }
        if (color.includes("green")) {
          green += parseInt(color.split(" ")[1]);
        }
        if (color.includes("blue")) {
          blue += parseInt(color.split(" ")[1]);
        }
      });

      if (red > maxRed || green > maxGreen || blue > maxBlue) {
        validRound = false;
      }
    });

    if (validRound) {
      possibilities += gameId;
    }
  });

  return possibilities;
}

function B(): number {
  let sum = 0;

  lines.forEach((line) => {
    var split = line.split(":");

    let rounds = split[1].split(";");

    let red = 0;
    let green = 0;
    let blue = 0;

    rounds.forEach((round) => {
      let roundSplit = round.split(",");

      roundSplit.forEach((color) => {
        let colorNum = parseInt(color.split(" ")[1]);

        if (color.includes("red") && colorNum > red) {
          red = colorNum;
        } else if (color.includes("green") && colorNum > green) {
          green = colorNum;
        } else if (color.includes("blue") && colorNum > blue) {
          blue = colorNum;
        }
      });
    });

    sum += red * green * blue;
  });

  return sum;
}

uiElements.printHeader("Day 2");
console.log("Task A: " + A());
console.log("Task B: " + B());
uiElements.printDecorator();
