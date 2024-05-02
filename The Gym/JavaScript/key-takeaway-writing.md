

Abstract thinking

It is interesting that the most effective way we’ve found to communicate with a computer borrows so heavily from the way we communicate with each other

Keeping programs under control is the main problem of programming

The art of programming is the skill of controlling complexity.

A sense of what a good program looks like is developed in practice, not learned from a list of rules.


## 12.04 - Writing

"A computer is an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program"

for two people to communicate they should speak a language they both understand, as for  the computer being an electronic devise it's can understand only binary which is a different language from human being that where programming comes in whereby we can communicate with the computer using hum
an like language which will be translated to computer language and the programming languages are build with rules which must be comply with for us to be understood by the computer as they cannot be understand ambiguous instruction mean instruction should be simple and precise.

## 12.05

#### Point

- require much cleverness and disciple to write simple program
- in JavaScript in the modern web brownser
### Summery

In early year writing a computer program require the programmer to have much cleverness and disciple to just write a simple program, and back only computer science and mathematician could write computer programs but in early 90s high level programing language started to emerge whereby the JavaScript right as the Java of the web due to the popularity of the Java programming language were create to operate in web application. and this was a game changing in the tech industry because it was providing various interactivity in websites.

compare to early years where people was writing long line of code full of 0s and 1s just to write a simple program to add two numbers. now they can write something near to the normal human language which high level, so the programming language itself will be in charge of Transpiling the codes in machine language

## 12.06

#### Point

- code
- value represent the chunks of information to stored, in the ocean of bits
- the value will be dissipate if no longer in use
- value can be represented in different form such number, string and/or boolean. etc
- but all the value are being transform into bits
- and this bits are merely grouped to be well managed, 8. 16 or 64 bits
- value of form number are mostly use to perform an artimetic operation, while strings are to represent text, boolean are used for comparison as there is only 2 possibility to represent them on or off. yes or no, 1 or 0
### Summary

Code: "a system of words, letters, figures, or symbols used to represent others, especially for the purposes of [secrecy](https://www.google.com/search?sca_esv=588287231&sxsrf=AM9HkKlG-hhCqKzr713MrtSyOvy1ss4Hew:1701851523956&q=secrecy&si=ALGXSlZCBshTM3a3nPTSW0d1OmQeC2KrdTS-3PxRNqM_WsSz7aCQuY5G9Vzag3VIetY3EscUF0mFG34l2bqfS7Da8_5sLfvP-A%3D%3D&expnd=1)."

codes are program instructions, which we write to instruct the computer on the task they have to perform for use. now computer have the ability to store data in form of bit so while writing the instructions we have to define which kind of data we are going to store by giving it a set of value. value represent the chunks of information stored in the ocean of bits and it will be dissipate if not in use.
value can be represented in different form such number, string and Boolean, whereby number are being used for performing arithmetical operations such us addition, multiplication, etc. string are used to represent text and Boolean is used most of time for comparison as it has only two possibilities 1 or yes or on and 0 or no or off.

in Javascript they have introduced a techinic to convert automatically a type of data when performing an operation on two different values such number and string

eg:
```js
	console.log("2" + 2)
```

will output "22" instead of 4, and this technic is know as type coercion whereby it will convert the second operand to a string and perform a concatenation instead of an addition

## 12.07
___

#### Point

- short circuit
- expression
- statement
- 

#### Summary

a variable is a space in the memory which is serve to hold our value in the life cycle of our app. it's also called binding in some context. it uses the expression to produce values from a fragment of code and then bind them for the later use. a statement is a line of code performing a certain task such as:

```js
1 let age =  30
2 let isMinor = age < 18 ? true : false  
```

**on line 2.** we can see that the statement is checking for the user age and assumpt that he is minor or not  whereby ` age < 18 ? true : false  ` is an expression to check out the user age

so now our variable `isMinor` now can be use in different expression as well as later can be assigned a new value.

defining a variable without a value end up having an value of `undefined` and to define there are set of rules called naming convention which must be applied in order to conform to those rules such as don't use reserve language keyword to define your bindings, keyword like class, delete, etc. another convention is lo always start with alphabet while defining a name to your bindings, etc

