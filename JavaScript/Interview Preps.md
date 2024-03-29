
1. What is JavaScript? what is the role of JavaScript engine?

**JavaScript:** is a programming language that is used for converting **[static web pages]** to [interactive and dynamic web pages].

**JavaScript Engine:** is a program present in web browsers that executes JavaScript code.

2. What are client Side and Server Side?

 - **A Client**: is a device, application, or software component that requests and consumes services or resources from a server
 - **A Server:** is a device, computer, or software application that provides services, resources, or functions to clients.

3. What is scope in JS?
	is related to the accessibility in JS.
[Scope] determine where variables are defined and where they can be accessed.
there are 3 types of scope

- global Scope => accessible anywhere
- Function Scope => accessible inside function only
- Block Scope => accessible inside block only

4. What is the type of a variable in JS whet it is declare without using the var, let or const keywords?
**[Var]**: is the implicit type of variable when a variable is declared without var, let or const keywords.

```js
if(true){
	variable = 10
}

console.log(variable)

// output: 10
```

5. What is Hoisting in JavaScript?

Is a JS behavior where functions and variable declarations are moved to the top of their respective scopes during the compilation phase.

```js
myFunc()
function myFunc() {
	console.log('Hello')
}

// output: Hello
```

6. What is JSON?

JSON(JavaScript Object Natation) is a lightweight data interchange format. consists of key-value pairs

```js
{
	"name": "Josh Batey",
	"age": 25,
	"isStudent": false,
	"address": {
		"street": "101 Itebero, Mabanga-Nord, Karisimbi",
		"city": "Goma",
		"country": "DRC"
	}
}
```

7. What are variables? what is the difference between var, let and const?

- **var**: creates a function-scoped variable

```js
function example() {
	if(true){
		var count = 10
		console.log(count)
	}
	console.log(count) // output: 10
	
}
```

- **let**: creates a block-scoped variable
```js
function example() {
	if(true){
		var count = 10
		console.log(count) // output: 10
	}
	console.log(count) // output: uncaught Reference Error: count is not defined
	
}
```

- **const**: can be assigned only once, and it value cannot be changed afterwards.

```js
const z = 10;

z = 20;

// this will result in an error
console.log(z);
```

8. What are data types in JS?

data type determines the type of variable.

**Types of Data types**

- Primitive: Numbers, Strings, Booleans, Undefined and Null
- Non-Primitive: Object, Array, Function, Date and RegExp

9. Difference between primitive and non-primitive data types?

**Primitive Data type**
- can hold only single value
- are immutable, meaning their values, once assigned cannot be changed
**Non Primitive Data type**
- hold multiple value
- are mutable and their values can changed

10. Difference between Null and Undefined in JS?

**Null**: The is a valid variable with a value of no data type, can be assign in  the future

```js
let nullVariable = null;
console.log(nullVariable);
// Output: null
```
- null variables are intentionally assigned the null value.
- can be used, when you are sure you do not have any value for the particular variable


**Undefined**: Variable is incomplete variable and not assigned anything

```js
let undefinedVariable;

console.log(undefinedVariable) // Output undefined
```
- when a variable is declared but has not been assigned a value, it is automatically initialized with undefined.
- can be used when you don't have the value right now, but you will get it after some logic or operation

11. What the use of `typeof` operator?

```js
let num = 42

console.log(tuypeof num) // Output: number
```
- is used to determine the type of each variable
- can be used to validate the data received from external sources(API)

12. What the use of type coercion in JS?

```js
let string = '42'
let number = 42
let boolean = true
let nullValue = null

console.log(string + number) // Output: 4242
console.log(number + boolean) // Output: 43
console.log(string == string) // Output: true
console.log(boolean == 1) // Output: true
console.log(boolean + nullValue) // Output: 1
```

Is the automatic conversion of values from one data type to another during certain operations or comparisons.

#### USes of type coercion

1. Can be used during string and number concatenation
2. can be used while using comparison operators

13.  What is operator precedence?

**BODMAS**: Brackets, Order, Division, Multiplication, Addition, Subtraction

```js
let a = 6
let b = 3
let c = 2

let result = a + b * c + (a - b)

console.log(result) // Output: 15
```

as per operator precedence, operators with higher precedence are evaluated first.

14. What is the difference between Unary, binary and ternary operator?
They are all operators based on number of operands
![[ternary.png]]

15. what short-circuit evaluation in JS?
stops the execution as soon as the result can be determined without evaluating the remaining sub-expressions.

```js
let result1 = false && someFunction();
console.log(result1) // Output false

let result2 = true || someFunction()
console.log(result2) // Output true
```

16.  What is the difference between `==` and `===`?

- Loose Equality `==`
	compares two values for equality after performing type coercion
