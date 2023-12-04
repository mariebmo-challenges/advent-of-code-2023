"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDecorator = exports.printHeader = void 0;
const amountOfDecorations = 20;
const decoration = "-";
function printHeader(text) {
    printDecorator();
    console.log(" ".repeat((amountOfDecorations - text.length) / 2) + text);
    printDecorator();
}
exports.printHeader = printHeader;
function printDecorator() {
    console.log(decoration.repeat(amountOfDecorations));
}
exports.printDecorator = printDecorator;
