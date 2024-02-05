
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