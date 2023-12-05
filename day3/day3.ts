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

export function B(lines: string[]): number {
  let sum = 0;

  for (let row = 0; row < lines.length; row++) {
    let line = lines[row];
    let rowMatrix = line.split("");

    for (let column = 0; column < rowMatrix.length; column++) {
      let curChar = rowMatrix[column];
      if (curChar === "*") {
        sum += checkGearMatrix(lines, row, column);
      }
    }
  }

  return sum;
}

function checkGearMatrix(
  lines: string[],
  startRow: number,
  startColumn: number,
): number {
  let numbers: number[] = [];

  for (let row = startRow - 1; row <= startRow + 1; row++) {
    let numberString = "";

    for (let column = startColumn - 1; column <= startColumn + 1; column++) {
      if (
        row < 0 ||
        column < 0 ||
        row >= lines.length ||
        column >= lines[row].length
      ) {
        continue;
      }

      let curChar = lines[row][column];
      if (!isNaN(parseInt(curChar))) {
        var wholeNum = "";

        if (numberString.length == 0) {
          let curColumnCheck = column;
          while (
            curColumnCheck >= 0 &&
            !isNaN(parseInt(lines[row][curColumnCheck]))
          ) {
            wholeNum = lines[row][curColumnCheck] + wholeNum;
            curColumnCheck--;
          }

          curColumnCheck = column + 1;
          while (
            curColumnCheck < lines[row].length &&
            !isNaN(parseInt(lines[row][curColumnCheck]))
          ) {
            wholeNum = wholeNum + lines[row][curColumnCheck];
            curColumnCheck++;
          }
        }

        numberString += wholeNum;
      } else if (numberString.length > 0) {
        numbers.push(parseInt(numberString));
        numberString = "";
      }
    }

    if (numberString.length > 0) {
      numbers.push(parseInt(numberString));
      numberString = "";
    }
  }

  console.log(numbers);
  if (numbers.length != 2) {
    return 0;
  }

  return numbers[0] * numbers[1];
}
