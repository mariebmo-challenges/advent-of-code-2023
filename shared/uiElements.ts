const amountOfDecorations = 20;
const decoration = "-";

export function printHeader(text: string) {
  printDecorator();
  console.log(" ".repeat((amountOfDecorations - text.length) / 2) + text);
  printDecorator();
}

export function printDecorator() {
  console.log(decoration.repeat(amountOfDecorations));
}
