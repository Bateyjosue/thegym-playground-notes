

Abstract thinking

It is interesting that the most effective way we’ve found to communicate with a computer borrows so heavily from the way we communicate with each other

Keeping programs under control is the main problem of programming

The art of programming is the skill of controlling complexity.

A sense of what a good program looks like is developed in practice, not learned from a list of rules.


## 12.04 - Writing

"A computer is an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program"

for two people to communicate they should speak a language they both understand, as for  the computer being an electronic devise it's can understand only binary which is a different language from human being that where programming comes in whereby we can communicate with the computer using human like language which will be translated to computer language and the programming languages are build with rules which must be comply with for us to be understood by the computer as they cannot be understand ambiguous instruction mean instruction should be simple and precise.

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