- strict Equality `===`
	- compares two values for equality without performing type coercion
	- is preferred in use to get more accurate comparisons
17. What is the difference between spread and rest operator?
	1. Spread: is used to expand or spread elements from an iterable into individual elements
	2. Uses of spread Operator
		- Copying an Array
	```js
	const array = [1,2,3]
	console.log(...array) // Output: 1, 2, 3
```
	 - Merging Arrays
	```js
const array1 = [1,2,3]
const array2 = [4, 5]

const mergeArray = [...array1, ...array2]
console.log(mergeArray) // output: [1,2,3,4,5]
```
		
	 - Passing Multiple Arguments to  a Function

	```js
const numbers = [1,2,3,4,5]
sum(...numbers)
function sum(a,b,c,d,e){
console.log(a+b+c+d+e) // output: 15
}
```


---
## Advanced JS

1. closures
2. Asynchronous [basic, promises, Async ... await]
3. Browser APIs & Web Storage
4. Classes & Constructors
5. ECMAScript & Modules
6. Security & Performance

___
### How to handle event bubbling in JavaScript?

Event bubbling is a concept in the Document Object Model (DOM) that describes the way in which events propagate or "bubble up" through the hierarchy of nested elements in the DOM.

When an event, such as a mouse click, occurs on a DOM element, the event will be handled by the element first, then its parent element, and so on, until the event reaches the root element. This behavior is called event bubbling.

```js
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

// Scenario of clicking on the child element
parent.addEventListener('click', () => {
  console.log('Handled Last');
});

child.addEventListener('click', () => {
  console.log('Handled First');
});
```

In the above example, when you click on the `child` element, the event will be handled by the `child` element first, then its parent element, and so on, to the root element unless you stop the propagation (`event.stopPropagation()`) of the event.

### What is Hoisting in JavaScript?
Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. This means that no matter where the functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local. Note that hoisting only moves the declaration, not the initialization.

```js
console.log(x === undefined); // true
var x = 3;
console.log(x); // 3
```

The above code snippet can be visualized in the following way:

```js
var x;
console.log(x === undefined); // true
x = 3;
console.log(x); // 3
```
### What are Scopes in JavaScript?
A scope is a set of variables, objects, and functions that you have access to. There are three types of scopes in JavaScript. Which are Global Scope, Function Scope (Local Scope), and Block Scope.

### What is the difference between `==` and `===`?
The `==` equality operator converts the operands if they are not of the same type, then applies strict comparison. The `===` strict equality operator only considers values equal that have the same type.

```js
console.log(1 == '1'); // true
console.log(1 === '1'); // false
console.log(1 === 1); // true
```

### What is the difference between `null` and `undefined`?
The `null` is an assignment value. It can be assigned to a variable as a representation of no value. But the `undefined` is a primitive value that represents the absence of a value, or a variable that has not been assigned a value.

### What is Map in JavaScript?
Map is another data structure in JavaScript which is similar to `Object` but the key can be of any type. It is a collection of elements where each element is stored as a Key, value pair. It is also known as a Hash table or a dictionary.

The `key` can be of any type but the `value` can be of any type. The `key` is unique and immutable, whereas the `value` can be mutable or immutable.

```js
const roadmap = new Map();
roadmap.set('name', 'JavaScript');
roadmap.set('type', 'dynamic');
roadmap.set('year', 1995);

console.log(roadmap.get('name')); // JavaScript

roadmap.delete('year');
console.log(roadmap.has('year')); // false
console.log(roadmap.size); // 2

roadmap.clear();
console.log(roadmap.size); // 0
```

### What are the different ways to declare a variable in JavaScript?
There are three ways to declare a variable in JavaScript `var`, `let`, and `const`.

### How to enable strict mode in JavaScript?
To enable strict mode in JavaScript, you need to add the following line at the top of the file or function `'use strict';`.
### What is Inheritance in JavaScript?
Inheritance is a way to create a new `Class` from an existing `Class`. The new `Class` inherits all the properties and methods from the existing `Class`. The new `Class` is called the child `Class`, and the existing `Class` is called the parent `Class`.

## Example

```js
class Roadmap {
  constructor(name, description, slug) {
    this.name = name;
    this.description = description;
    this.slug = slug;
  }

  getRoadmapUrl() {
    console.log(`https://roadmap.sh/${this.slug}`);
  }
}

class JavaScript extends Roadmap {
  constructor(name, description, slug) {
    super(name, description, slug);
  }

  greet() {
    console.log(`${this.name} - ${this.description}`);
  }
}

const js = new JavaScript(
  'JavaScript Roadmap',
  'Learn JavaScript',
  'javascript'
);

