import * as fs from 'fs';

const file = 'day1.txt';

export function A() : number {

    let sum = 0;

    fs.readFileSync(file, 'utf8').split('\n').forEach(line => {
        const numbers = line.split('').filter(char => parseInt(char) >= 0);
        sum += parseInt(numbers[0] + numbers[numbers.length - 1])
    });

    return sum;
}

export function B() : number {
    let sum = 0;

    fs.readFileSync(file, 'utf8').split('\n').forEach(line => {
        const extraNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'];

        let newLine = line;
        //change all accourances of 'one' to '1', 'two' to '2' in line
        extraNums.forEach((num, index) => {
            var regex = new RegExp(num, "g");
            newLine = newLine.replace(regex, (index+1).toString());
        });

        const numbers = newLine.split('').filter(char => parseInt(char) >= 0);
        console.log(`line: ${line} newLine: ${newLine} numbers: ${numbers.join(',')}}`);
        sum += parseInt(numbers[0] + numbers[numbers.length - 1])
    });

    return sum;
}

console.log('Task A: ' + A());
console.log('Task B: ' + B());