## 12.11
#### Points
- 
#### Summary
In JavaScript, functions encapsulate pieces of code and are executed when called. For example, the `prompt` function in browsers displays a dialog box, requesting user input:
`prompt("Enter passcode");`

Another common function, `console.log`, outputs values to the console. Here, it displays the value of a variable `x`:

```js
let x = 30; 
console.log("the value of x is", x); // → the value of x is 30
```

Functions can either have side effects, like displaying messages, or produce return values. The `Math.max` function, for instance, returns the maximum value from given arguments:

```js
console.log(Math.max(2, 4)); // → 4
```

Similarly, `Math.min` returns the minimum, and its value can be part of a larger expression:

```js
console.log(Math.min(2, 4) + 100); // → 102
```


## 12.13

Control flow in programming, starting with the execution of statements from top to bottom. **Conditional execution** is introduced using the `if` keyword, allowing the program to make decisions based on certain conditions. The use of the `else` keyword and the chaining of multiple `if/else` pairs are also explained for handling various scenarios.

**Loops** such as `while` and `do,` are introduced for repetitive tasks. The concept of updating variables within loops is highlighted, showcasing the shorthand notation like ``+=`` for concise code. The `for` loop is presented as a shorter and clearer alternative for common looping patterns.

 the `break` statement to exit loops and the `continue` keyword to jump to the next iteration. The `switch` statement is introduced for a more direct way of expressing conditional branching

Indentation is emphasized for code readability, and the importance of comments.
Two ways of writing comments in JavaScript, using ``//`` for single-line comments and ``/* */ `` for multiline comments.

## 12.14

**Function in JavaScript**
are essential for structuring program by reducing repetition, and creating a clear vocabulary. as  _Donald Knuth_ emphasizes that computer science is not just the work of genius but a collaborative effort of many individuals building upon each other's work.

**Function Definition: **
A function is defined using the function keyword and can have parameters and a body containing executable statements
```js
const square = function(x) {
  return x * x;
};
console.log(square(12)); // Outputs: 144

```

**Scopes and Bindings:**
- Bindings have a scope, and there are global and local bindings.
- Global bindings can be accessed throughout the program, while local bindings are limited to the function or block where they are defined.

```js
let x = 10;
if (true) {
  let y = 20;
  var z = 30;
  console.log(x + y + z); // Outputs: 60
}
console.log(x + z); // Outputs: 40

```

**Nested Scope:**
JavaScript supports nested scopes, allowing functions and blocks to be created inside others, resulting in multiple degrees of locality.

```js
const shopping= function(factor) {
  const product= function(amount, unit, name) {
    // Function body
  };
  // Function body
};
```

By understanding functions, scopes, and their applications, we can write now modular, readable, and efficient JavaScript code

___
## 12/18

**data sets:**
a data set typically refers to a collection of data organized in a specific structure or format
**array**:
data structure that allows you to store and organize multiple values in a single variable

**Properties**
almost all javascript values have a properties except null and undefined because if you want to access property using the dot notation you end up getting an error `TypeError: null has no properties`
> there are two way of accessing a properties in JavaScript as aforementioned above the got notation and the square brackets notation
```js
value.lenght 
// or
value['length']

```

The key distinction lies in how the value of `length` is interpreted. When using a dot, the word immediately following the dot is treated as the literal name of the property

On the other hand, when using square brackets, the expression within the brackets is evaluated to obtain the property name

**Method:**
methods is a function that is associate with an object it. it is a property of an object that. 
**Object:** 
In JavaScript, objects are collections of properties, and they can be created using braces `{}`. Each property within the braces has a name followed by a colon and a value. Objects can store various data types and are useful for organizing related information. Properties can be accessed using dot notation, and values can be assigned or deleted. Objects can be thought of as octopuses with multiple tentacles, each labeled with a unique name. The `Object.keys` function retrieves an array of property names from an object. Additionally, the `Object.assign` function copies properties from one object to another. Arrays, a specialized type of object, are designed for storing sequences of data. The provided example demonstrates representing daily log entries as an array of objects, where each object contains information about activities and whether Jacques turned into a squirrel on that day.

___
## 12/19

**mutability**

refers to the ability of objects to be modified, allowing changes to their properties over time. 

**immutable**