js.getRoadmapUrl(); // https://roadmap.sh/javascript
js.greet(); // JavaScript Roadmap - Learn JavaScript
```

In the above example, the `JavaScript` class inherits the `getRoadmapUrl()` method from the `Roadmap` class. This is because the `JavaScript` class extends the `Roadmap` class using the `extends` keyword. In the `JavaScript` class, the `getRoadmapUrl()` method is not found, so JavaScript looks up the prototype chain and finds the `getRoadmapUrl()` method in the `Roadmap` class.

### What is a closure in JavaScript?
A closure is a function that has access to its outer function scope even after the outer function has returned. This means a closure can remember and access variables and arguments of its outer function even after the function has finished.

```js
function outer() {
  const name = 'Roadmap';

  function inner() {
    console.log(name);
  }

  return inner;
}

const closure = outer();
closure(); // Roadmap
```

In the above example, the `inner` function has access to the `name` variable of the `outer` function even after the `outer` function has returned. Therefore, the `inner` function forms a closure.

### Difference between `Promise.all()` and `Promise.allSettled()`?
The core difference between `Promise.all()` and `Promise.allSettled()` is that `Promise.all()` rejects immediately if any of the promises reject whereas `Promise.allSettled()` waits for all of the promises to settle (either resolve or reject) and then returns the result.

## Initialize

```js
const promise1 = Promise.resolve('Promise 1 resolved');
const promise2 = Promise.reject('Promise 2 rejected');
```

## Using `Promise.all()`

```js
Promise.all([promise1, promise2])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log('An error occurred in Promise.all():', error);
  });

// Output:
// An error occurred in Promise.all(): Promise 2 rejected
```

In the above code, the `Promise.all()` rejects immediately when any of the `promise2` rejects.

## Using `Promise.allSettled()`

```js
Promise.allSettled([promise1, promise2]).then((results) => {
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(
        `Promise ${index + 1} was fulfilled with value:`,
        result.value
      );
    } else {
      console.log(
        `Promise ${index + 1} was rejected with reason:`,
        result.reason
      );
    }
  });
});

// Output:
// Promise 1 was fulfilled with value: Promise 1 resolved
// Promise 2 was rejected with reason: Promise 2 rejected
```

In the above code, the `Promise.allSettled()` waits for all of the promises to settle (either resolve or reject) and then returns the result.

### Is Java and JavaScript the same?

No, Java and JavaScript are distinct languages. Their similarity in name is coincidental, much like `car` and `carpet`. Java is often used for backend and mobile apps, while JavaScript powers web interactivity and backend.

### Garbage collection in JavaScript?
The JavaScript engine uses automatic garbage collection. JavaScript automatically manages memory by freeing up space used by objects no longer needed. This algorithm is called Mark and Sweep, which is performed periodically by the JavaScript engine.

### What is Set in JavaScript?
Set is another data structure in JavaScript which is similar to `Array` but the values are unique. It is a collection of elements where each element is stored as a value without any keys.

```js
const roadmap = new Set();
roadmap.add('JavaScript');
roadmap.add('JavaScript');

roadmap.add('dynamic');
roadmap.add(1995);

console.log(roadmap.size); // 3, because the value 'JavaScript' is already present in the set
console.log(roadmap.has('JavaScript')); // true

roadmap.delete('JavaScript');
console.log(roadmap.has('JavaScript')); // false
console.log(roadmap.size); // 2
```

### Does `map()` method mutate the original array?
No, the `map()` method does not mutate the original array. It returns a new array with the results of calling a provided function on every element in the calling array.

```js
const roadmaps = ['JavaScript', 'React', 'Node.js'];

const renamedRoadmaps = roadmaps.map((roadmap) => {
  return `${roadmap} Roadmap`;
});

