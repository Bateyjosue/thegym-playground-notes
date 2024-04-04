### Arrow function

is a compact alternative to a traditional [function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function).

1. Don’t have their own [bindings](https://developer.mozilla.org/en-US/docs/Glossary/Binding) to `[this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)`, `[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)`, or `[super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)`, and should not be used as [methods](https://developer.mozilla.org/en-US/docs/Glossary/Method).
2. Cannot be used as **constructors**. calling them with `new` throws a `TypeError`
3. cannot use `yield` within their body and cannot be created as generator functions

Syntax

Tradition Function Expression

```jsx
// function expression
let x = function(x, y) {
   return x * y;
}
```

Arrow Function Expression

```jsx
// using arrow functions
let x = (x, y) => x * y
```

### Things To Avoid with Arrow functions

1. You should not use arrow functions to create methods inside objects
2. You cannot use an arrow function as a constructor

**links**

[Arrow function expressions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

[JavaScript Arrow Function](https://www.programiz.com/javascript/arrow-function)

### Template Literals

are literals delimited with backtick "\`" characters allowing for multi-lines strings, sting, interpolation with embedded expressions and special constructor called tagged templates. there are sometimes informally called **template strings**

```jsx
`string text`

`string text line 1
 string text line 2`

`string text ${expression} string text`

```

### Tagged templates

allow you to parse template literals with a function.  

```jsx
const person = "Mike";
const age = 28;

function myTag(strings, personExp, ageExp) {
  const str0 = strings[0]; // "That "
  const str1 = strings[1]; // " is a "
  const str2 = strings[2]; // "."

  const ageStr = ageExp > 99 ? "centenarian" : "youngster";

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

const output = myTag`That ${person} is a ${age}.`;

console.log(output);
// That Mike is a youngster.
```

[https://youtu.be/4oVJVglLLns](https://youtu.be/4oVJVglLLns)

### Destructuring

js expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

```jsx
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// Expected output: 10

console.log(b);
// Expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// Expected output: Array [30, 40, 50]
```

### Binding and assignment

for both object and array destructuring, there are two kinds of destructuring patterns

1. **Binding pattern**
    
    the pattern starts with a declaration keyword (var, let or const)
    
    ```jsx
    const obj = { a: 1, b: { c: 2 } };
    const { a, b: { c: d },} = obj;
    // Two variables are bound: `a` and `d`
    ```
    
2. **Assignment pattern**
    
    in assignment patterns, the pattern does not start with a keyword, Each destructured property is assigned to a target of assignment. In general, anything that can appear on the left-hand side of  an assignment expression
    
    ```jsx
    const numbers = [];
    const obj = { a: 1, b: 2 };
    ({ a: numbers[0], b: numbers[1] } = obj);
    // The properties `a` and `b` are assigned to properties of `numbers`
    ```
    
    ⚠️:  The parentheses `( ... )` around the assignment statement are required when using object literal destructuring assignment without a declaration.
    

### Default Value

the default value is used when the property is not present, or has value undefined. It is not used if the property has value null

```jsx
const [a = 1] = []; // a is 1
const { b = 2 } = { b: undefined }; // b is 2
const { c = 2 } = { c: null }; // c is null
```

### Rest property

This pattern will store all remaining properties of the object or array into a new object or array.

```jsx
const { a, ...others } = { a: 1, b: 2, c: 3 };
console.log(others); // { b: 2, c: 3 }

const [first, ...others2] = [1, 2, 3];
console.log(others2); // [2, 3]
```

⚠️: Always consider using rest operator as the last element

```jsx
const [a, ...b,] = [1, 2, 3];

// SyntaxError: rest element may not have a trailing comma
```

## Links

### Articles:

[Why I Find JavaScript’s Destructuring So Useful](https://betterprogramming.pub/why-i-find-javascripts-destructuring-so-useful-7be41d9ba609)

### Arroy.from

A static method creates a new shallow-copied Array instance from an iterable or array-like object.

syntax

Array.from(arrayLike)

Array.from(arrayLike, mapFn)

Array.from(arrayLike, mapFn, thisArg)

Example

```jsx
const set = new Set(["foo", "bar", "baz", "foo"])
Array.from(set)
```

**Link:** 

[Array.from() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

## Proxies

A `Proxy` object wraps another object and intercepts operations, like reading/writing properties and others, optionally handling them on its own, or transparently allowing the object to handle them.

A proxy object sits between a real object and the calling code. The calling code interacts with the proxy instead of the real object. To create a proxy:

- use the `new Proxy()` constructor
    - pass the object being proxied as the first item
    - the second object is a handler object
- the **handler** object is made up of 1 of 13 different "traps"
- a trap is a function that will intercept calls to properties let you run code
- if a trap is not defined, the default behaviour is sent to the target object

Proxies are a powerful new way to create and manage the interactions between objects.

Link

[Proxy and Reflect](https://javascript.info/proxy)

[JavaScript Proxy Explained Clearly By Practical Examples](https://www.javascripttutorial.net/es6/javascript-proxy/)

[JavaScript Proxies](https://www.programiz.com/javascript/proxies)

## Map

holds key-value pairs and remembers the original insertion order of the keys. Any value may be used as either a key or a value.

# Reference Links and Articles

[JavaScript ES6 — write less, do more](https://www.freecodecamp.org/news/write-less-do-more-with-javascript-es6-5fd4a8e50ee2/)

[Classes - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes?retiredLocale=ar)