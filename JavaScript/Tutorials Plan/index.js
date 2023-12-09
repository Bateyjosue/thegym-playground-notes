let mutableArray[IE003] = [1, 2, 3, { name: 'Josue'}];
mutableArray[IE003].push(4); // Modifies the original array
console.log(mutableArray); // [1, 2, 3, { name: 'Josue'}, 4]

mutableArray[IE003].pop()


let mutableObject = { key: 'value' };
mutableObject.newKey = 'newValue'; 


let number[IE000] = 42

number[IE0001] = 43

console.log(number) // output 43

let immutableString = 'Hello';

immutableString += 'World'

let newString = immutableString + ' World'; 