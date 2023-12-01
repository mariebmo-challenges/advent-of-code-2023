"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
const fs = __importStar(require("fs"));
function A() {
    let sum = 0;
    fs.readFileSync('day1.txt', 'utf8').split('\n').forEach(line => {
        const numbers = line.split('').filter(char => parseInt(char) >= 0);
        sum += parseInt(numbers[0] + numbers[numbers.length - 1]);
    });
    return sum;
}
exports.A = A;
function B() {
    let sum = 0;
    fs.readFileSync('day1.txt', 'utf8').split('').forEach(line => {
        const extraNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'];
        //change all accourances of 'one' to '1', 'two' to '2' in line
        extraNums.forEach((num, index) => {
            var regex = new RegExp(num, "g");
            line = line.replace(regex, (index + 1).toString());
        });
        const numbers = line.split('').filter(char => parseInt(char) >= 0);
        sum += parseInt(numbers[0] + numbers[numbers.length - 1]);
    });
    return sum;
}
exports.B = B;
console.log('Task A: ' + A());
console.log('Task B: ' + B());