console.log(roadmaps); // ['JavaScript', 'React', 'Node.js']
console.log(renamedRoadmaps); // ['JavaScript Roadmap', 'React Roadmap', 'Node.js Roadmap']
```

### How you can find unique values in an array?
There are serveral ways to find unique values in an array. Here are some of them:

## Using `Set`

```js
const roadmaps = ['JavaScript', 'React', 'Node.js', 'Node.js', 'JavaScript'];
const uniqueRoadmaps = [...new Set(roadmaps)];
console.log(uniqueRoadmaps); // ['JavaScript', 'React', 'Node.js']
```

## Using `filter()`

```js
const roadmaps = ['JavaScript', 'React', 'Node.js', 'Node.js', 'JavaScript'];
const uniqueRoadmaps = roadmaps.filter(
  (roadmap, index) => roadmaps.indexOf(roadmap) === index
);
console.log(uniqueRoadmaps); // ['JavaScript', 'React', 'Node.js']
```

## Using `reduce()`

```js
const roadmaps = ['JavaScript', 'React', 'Node.js', 'Node.js', 'JavaScript'];
const uniqueRoadmaps = roadmaps.reduce((unique, roadmap) => {
  return unique.includes(roadmap) ? unique : [...unique, roadmap];
}, []);
console.log(uniqueRoadmaps); // ['JavaScript', 'React', 'Node.js']
```

## Using `forEach()`

```js
const roadmaps = ['JavaScript', 'React', 'Node.js', 'Node.js', 'JavaScript'];
const uniqueRoadmaps = [];
roadmaps.forEach((roadmap) => {
  if (!uniqueRoadmaps.includes(roadmap)) {
    uniqueRoadmaps.push(roadmap);
  }
});
console.log(uniqueRoadmaps); // ['JavaScript', 'React', 'Node.js']
```

## Using `for...of`

```js
const roadmaps = ['JavaScript', 'React', 'Node.js', 'Node.js', 'JavaScript'];
const uniqueRoadmaps = [];
for (const roadmap of roadmaps) {
  if (!uniqueRoadmaps.includes(roadmap)) {
    uniqueRoadmaps.push(roadmap);
  }
}
console.log(uniqueRoadmaps); // ['JavaScript', 'React', 'Node.js']
```

### What is IIFE in JavaScript?
The IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.

```js
(function () {
  console.log('Hello Roadmap!');
})();
```

The IIFE is frequently used to create a new scope to avoid variable hoisting from within blocks.

```js
(function () {
  var roadmap = 'JavaScript';
  console.log(roadmap);
})();

console.log(roadmap); // ReferenceError: name is not defined
```

### What is the spread operator in JavaScript?
The spread operator in JavaScript is represented by three dots (`...`). It allows the elements of an array or properties of an object to be expanded or "spread" into individual elements or properties. This can be useful in various contexts, such as when passing elements as function arguments, cloning arrays and objects, or merging arrays and objects.

```js
const roadmaps = ['JavaScript', 'React', 'Node.js'];
const bestPractices = ['AWS', 'API Security'];

const resources = [...roadmaps, ...bestPractices];
console.log(resources); // ['JavaScript', 'React', 'Node.js', 'AWS', 'API Security']
```

```js
const roadmap = {
  name: 'JavaScript',
  type: 'dynamic',
};

const roadmapClone = { ...roadmap }; // shallow copy
console.log(roadmapClone); // { name: 'JavaScript', type: 'dynamic' }
```

### How to make an Object immutable in JavaScript?
To make an object immutable, you can use `Object.freeze()` method. It prevents the modification of existing property values and prevents the addition of new properties.

```js
const roadmap = {
  name: 'JavaScript',
};

Object.freeze(roadmap);

roadmap.name = 'JavaScript Roadmap'; // throws an error in strict mode
console.log(roadmap.name); // JavaScript
```
> if you want to see the effect of the following property use it strict mode that when it will have effect

### What is callback hell in JavaScript?
**Callback hell**, often referred to as **Pyramid of Doom**, describes a situation in JavaScript where multiple nested callbacks become difficult to manage, leading to unreadable and unmaintainable code. It often arises when performing multiple asynchronous operations that depend on the completion of previous operations. The code starts to take on a pyramidal shape due to the nesting.

## Example of callback hell

```js
callAsync1(function () {
  callAsync2(function () {
    callAsync3(function () {
      callAsync4(function () {
        callAsync5(function () {
          // ...
        });
      });
    });
  });
});
```

## Strategies to avoid callback hell

Developers can address or avoid callback hell by using strategies like modularizing the code into named functions, using asynchronous control flow libraries, or leveraging modern JavaScript features like Promises and `async/await` to write more linear, readable asynchronous code.

### Promise chaining

```js
callAsync1()
  .then(() => callAsync2())
  .then(() => callAsync3())
  .then(() => callAsync4())
  .then(() => callAsync5())
  .catch((err) => console.error(err));