types like numbers, strings, and Booleans, where the values cannot be changed once they are created

```js
let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };

console.log(object1 == object2); // output true
console.log(object1 == object3); // output false

object1.value = 15;
console.log(object2.value); // output 15
console.log(object3.value); // output 10

```

variables in JavaScript can be either changeable (created using `let`) or constant (created using `const`). The mutability of the value itself is separate from whether the binding can be reassigned. Even if a binding is declared with `const` and cannot be reassigned to a different object, the properties of the object it points to may still be modified

```js
const score = { visitors: 0, home: 0 };
score.visitors = 1; 
// score = { visitors: 1, home: 1 }; // This is not allowed

console.log(score.visitors); // 1

```

___
## 12/20

**Rest parameters**

allow a function to accept any number of arguments by using the three dots (`...`) notation in the  the function parameter list. mostly should be the last in the list

This parameter, known as the rest parameter, is then bound to an array containing all the additional arguments passed to the function. 
If there are other parameters before the rest parameter, their values are not part of the array. 

### Example

```js
function max(...numbers) {   
	let result = -Infinity;   
	for (let number of numbers) {     
		if (number > result) result = number;   
	}   
	return result; 
}  

console.log(max(4, 1, 9, -2)); // Output: 9  
let numbers = [5, 1, 7]; 
console.log(max(...numbers)); // Output: 7  let words = ["never", "fully"]; console.log(["will", ...words, "understand"]); // Output: ["will", "never", "fully", "understand"]
```

One practical example is demonstrated in the `max` function, which computes the maximum value among the given arguments. The rest parameter (`...numbers`) collects all the arguments into an array, making it flexible to handle varying numbers of inputs. Additionally, the same three-dot notation can be used to spread out an array of values into individual arguments when calling a function. This is showcased in the example where the `max` function is called with an array of numbers. 
The triple-dot operator can be used in square bracket array notation to spread the elements of an array into a new array, enabling concise array concatenation

___
## 12/21

In JavaScript, destructuring is a concise way to extract values from arrays or objects. For instance, consider the phi function, which is initially awkward with array indexing. Destructuring provides a cleaner alternative, allowing direct assignment of array elements to named variables. For example, instead of referencing `table[0]`, you can use `let n00 = table[0]`. This approach enhances readability and simplifies the code. The same concept extends to objects, where you can destructure properties using braces. For instance, `{name}` extracts the value associated with the "name" property from an object. It's important to note that attempting to destructure null or undefined values results in an error. An example of object destructuring is demonstrated with `{name: "Faraji", age: 23}`, where `name` is assigned the value "Faraji.

```js
// Original array-based function
function calculateAverage([num1, num2, num3]) {
  return (num1 + num2 + num3) / 3;
}

// Destructured version with named variables
function calculateAverage({ a, b, c }) {
  return (a + b + c) / 3;
}

// Example of array destructuring
let numbers = [10, 20, 30];
console.log(calculateAverage(numbers));
// → 20

// Example of object destructuring
let values = { a: 5, b: 15, c: 25 };
console.log(calculateAverage(values));
// → 15

```

## 01/08/2024

In the provided text, the concept of higher-order functions is explored, emphasizing the importance of abstraction in programming. The text introduces the idea that larger programs are often more error-prone due to increased complexity, and it suggests that expressing solutions in a higher-level vocabulary corresponding to the problem domain can lead to more reliable and concise code. Abstractions, such as functions that operate on other functions (higher-order functions), are discussed as tools to simplify and clarify code by hiding implementation details.



In summary, the text emphasizes the significance of abstraction in programming, introduces higher-order functions as a powerful tool for abstraction, and provides practical examples to illustrate their benefits in code clarity and data processing


#### Corrected one

### Higher Order Functions

 
**Higher-order functions** involve the capability to treat functions like any other variable, enabling them to be used as arguments or returned as outcomes.

**Abstraction** in programming refers to the practice of hiding complex details of how something works by presenting a simpler and more understandable interface.

The narrative begins by establishing that larger programs tend to be error-prone due to increased complexity. To address this challenge, the text advocates for expressing solutions in a higher-level vocabulary aligned with the problem domain. This approach fosters reliability and conciseness in code. An exemplary higher-order function, namely the "repeat" function, is introduced as a mechanism to abstract the concept of performing an action a specific number of times.

