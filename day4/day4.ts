import * as uiElements from "../shared/uiElements";
import * as fs from "fs";

export function A(input: string[]): number {
  let sum = 0;

  input.forEach((line, row) => {
    let cardNum = line.split(":")[0].split(" ")[1];
    let winningNumbs = line
      .split(":")[1]
      .split("|")[0]
      .split(" ")
      .filter((x) => x != "");
    let ticketNumbers = line
      .split(":")[1]
      .split("|")[1]
      .split(" ")
      .filter((x) => x != "");

    let amountOfWinningNumbs = 0;

    winningNumbs.forEach((winningNumb) => {
      if (ticketNumbers.includes(winningNumb)) {
        amountOfWinningNumbs++;
      }
    });

    if (amountOfWinningNumbs > 0) {
      console.log(
        "Card " +
          cardNum +
          " has " +
          amountOfWinningNumbs +
          " winning numbers. Adding 2^" +
          (amountOfWinningNumbs - 1) +
          "(" +
          Math.pow(2, amountOfWinningNumbs - 1) +
          ") to sum.",
      );
      sum += Math.pow(2, amountOfWinningNumbs - 1);
    }
  });

  return sum;
}
