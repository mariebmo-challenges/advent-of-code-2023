import * as fs from 'fs';

export function A() : number {

    let sum = 0;

    fs.readFileSync('day1.txt', 'utf8').split('\n').forEach(line => {
        const numbers = line.split('').filter(char => parseInt(char) >= 0);
        sum += parseInt(numbers[0] + numbers[numbers.length - 1])
    });

    return sum;
}

export function B(){
    let sum = 0;

    fs.readFileSync('day1.txt', 'utf8').split('').forEach(line => {
        const extraNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'];

        //change all accourances of 'one' to '1', 'two' to '2' in line
        extraNums.forEach((num, index) => {
            var regex = new RegExp(num, "g");
            line = line.replace(regex, (index+1).toString());
        });

        const numbers = line.split('').filter(char => parseInt(char) >= 0);
        sum += parseInt(numbers[0] + numbers[numbers.length - 1])
    });

    return sum;
}

console.log('Task A: ' + A());
console.log('Task B: ' + B());