Furthermore, the text introduces prominent higher-order functions like filter, map, and reduce, emphasizing their role in simplifying and clarifying code that operates on arrays. Practical examples are provided to underscore how these functions enhance both code readability and maintainability. Additionally, the narrative explores the application of higher-order functions in the realm of data processing, specifically in filtering and mapping arrays of script data.

In essence, the text underscores the paramount importance of abstraction in programming, introduces higher-order functions as pivotal tools for achieving abstraction, and elucidates their practical benefits through examples that illustrate enhanced code clarity and streamlined data processing.

### Higher Order Functions

 
**Higher-order functions** involve the capability to treat functions like any other variable, enabling them to be used as arguments or returned as outcomes.

**Abstraction** in programming refers to the practice of hiding complex details of how something works by presenting a simpler and more understandable interface.

**Higher-Order Functions:**

The idea of higher-order functions, as shown in the text, is very important in programming. 
These functions can treat other functions as main elements, allowing them to be shared as details or results. Essentially, higher-order functions create a way to deal with actions, not just values.  functions like filter, map, and reduce, which work on arrays and are important for making code simpler and clearer. 
By using higher-order functions, developers can make more flexible, reusable, and expressive code. This makes it easier to break down complex actions into smaller parts.

**Abstraction:**

Abstraction in programming is about hiding complex details behind simpler, more expressive surfaces.  abstraction using functions to build a vocabulary that matches the problem. 
For example, the `sum` and `range` functions are introduced as abstractions to express the idea of adding a range of numbers. 
This makes the code easier to read and focused on higher-level ideas. 
Abstractions help developers work at a higher or more abstract level, dealing with simpler, conceptual ideas instead of getting stuck in detailed technicalities. 
This leads to code that is not only easier to understand but also easier to keep up-to-date and adjust, making the programming process more effective.

#  The Secret Life of Objects
So objects do more than just hold their own properties. They have prototypes, which are other objects. They’ll act as if they have properties they don’t have as long as their prototype has that property. Simple objects have `Object.prototype` as their prototype.

1. Constructors, which are functions whose names usually start with a capital letter, can be used with the `new` operator to create new objects. The new object’s prototype will be the object found in the `prototype` property of the constructor. You can make good use of this by putting the properties that all values of a given type share into their prototype. There’s a `class` notation that provides a clear way to define a constructor and its prototype.

	You can define getters and setters to secretly call methods every time an object’s property is accessed. Static methods are methods stored in a class’s constructor, rather than its prototype.

2. The `instanceof` operator can, given an object and a constructor, tell you whether that object is an instance of that constructor.

3. One useful thing to do with objects is to specify an interface for them and tell everybody that they are supposed to talk to your object only through that interface. The rest of the details that make up your object are now _encapsulated_, hidden behind the interface.

	More than one type may implement the same interface. Code written to use an interface automatically knows how to work with any number of different objects that provide the interface. This is called _polymorphism_.

> When implementing multiple classes that differ in only some details, it can be helpful to write the new classes as _subclasses_ of an existing class, _inheriting_ part of its behavior.

## 01/12

## 01/15

### Regular expression

Regular expressions are a way to describe patterns in string data. They form a small, separate language that is part of JavaScript and many other languages and systems

- A regular expression has a method `test` to test whether a given string matches it. It also has a method `exec` that, when a match is found, returns an array containing all matched groups. Such an array has an `index` property that indicates where the match started.

- Strings have a `match` method to match them against a regular expression and a `search` method to search for one, returning only the starting position of the match. Their `replace` method can replace matches of a pattern with a replacement string or function.

- Regular expressions can have options, which are written after the closing slash. The `i` option makes the match case insensitive. The `g` option makes the expression _global_, which, among other things, causes the `replace` method to replace all instances instead of just the first. The `y` option makes it sticky, which means that it will not search ahead and skip part of the string when looking for a match. The `u` option turns on Unicode mode, which fixes a number of problems around the handling of characters that take up two code units.
- Regular expressions are a sharp tool with an awkward handle. They simplify some tasks tremendously but can quickly become unmanageable when applied to complex problems. Part of knowing how to use them is resisting the urge to try to shoehorn things that they cannot cleanly express into them.

