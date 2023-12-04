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
const fs = __importStar(require("fs"));
const uiElements = __importStar(require("../shared/uiElements"));
const lines = fs.readFileSync("day1.txt", "utf8").split("\n");
function A() {
  let sum = 0;
  lines.forEach((line) => {
    const numbers = line.split("").filter((char) => parseInt(char) >= 0);
    sum += parseInt(numbers[0] + numbers[numbers.length - 1]);
  });
  return sum;
}
function B() {
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
    const allNums = [];
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