```

### Async/await

```js
async function asyncCall() {
  try {
    await callAsync1();
    await callAsync2();
    await callAsync3();
    await callAsync4();
    await callAsync5();
  } catch (err) {
    console.error(err);
  }
}
```

### Does Arrow functions have their own `this`?
No, arrow functions do not have their own `this`. Instead, they inherit the `this` of the enclosing lexical scope.

### What is DOM?
The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects.

### What is the difference between `var`, `let`, and `const` in JavaScript?
In JavaScript, `var` is function-scoped and was traditionally used to declare variables. `let` and `const` are block-scoped. The key difference between `let` and `const` is that `let` allows for reassignment while `const` creates a read-only reference.

### Explain `alert()`, `prompt()`, and `confirm()` methods in JavaScript?
Let's see how we can use the `alert`, `prompt` and `confirm` functions to interact with the user.
## alert()

The `alert()` method displays an alert box with a specified message and an OK button.

```js
alert('Hello World!');
```

## prompt()

The `prompt()` method displays a dialog box that prompts the visitor for input. A prompt box is often used if you want the user to input a value before entering a page. The `prompt()` method returns the input value if the user clicks OK. If the user clicks Cancel, the method returns `null`.

```js
const name = prompt('What is your name?');
console.log(name);
```

## confirm()

The `confirm()` method displays a dialog box with a specified message, along with an OK and a Cancel button. This is often used to confirm or verify something from the user.

```js
const result = confirm('Are you sure?');
console.log(result); // true/false
```

### What is the purpose of the `async/await` in JavaScript?

### What is JavaScript?
JavaScript (often abbreviated as JS) is a high-level, versatile, and widely-used programming language primarily known for its role in web development. It enables interactive and dynamic behavior on websites.

### What is Event Capturing in JavaScript?
Event capturing is the first phase of event propagation. In this phase, the event is captured by the outermost element and propagated to the inner elements. It is also known as trickling. It is the opposite of event bubbling.

### How to handle error in async/await?
In order to handle errors in async/await, we can use the `try/catch` statement.

## Rejecting a promise

```js
const promise = new Promise((resolve, reject) => {
  reject(new Error('Something went wrong'));
});
```

## Try/catch statement

```js
async function main() {
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
```

The `catch` block will be executed when the promise is `rejected` or when an error is thrown inside the `try` block.

### How to create a new Element in DOM?
To create a new DOM element, you can use the `document.createElement` method. It accepts a tag name as an argument and returns a new element with the specified tag name. You can set attributes to the element.

```js
const div = document.createElement('div');

div.id = 'roadmap-wrapper';
div.setAttribute('data-id', 'javascript');
console.log(div); // <div id="roadmap-wrapper" data-id="javascript"></div>
```

> you can also '.innerHtml' or 'insertAdjacentElement' function

### What is ternary operator in JavaScript?
The ternary operator is a conditional operator that takes three operands. It is frequently used as a shortcut for the `if` statement.

```js
console.log(condition ? true : false);
```

### What is the difference between `Map` and `WeakMap` in JavaScript?
%% - The `Map` object holds key-value pairs and remembers the original insertion order of the keys. 
- Whereas, the `WeakMap` object is a collection of key/value pairs in which the keys are weakly referenced. 
- You can use any data type as a key or value in a `Map` whereas in `WeakMap` you can only use objects as keys. 
- The `WeakMap` is not iterable whereas `Map` is. 
- In `WeakMap` it holds the weak reference to the original object which means if there are no other references to an object stored in the `WeakMap`, those objects can be garbage collected. %%

--- start-multi-column: Map  
```column-settings  
number of columns: 2  
largest column: same  
```

Map

- The `Map` object holds key-value pairs and remembers the original insertion order of the keys. 
- You can use any data type as a key or value in a `Map` whereas in `WeakMap` you can only use objects as keys. 

--- end-column ---

weakMap

- Whereas, the `WeakMap` object is a collection of key/value pairs in which the keys are weakly referenced. 
- The `WeakMap` is not iterable whereas `Map` is. 
- In `WeakMap` it holds the weak reference to the original object which means if there are no other references to an object stored in the `WeakMap`, those objects can be garbage collected.

--- end-multi-column
### How to use `filter()` method?
You can use the `filter()` method to filter an array based on a condition. The `filter()` method creates a new array with all elements that pass the test implemented by the provided function.

```js
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter((number) => {
  return number % 2 === 0;
});

console.log(numbers); // [1, 2, 3, 4, 5, 6]
console.log(evenNumbers); // [2, 4, 6]
```

### What is Prototype Chain in JavaScript?
The prototype chain in JavaScript refers to the chain of objects linked by their prototypes. When a property or method is accessed on an object, JavaScript first checks the object itself. If it doesn't find it there, it looks up the property or method in the object's prototype. This process continues, moving up the chain from one prototype to the next, until the property or method is found or the end of the chain is reached (typically the prototype of the base object, which is `null`). The prototype chain is fundamental to JavaScript's prototypal inheritance model, allowing objects to inherit properties and methods from other objects.

## Example

```js
const roadmap = {
  getRoadmapUrl() {
    console.log(`https://roadmap.sh/${this.slug}`);
  },
};

const javascript = {
  name: 'JavaScript Roadmap',
  description: 'Learn JavaScript',
  slug: 'javascript',
  greet() {
    console.log(`${this.name} - ${this.description}`);
  },
};

Object.setPrototypeOf(javascript, roadmap); // or javascript.__proto__ = roadmap;

javascript.getRoadmapUrl(); // https://roadmap.sh/javascript
javascript.greet(); // JavaScript Roadmap - Learn JavaScript
```

In the above example, the `javascript` object inherits the `getRoadmapUrl()` method from the `roadmap` object. This is because the `javascript` object's prototype is set to the `roadmap` object using the `Object.setPrototypeOf()` method. In the `javascript` object, the `getRoadmapUrl()` method is not found, so JavaScript looks up the prototype chain and finds the `getRoadmapUrl()` method in the `roadmap` object.

### How to implement your own Custom Event in JavaScript?
You can use the `CustomEvent` constructor to create a custom event. The `CustomEvent` constructor accepts two arguments: the event name and an optional object that specifies the event options. And you can use the `dispatchEvent` method to dispatch the custom event on the target element/document.

## Creating Custom Events

```js
const event = new CustomEvent('roadmap-updated', {
  detail: { name: 'JavaScript' },
});
element.dispatchEvent(event);
```

## Listening for Custom Events

You can listen for custom events using the `addEventListener` method. The `addEventListener` method accepts the event name and a callback function that is called when the event is dispatched.

```js
element.addEventListener('roadmap-updated', (event) => {
  console.log(event.detail); // { name: 'JavaScript' }
});
```

## Removing Event Listeners

You can remove event listeners using the `removeEventListener` method. The `removeEventListener` method accepts the event name and the callback function that was used to add the event listener.

```js
function handleEvent(event) {
  console.log(event.detail); // { name: 'JavaScript' }
}

element.addEventListener('roadmap-updated', handleEvent);
element.removeEventListener('roadmap-updated', handleEvent);
```

### How to accept variable number of arguments in a JavaScript function?
In JavaScript, you can accept a variable number of arguments in a function using the `arguments` object or the rest parameter (`...`).

## Using the `arguments` object:

The `arguments` is an array-like object that holds all of the passed arguments. They are only available inside the function body.

```js
function displayArgs() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
displayArgs(1, 2, 3, 4); // Outputs: 1, 2, 3, 4
```

## Using the rest parameter:

The rest parameter allows you to represent an indefinite number of arguments as an array.

```js
function displayArgs(...args) {
  args.forEach((arg) => console.log(arg));
}
displayArgs(1, 2, 3, 4); // Outputs: 1, 2, 3, 4
```

The rest parameter (`...args` in the example) is generally more modern and flexible, and it provides an actual array, unlike the array-like `arguments` object.

### What is a JavaScript promise?
A Promise in JavaScript represents a value that may not be available yet but will be at some point. Promises provide a way to handle asynchronous operations, offering methods like `.then()` and `.catch()` to register callbacks for success and failure.

### What is the difference between `map()` and `reduce()` methods?
The `map()` method creates a new array with the results of calling a provided function on every element in the calling array. Whereas, the `reduce()` method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

### Difference between `appendChild()` and `insertBefore()`?
You can add a new element to the DOM using the `appendChild` or `insertBefore` method.

## appendChild

The `appendChild` method adds a new element as the last child of the specified parent element.

```js
const roadmapWrapper = document.querySelector('.roadmap-wrapper');

const roadmap = document.createElement('div');
roadmap.id = 'javascript-roadmap';

roadmapWrapper.appendChild(roadmapTitle);
```

In the example above, the `roadmap` element is added as the last child of the `roadmapWrapper` element.

## insertBefore

The `insertBefore` method adds a new element before the specified child element.

```js
const roadmapWrapper = document.querySelector('.roadmap-wrapper');

const roadmap = document.createElement('div');
roadmap.id = 'javascript-roadmap';

const roadmapTitle = document.querySelector('#roadmap-title');
roadmapWrapper.insertBefore(roadmap, roadmapTitle);
```

In the example above, the `roadmap` element is added before the `roadmapTitle` element.

### What is the difference between `map()` and `forEach()` methods?
The `map()` method creates a new array with the results of calling a provided function on every element in the calling array. Whereas, the `forEach()` method executes a provided function once for each array element.

### Is JavaScript a compiled or interpreted language?
JavaScript is an interpreted language. This means that the JavaScript code is not compiled before it is executed. Instead, the JavaScript engine interprets the code at runtime.

### How to run a piece of code only once after a specific time?
To run a piece of code after a certain time, you can use `setTimeout` function in JavaScript. It accepts a function and a time interval in milliseconds. It returns a unique id which you can use to clear the timeout using `clearTimeout` function.

```js
const timeoutId = setTimeout(() => {
  console.log('Hello World');
}, 1000);

// Output:
// Hello World
```

In the above code, the `setTimeout` function runs the callback function after 1000 milliseconds (1 second) and prints `Hello World` to the console. It returns a unique id which you can use to clear the timeout using `clearTimeout` function.

```js
clearTimeout(timeoutId);
```

### Is it possible to run 2 lines of code at the same time in JavaScript?
No, it is not possible to run 2 lines of code at the same time in JavaScript. JavaScript is a single-threaded language, which means that it can only execute one line of code at a time. However, it is possible to run 2 lines of code at the same time using asynchronous code.

### What are Heap and Stack in JavaScript?
The Heap and Stack in JavaScript Engine are two different data structures that store data in different ways.

## Stack

The Stack is a small, organized region of memory. It is where primitive values, function calls, and local variables are stored. It follows a "Last In, First Out" (LIFO) order, meaning that the last item added to the stack is the first one to be removed. Each function invocation creates a new stack frame, which contains the function's local variables, return address, and other contextual data.

## Heap

The Heap is a large, mostly unstructured region of memory. It is where `objects`, `arrays`, and `functions` are stored. Variables from the Stack (e.g., in functions) point to locations in the Heap for these dynamically allocated structures.

When you declare a primitive type (like a number or boolean), it's usually managed in the stack. But when you create an object, array, or function, it's stored in the heap, and the stack will hold a reference to that location in the heap.

For example:

```js
const name = 'JavaScript'; // Stored on the stack
const roadmap = { name: 'JS' }; // `roadmap` reference on the stack, actual object { name: 'JS' } in the heap
```

In the code above, the primitive value `JavaScript` for variable `name` is directly stored on the stack. For the object assigned to `roadmap`, its actual data resides in the heap, and the reference to this data (a memory address pointer) is held on the stack.

### How to scroll to the top of the page using JavaScript?
In order to scroll to the top of the page, we can use the `scrollTo` method.

```js
window.scrollTo(0, 0);
```

### How to remove an Element from DOM?
To remove a DOM element, you can use the `remove` or `removeChild` method of the `Node` interface.

```js
const roadmapWrapper = document.querySelector('.roadmap-wrapper');
const roadmapTitle = document.querySelector('#roadmap-title');

roadmapWrapper.removeChild(roadmapTitle);
roadmapWrapper.remove();
```

### What is Increment operator in JavaScript?
As the name says, the increment operator increases the value of a variable by **1**. There are two types of increment operators: `pre-increment` and `post-increment`.

## Pre-increment

The pre-increment operator increases the value of a variable by 1 and then returns the value. For example:

```js
let x = 1;
console.log(++x); // 2
console.log(x); // 2
```

## Post-increment

The post-increment operator returns the value of a variable and then increases the value by 1. For example:

```js
let x = 1;
console.log(x++); // 1
console.log(x); // 2
```


**Callbacks**: A callback is a function that is passed as an argument to another function and is executed after a certain event has occurred or a task has been completed

**First-Class Functions**: JavaScript treats functions as first-class citizens, which means that functions can be assigned to variables, passed as arguments, and returned from other functions.

**Higher-Order Functions**: A higher-order function is a function that takes one or more functions as arguments, returns a function as its result, or both.


# React Questions

### What is Strict Mode in React and why is it useful?
Strict Mode is a tool in React for highlighting potential problems in an application. By wrapping a component tree with `StrictMode`, React will activate additional checks and warnings for its descendants. This doesn't affect the production build but provides insights during development.

```js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

In Strict Mode, React does a few extra things during development:

1. It renders components twice to catch bugs caused by impure rendering.
2. It runs side-effects (like data fetching) twice to find mistakes in them caused by missing effect cleanup.
3. It checks if deprecated APIs are used, and logs a warning message to the console if so.

### What is JSX?
JSX is a syntax extension to JavaScript and comes with the full power of JavaScript. JSX produces React “elements”. You can embed any JavaScript expression in JSX by wrapping it in curly braces. After compilation, JSX expressions become regular JavaScript objects.

SX, or JavaScript XML, is a syntax extension for JavaScript that is primarily used with React to describe what the UI should look like. It looks similar to HTML and can be mixed with JavaScript, allowing you to write HTML elements in JavaScript and place them in the DOM without needing to use `createElement()` and `appendChild()` methods

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

```

or 

```js
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

```
### What is the purpose of `flushSync` in React?
The `flushSync` function in React is used to flush updates synchronously. It schedules updates to be performed inside a high-priority task, ensuring that the updates are executed immediately and synchronously before returning control to the caller.

```js
import { flushSync } from 'react-dom';

flushSync(callback);
```

This is useful in situations where you need the DOM to be updated immediately, such as for measurements or to ensure synchronous rendering. However, excessive use of `flushSync` can lead to degraded performance, so it should be used judiciously.

```js
import { flushSync } from 'react-dom';

flushSync(() => {
  setSomething(123);
});
// At this point, the DOM has been updated with the new value of `something`.

```

### What is the difference between controlled and uncontrolled components?
A Controlled Component is one that takes its current value through props and notifies changes through callbacks like `onChange`. A parent component "controls" it by handling the callback and managing its own state and passing the new values as props to the controlled component. You could also call this a "dumb component".

A Uncontrolled Component is one that stores its own state internally, and you query the DOM using a `ref` to find its current value when you need it. This is a bit more like traditional HTML.

Most native React form components support both controlled and uncontrolled usage:

```jsx
// Controlled:
<input type="text" value={value} onChange={handleChange} />

// Uncontrolled:
<input type="text" defaultValue="foo" ref={inputRef} />
// Use `inputRef.current.value` to read the current value of <input>
```

### Custom vs Higher Order Component
[Custom Hooks] allow you to extract component logic into reusable functions, which can then be shared across multiple components

[Higher Order Component] are functions that take a component and return a new component with additional props or behavior

### What's the component's lifecycle in React?
In React functional components, lifecycle-like behaviors are achieved using hooks:

## Mounting and Unmounting

Utilizing the useEffect hook with an empty dependency array ([]) ensures the hook runs after the component mounts to the DOM.

```js
useEffect(() => {
  // do something after component mounts
  return () => {
    // do something before component unmounts
  };
}, []);
```

The cleanup function returned within the useEffect callback offers a mechanism for handling tasks when the component is about to **unmount**.

## Updates

The useEffect hook, when invoked without a dependency array or with specific dependencies, executes after every render or when specified prop/state changes are detected.

```js
useEffect(() => {
  // do something after every render
});
```

```js
useEffect(() => {
  // do something after specific prop/state changes
}, [state1, state2]);
```


### What is the purpose of the `useEffect` hook in React?
he useEffect hook in React is used for performing side effects in functional components. Side effects can include data fetching, DOM manipulation, and subscribing to external data sources.

### How do Server Components differ from Client Components?
- **Server Components**: Server Components are executed on the server side.
- **Client Components**: Client Components are executed on the client side (browser)
Server Components are rendered on the server and do not require client-side JavaScript for rendering. While Server Components and Client components can coexist in the same app, Server Components can import and render Client components.

### Why you shouldn't use `index` as a key in React lists and iterators?
Using `index` as a key can negatively impact performance and may cause issues with the component state. When the list items change due to additions, deletions, or reordering, using indexes can lead to unnecessary re-renders or even incorrect UI updates. React uses keys to identify elements in the list, and if the key is just an index, it might reuse component instances and state inappropriately. Especially in cases where the list is dynamic or items can be reordered, it's recommended to use unique and stable identifiers as keys to ensure consistent behavior.

### What is the `useTransition` hook?
`useTransition` hook allows you to mark certain updates as **transitions** so they can be deprioritized, allowing other, more urgent updates to be processed first. This ensures that the UI remains responsive during updates that might take some time.

```js
import { useTransition, useState } from 'react';
import { Posts } from './Posts';
import { Home } from './Home';
import { Contact } from './Contact';

export function App() {
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState('home');

  function changePage(newPage: string) {
    startTransition(() => {
      setPage(newPage);
    });
  }

  return (
    <>
      <button onClick={() => changePage('home')}>Home</button>
      <button onClick={() => changePage('posts')}>Posts</button>
      <button onClick={() => changePage('contact')}>Contact</button>
      <hr />
      {isPending && <div>Loading...</div>}
      {page === 'home' && <Home />}
      {page === 'posts' && <Posts />}
      {page === 'contact' && <Contact />}
    </>
  );
}
```

```js
export function Home() {
  return <div>Home</div>;
}
```

```js
export function Contact() {
  return <div>Contact</div>;
}
```

Posts component is artificially delayed by 500ms to emulate extremely slow code.

```js
export function Posts() {
  const items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} />);
  }
  return <ul>{items}</ul>;
}

function SlowPost() {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li>Post</li>;
}
```

Now when you click on the `Posts` button, you'll notice that the UI remains responsive and you can still switch to other pages while the posts are loading. Try removing the `startTransition` wrapper around `setPage` in `changePage` to see the difference.

### What is the difference between Real DOM and Virtual DOM?
Virtual DOM is the representation of a UI in the form of a plain javascript object. It is a node tree that lists the elements, their attributes and content as Objects and their properties. Real DOM is the real representation of a UI which can be seen and inspected in the browser. Manipulating the virtual DOM is much faster than real DOM, because nothing gets drawn on the screen. React uses this virtual DOM to figure out the most efficient way to update the browser DOM.

### What is the difference between class components and function components?
Class components let you define your components with the help of classes. You can extend from `React.Component` class to create a component. Class components also allow you to define component level lifecycle methods. Function components are defined by writing a function which returns a React element. Functional components are the preferred way to write React components. There are no lifecycle methods similar to class components available in functional components; you can use React hooks instead to manage the component lifecycle.

### What is the purpose of the `useContext` hook in React?
The useContext hook is used to access and consume context values in functional components. It provides a way to access context data without the need for a context consumer. useContext is particularly useful when you want to access context values in nested components without having to pass props through intermediate components.