## 01/17

# Modules in JavaScript
A module is a piece of program that specifies which other pieces it relies on and which functionality it provides for other modules to use

- Modules provide structure to bigger programs by separating the code into pieces with clear interfaces and dependencies. The interface is the part of the module that’s visible from other modules, and the dependencies are the other modules that it makes use of.

- Because JavaScript historically did not provide a module system, the CommonJS system was built on top of it. Then at some point it _did_ get a built-in system, which now coexists uneasily with the CommonJS system.

- A package is a chunk of code that can be distributed on its own. NPM is a repository of JavaScript packages. You can download all kinds of useful (and useless) packages from it.

## 1/19

```js
function recursiveSum(arr, index = 0) { // Base case: if the index is equal to the array length, return 0 
	if (index === arr.length) { 
		return 0; 
	} else { // Recursive case: sum the current element with the sum of the rest of the array 
		return arr[index] + recursiveSum(arr, index + 1); 
	} 
} // Example usage: const numbers = [1, 2, 3, 4, 5]; console.log(recursiveSum(numbers)); // Output: 15
```

In this example:

1. The base case checks if the current `index` is equal to the length of the array. If true, it returns `0`.
    
2. If the base case is not met, the function enters the recursive case. It calculates the sum by adding the current element at the given index with the sum of the rest of the array (starting from the next index).
    
3. The recursion continues until the base case is reached, and the function starts returning values back up the chain of recursive calls.
    

In the example usage, `recursiveSum(numbers)` calls the recursive function, and the calculation unfolds as follows:

```js
recursiveSum([1, 2, 3, 4, 5], 0) 
= 1 + recursiveSum([2, 3, 4, 5], 1)                                 
= 1 + (2 + recursiveSum([3, 4, 5], 2))               
= 1 + (2 + (3 + recursiveSum([4, 5], 3)))                                 
= 1 + (2 + (3 + (4 + recursiveSum([5], 4))))                                 
= 1 + (2 + (3 + (4 + (5 + recursiveSum([], 5)))))                                 
= 1 + (2 + (3 + (4 + (5 + 0))))                                 
= 15

```

So, the result is `15`, which is the sum of the elements in the array `[1, 2, 3, 4, 5]`. Recursive functions can be a flexible and elegant way to solve certain problems by breaking them down into simpler sub-problems.

## 1/23

# Asynchronous Programming

Imagine you're at a restaurant. You order food (this is like starting a long-running action). 
While you wait for your food to cook, you don't just sit there doing nothing. 
Instead, you can do other things - pay the bill, chat with friends, etc. 

This is similar to how asynchronous programming works. It allows your program to continue running other tasks while waiting for a long-running action to complete.

In JavaScript, this is achieved using callbacks, promises, and async/await syntax. Here's a simple example:

```js
// Callback console.log('Start'); 
setTimeout(function() {     
	console.log('Hello, World!'); 
}, 2000); 

console.log('End');
```


In this example, `setTimeout` is a function that waits for 2 seconds before executing its callback function. The 'Start' and 'End' messages will be printed immediately, while 'Hello, World!' will be printed after 2 seconds.

Promises and async/await are used to handle multiple asynchronous operations more easily. Here's an example using Promises:

```js
let promise = new Promise((resolve, reject) => {     
	setTimeout(() => resolve("done"), 1000) 
}); 

promise.then(result => console.log(result)); // "done"
```


And here's an example using async/await:

```js
async function myFunction() {     
	let response = await fetch('https://api.example.com/data');     
	let data = await response.json();     
	console.log(data); 
}

myFunction();
```


In this example, `fetch` is a function that returns a Promise. We use the `await` keyword to pause the execution of `myFunction` until the Promise resolves, then we log the result.

## 1/24

# The Document Object Model

JavaScript programs can interact with the document that a browser is displaying through a data structure called the Document Object Model (DOM). 
This data structure represents the browser’s model of the document, and a JavaScript program can modify it to change the visible document. 
The DOM is organized like a tree, with elements arranged hierarchically according to the structure of the document. The objects representing elements have properties such as parentNode and childNodes, which can be used to navigate through this tree. 
The way a document is displayed can be influenced by styling, both by attaching styles to nodes directly and by defining rules that match certain nodes. 
There are many different style properties, such as color or display. JavaScript code can manipulate an element’s style directly through its style property.

