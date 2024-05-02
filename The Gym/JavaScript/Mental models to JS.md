# Mental models sessions

## Week 2

1. What is the difference between `Symbol()` and `Symbol.for()`

```jsx
// usage example
const symbol1 = Symbol('hello');
const symbol2 = Symbol.for('hello');
```

1. What is the difference between **Symbols** and **Well-known symbols** in JavaScript
2. Why does the `for...of` loop not work on plain objects?”
3. What is the difference between an iterator and an iterable in JavaScript?
4. What is a Polyfill in JavaScript
5. How do Maps differ from regular/plain JavaScript.
6. What’s Difference between a transpiler and a compiler

Explain the output of the following code

```jsx
function Human(fullName) {
  this.fullName = fullName;
}

const titi = Human("Titi Brown");
const tatiana = new Human("Tatiana Brown");

console.log(fullName);
console.log(titi);
console.log(tatiana);
```

What’s wrong with this code

```jsx
const getCapitalizedInitials = (name) =>
  name.trim().split(" ").forEach((name) => name.charAt(0)).join("").toUpperCase()
```

Explain the output of the following code snippets

```jsx
const person = { name: 'John', age: 30 };
const { name, job = 'Unemployed' } = person;
console.log(name, job);
```

```jsx
function mergeArrays(...arrays) {
  return [...arrays];
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = mergeArrays(arr1, arr2);
console.log(merged);
```

```jsx
const obj = {
  data: [1, 2, 3],
  double: function() {
    return this.data.map(function(item) {
      return item * 2;
    });
  },
};

console.log(obj.double());
```

```jsx
function customTag(strings, ...values) {
  return `${strings[0]}${values.join('*')}${strings[1]}`;
}

const a = 5;
const b = 10;
const result = customTag`Multiplying ${a} and ${b} gives ${a * b}.`;
console.log(result);
```

```jsx
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data fetched!'), 1000);
  });
}

async function getData() {
  console.log('Fetching data...');
  const result = await fetchData();
  console.log(result);
  console.log('Data fetched successfully!');
}

getData();
```