**Example 1 - Changing Text Content:**

Suppose we have the following HTML document:

```html
<!DOCTYPE html> 
<html> 
	<body> 
		<h1 id="myHeading">Hello World</h1> 
		<p id="myParagraph">Click the "Change Text" button to change the text of the first h1 element (index 0).</p> 
		<button onclick="changeText()">Change Text</button> 
		<script> 
			function changeText() {  
				document.getElementById("myHeading").innerHTML = "Hello JavaScript"; 
			} 
		</script> 
	</body> 
</html>
```


In this example, we have a heading and a paragraph. We also have a button that, when clicked, calls the `changeText()` function. This function changes the inner HTML of the heading with the id "myHeading".

**Example 2 - Changing Element Style:**

```html
<!DOCTYPE html> 
<html> 
	<body> 
		<h1 id="myHeading">Hello World</h1> 
		<button onclick="changeStyle()">Change Style</button> 
		<script> 
			function changeStyle() {  
				document.getElementById("myHeading").style.color = "blue"; 
			} 
		</script> 
	</body> 
</html>
```


In this example, we have a heading and a button. When the button is clicked, it calls the `changeStyle()` function. This function changes the color of the text in the heading with the id "myHeading" to blue.

## 1/25

# Handling Events
The `addEventListener` method is used to register these handlers. Each event has a type, such as "keydown", "focus", etc., that identifies it. Most events are triggered on a specific DOM element and then propagate to that element's ancestors, allowing handlers associated with those elements to handle them.

When an event handler is invoked, it receives an event object that provides additional information about the event. This object also includes methods to stop further propagation (`stopPropagation`) and prevent the browser's default handling of the event (`preventDefault`).

Key presses trigger "keydown" and "keyup" events, mouse clicks fire "mousedown", "mouseup", and "click" events, mouse movements cause "mousemove" events, and touchscreen interactions result in "touchstart", "touchmove", and "touchend" events. Scrolling can be detected with the "scroll" event, and focus changes can be detected with the "focus" and "blur" events. When the document finishes loading, a "load" event fires on the window.

**Example:**

Let's say we have a button on our webpage and we want to perform an action when the button is clicked. Here's how we can do it using an event handler:

```html
<!DOCTYPE html> <html> <body> <button id="myButton">Click me</button> <script> document.getElementById("myButton").addEventListener("click", function() {  alert("Button clicked!"); }); </script> </body> </html>
```

In this example, we have a button with the id "myButton". We add an event listener to this button that listens for the "click" event. When the button is clicked, the event handler function is called, which displays an alert saying "Button clicked!".

## 1/29

# Drawing on Canvas

A canvas node represents an area in a document that a program can draw on. Drawing is done through a drawing context object, created with the `getContext` method.

The 2D drawing interface allows filling and stroking various shapes. The context’s `fillStyle` property determines how shapes are filled. The `strokeStyle` and `lineWidth` properties control the way lines are drawn. Rectangles and text can be drawn with a single method call. The `fillRect` and `strokeRect` methods draw rectangles, and the `fillText` and `strokeText` methods draw text. Custom shapes can be created by building up a path using the `beginPath` method and other methods that add lines and curves to the current path.

The `drawImage` method is used to move pixels from an image or another canvas onto the canvas. By default, this method draws the whole source image, but by providing more parameters, a specific area of the image can be copied.

Transformations allow shapes to be drawn in multiple orientations. A 2D drawing context has a current transformation that can be changed with the `translate`, `scale`, and `rotate` methods. These transformations will affect all subsequent drawing operations. A transformation state can be saved with the `save` method and restored with the `restore` method.

When showing an animation on a canvas, the `clearRect` method can be used to clear part of the canvas before redrawing it

**Example 1 - Drawing Shapes and Text:**
```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Fill a rectangle
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// Stroke a rectangle
ctx.strokeStyle = 'black';
ctx.strokeRect(50, 50, 100, 100);

// Draw text
ctx.font = '30px Arial';
ctx.fillStyle = 'green';
ctx.fillText('Hello World', 10, 50);

```
> In this example, we first get a reference to the canvas and its drawing context. We then fill a rectangle with red color, stroke a rectangle with black color, and draw some text on the canvas.

**Example 2 - Creating a Path and Drawing Custom Shapes:**
```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
ctx.moveTo(110, 75);
ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
ctx.moveTo(65, 65);
ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
ctx.moveTo(95, 65);
ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
ctx.stroke();

```
> In this example, we create a path for a face with eyes and a mouth. We use the `arc` method to draw circles for the face and eyes, and the `moveTo` and `arc` methods to draw the mouth. Finally, we use the `stroke` method to draw the path.


## 1/30

# Nodejs

Node.js, a small system that allows JavaScript to run outside of a browser. Originally designed for network tasks, Node.js is versatile and can be used for various scripting tasks. It's particularly useful if you enjoy writing JavaScript and want to automate tasks.

NPM (Node Package Manager) provides packages for a wide range of functionalities. You can fetch and install these packages using the npm program. Node.js comes with several built-in modules, such as the `fs` module for file system operations and the `http` module for running HTTP servers and making HTTP requests.

In Node.js, all input and output operations are performed asynchronously, unless you specifically use a synchronous variant of a function, like `readFileSync`. When you call asynchronous functions, you provide callback functions. Node.js will call these callbacks with an error value and a result (if available) when it's ready.

**Example 1 - Using Built-in Modules:**
Node.js comes with several built-in modules. Here's an example of using the `fs` module to read a file:
```js
const fs = require('fs');

fs.readFile('example.txt', 'utf8', function(err, data){
    if (err) throw err;
    console.log(data);
});

```
> In this example, we first import the `fs` module. We then use the `readFile` method to read the contents of `example.txt`. This method is asynchronous and takes a callback function that is called when the file has been read.


**Example 2 - Using Callback Functions:**
Callback functions are used extensively in Node.js for handling asynchronous operations. Here's an example of using a callback function with the `http` module to create a simple HTTP server:
```js
const http = require('http');

const server = http.createServer(function (req, res) {
    res.write('Hello World!');
    res.end();
});

server.listen(8080);

```
> In this example, we first import the `http` module. We then create a server using the `createServer` method. This method takes a callback function that is called whenever a request is received. Inside the callback function, we write a response to the client and end the response. Finally, we tell the server to listen on port 8080.

**Example 3 - Using Promises:**
While Node.js primarily uses callbacks for handling asynchronous operations, you can also use Promises for a more modern and readable approach. Here's an example of using a Promise with the `fs` module to read a file:
```js
const fs = require('fs').promises;

fs.readFile('example.txt', 'utf8')
    .then(data => console.log(data))
    .catch(err => console.error(err));

```
> In this example, we first import the `fs` module and use the `promises` property to get a version of the module that returns Promises. We then use the `readFile` method to read the contents of `example.txt`. This method returns a Promise that resolves with the file contents. We use the `then` method to handle the resolved value and the `catch` method to handle any errors

**Example 3 - Using Promises:**  
While Node.js primarily uses callbacks for handling asynchronous operations, you can also use Promises for a more modern and readable approach. Here's an example of using a Promise with the `fs` module to read a file:

```js
const fs = require('fs').promises;

fs.readFile('example.txt', 'utf8')
    .then(data => console.log(data))
    .catch(err => console.error(err));

```

> In this example, we first import the `fs` module and use the `promises` property to get a version of the module that returns Promises. We then use the `readFile` method to read the contents of `example.txt`. This method returns a Promise that resolves with the file contents. We use the `then` method to handle the resolved

**Example 3 - Using Promises:**  
While Node.js primarily uses callbacks for handling asynchronous operations, you can also use Promises for a more modern and readable approach. Here's an example of using a Promise with the `fs` module to read a file:

```js
const fs = require('fs').promises;

fs.readFile('example.txt', 'utf8')
    .then(data => console.log(data))
    .catch(err => console.error(err));

```

> In this example, we first import the `fs` module and use the `promises` property to get a version of the module that returns Promises. We then use the `readFile` method to read the contents of `example.txt`. This method returns a Promise that resolves with the file contents. We use the `then` method to handle the resolved