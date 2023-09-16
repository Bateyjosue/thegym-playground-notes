# JS Fundamentals Group Discussion

- **Data Types in Javascript**
    
    is the data representation in js whereby we specify the type of data our variable will be storing
    
    1. number
    2. boolean
    3. undefined
    4. object
    5. symbols
    6. null
    7. BigInt
    8. string

Note: Is a Function a data type or belongs to an object data type

- **Undefined, null, and NaN**
    
    undefined ⇒ return when creating a variable without initializing it
    
    null ⇒ The variable does not have something in it
    
    NaN ⇒ trying to do an operation with an unnumbered variable
    
- **Type of coercion and operator**
    
    **coercion**: in an automatic type conversion
    
    Implicitly and explicit coercion
    
    1. **implicit Coercion:** the javascript app will convert the number for you automatically
    2. **Explicit Coercion:** we convert it manually using a different function like parseIn**t**
    
    **Operator:** 
    
    1. arithmetic operator (+, /, * , -)
    2. arithmetic comparison (<, >, ≤, ≥, ==, ===, !, ≠)
    3. logical operator(&&, ||)
    4. bitwise operation()
    
    Note: Is ! (not) a comparison operator
    
    TYPE OF OPERATOR IN JS
    
    **Operator:** 
    
    - Assignment Operators.(=, +=, -=, *=, etc)
    - Arithmetic Operators(+, -, *, /, %,++, - -,*** )
    - Comparison Operators(==, ! =,  ===, ! ==, >, <, > =, < = )
    - Logical Operators (&&, ||, !)
    - Bitwise Operators: perform operators on binary representations of numbers (&, |, ^, ~, <<, >>, >>>)
    - String Operators(+)
    - others operators (, ,?:, delete, typeof, void, in, instanceof)
    
    Link:
    
    [JavaScript Operators (with Examples)](https://www.programiz.com/javascript/operators)
    
- **if the condition and switch case**
- **Hoisting in js**
    
    it's JS behavior where the variable declaration is taken to the top of its scope…
    
- **Function in Js**

I set of code we isolate for the purpose of using it later

⇒ **how do parameters and arguments differ?**

⇒ **return and console.log?**

- **`return`** hold a value for the function
- **`console.log`** help us to display on the console of the js the value of a kind of parameter, mostly used for debugging purpose

**⇒ Function Expression**

it's a function that can be passed to a variable as an expression

**Function ExpressionWarray function expression being hosted**

`let sum = (a, b) ⇒ a + b;`

**Function Declaration**

`function sum(a,b) {`

`return a + b;`

`}` 

**Note**: does the array function expression being hosted

- **Array**
    
    ⇒ how to merge nested array
    
    ⇒ Method to remove nested array?
    
    Links:
    
    1. [https://linuxhint.com/merge-flatten-array-of-arrays-in-javascript/#:~:text=Conclusion-,To merge or flatten an array of arrays%2C use the,for merging or flattening arrays](https://linuxhint.com/merge-flatten-array-of-arrays-in-javascript/#:~:text=Conclusion-,To%20merge%20or%20flatten%20an%20array%20of%20arrays%2C%20use%20the,for%20merging%20or%20flattening%20arrays).
    2. 
- **Higher Order function**
    
    function whereby we can pass a function as an argument and can return a function as well
    
- **First-class function**
    
    Functions are treated like other variables
    
    [First-class Function - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)
    
- **call stack**
    
    for memorizing which function is running right now, is used by JavaScript to keep track of multiple function calls.
    
- Execution context
    
    
    There are two types of execution contexts: **global** and **function**. The global execution context is created when a JavaScript script first starts to run, and it represents the global scope in JavaScript. A function execution context is created whenever a function is called, representing the function's local scope
    
    Links: 
    
    [JavaScript Execution Context – How JS Works Behind the Scenes](https://www.freecodecamp.org/news/how-javascript-works-behind-the-scene-javascript-execution-context/#:~:text=There%20are%20two%20types%20of,representing%20the%20function's%20local%20scope)
    
- **closure function:** inner function tried to access the variable of the outer function. is when a child function access variable of the parent function
    
    function A(){
    
    let name;
    
    function B(){
    
    name = ‘Josue’;
    
    return name
    
    }
    
    }
    
    **Note: which function will be returned in case of closure**
    
- **Object argument or rest parameters**
    
    **⇒ REST PARAMETER:** store an infinite number of arguments for a given function
    
    **Rest parameters** represent the unknown number of arguments inside the function, whereas 
    
    **the arguments** object represents all arguments passed to the function
    
- **This keyword:**
- **Variable Shadowing**
    
    overlay a variable by creating it again
    
- **some and every in js**
    
    
    Links:
    
    [Array.prototype.some() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some#return_value)
    
    [Array.prototype.every() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
    
- **reduce method**
    
    links
    
    [https://www.notion.so](https://www.notion.so)
    
- call and apply?
- bind?
- function prototype?
    
    hold the metadata of an object
    
- strict mode
    
    
    Links
    
    - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
    - [https://www.geeksforgeeks.org/strict-mode-javascript/](https://www.geeksforgeeks.org/strict-mode-javascript/)
- How js is executed?
- proto hidden property?
- [] and . notation for an object?
- how to reference an object?
    
    Links:
    
    - [https://javascript.info/object-copy#:~:text=Objects are assigned and copied,reference%2C not the object itself](https://javascript.info/object-copy#:~:text=Objects%20are%20assigned%20and%20copied,reference%2C%20not%20the%20object%20itself)

[]()

- **immutability and mutability. on Array**
    
    *A **mutable object** is an object whose state can be modified after it is created.*
    
    ***Immutables** are objects whose states cannot be changed once the object is created.*
    
    [Mutable and immutable in JavaScript](https://blog.devgenius.io/mutable-and-immutable-in-javascript-78a3cbc6187c)
    
- **string manipulation method?**
    - split
    - charAt
    - substr
    - includes
    - match
    - at
    - indexOf
    - endswith
    - concat
- eval in Javascript
    
    The **`eval()`** function evaluates JavaScript code represented as a string and returns its completion value. The source is parsed as a script.
    
    ```jsx
    eval(new String("2 + 2")); // returns a String object containing "2 + 2"
    eval("2 + 2"); // returns 4
    ```
    
    # DOM Fundamentals Questions
    
    1. **What is DOM ?**
        
        browser API which give access to the web content so that we can manipulate the web element in our js code
        
        Link:
        
        - 
        
    2. **Different types of Node?**
        - Element Node
        - Attribute Node
        - Text Node
        - Comment Node
    3. **How can we create a Node in DOM**
        
        we can use an `createElement` function to create an element then append it to the container whereby the `document` object is provided to us as the top parent Node.
        
    4. **what is a purpose of documentFragment Node DOM in js**
        
        is Node which we be painted once its called and it will only paint the updated element while with ElementNode will restart the painting from begining
        
    5. **How can we modify an attribute of element**
        
        first of all we have to get the element we wanna change its attribute and then we will use `setAttribute` which takes 2 arguments the **attribute** and the **value** 
        
    6. **Document type node <doctype> in HTML?**
        
        is to specified the type of html we are using
        
    7. **How can we modify a Text Node**
        
        get the element we wanna change content then we can use different function such `textContent`, `innerHTML`, `outerHTML`
        
        how to do it using (NodeValue)
        
    8. **What are properties and functions using to access or transverse DOM Element?**
        1. querySelector
        2. querySelectorAll
        3. getElementById
        4. getElementByClassName
        5. getElementByTagName
        6. parentElement
        7. siblingsElement
        8. last child
        9. first child
        10. child node
    9. **properties that help us to traverse only elementNode** 
        1. parentElement
        2. siblingsElement
        3. last child
        4. first child
        5. child node
    10. **Is it possible to traverse in forward and backward in the DOM?**
        
        Yes as long us we can select previous siblings of an element or even get the parentElement
        
    11. what happen if you wanna access `nextSiblingElement` of the `lastChildElement`
        
        return `null`
        
    12. **different method to create element dynamically**
        
        insertAdjestmentHTML?
        
    13. **diference between Node and Element**
        
        Node is an Interface classs of the Element
        
    14. **what is An Event and Event Handling**
        
        an action which occur on user interaction
        
    15. **Whats are event phases**
        - on capturing
        - target
        - and bubbling
    16. **different way to bind/join with/attached event handler to a specific element**
        
        we use `addEventListener` method or to create a event and then dispatch it
        
        const onclick = {
        
        }
        
    17. **`stopPropagation` and `preventDefault`**
        
        **stopProgation**: stop the event on the bubbling to other element
        
        **preventDefault:** prevent default dehavior of an element
        
    18. **how to redirect to new page in js**
        
        we `window.location.assign()` function whereby we pass an url to the function
        
    19. ******************how to handle error exception******************
        
        I can use try and catch to track when errors may occur
        
    20. **how to retrieve elements using HTML Document Element**
    21. **role of having active element property**
        
        The element that currently has focus.
        

# DOM Best Practices

1. Use CSS classes instead of Inline Style
2. **Cache Selectors:** You can store the result of the selector in a variable and reuse it later, rather than constantly querying the DOM for the same element
3. Use Event Delegation: is a technique that involves attaching an event listener to a parent element and then handling events that occur on its child elements.
4. Use Selector Wisely: 
5. ****Avoid Using the `innerHTML` Method to Manipulate HTML Elements (use createElement and textContent methods instead)**
6. ****Avoid Nesting Elements in Selectors****

# ES6 Discussion

1. When shouldn't  we use an arrow function
2. what is a generator function
3. what is destructuring in es6
4. different between the rest parameter and spread operator
    
    rest: represent the unknown number of arguments inside the function
    
    spread: allows an iterable to be expanded in places where zero or more arguments or elements are expected
    
5. different between ECMAScript and js
6. how do we declare the arrow function

add(a,b) = > a + b;

1. What is the difference between ECMAScript and JavaScript?
    - JavaScript: **general-purpose scripting language that conforms to the ECMAScript specification**
    - ECMAScript
    
    [What’s the difference between JavaScript and ECMAScript?](https://www.freecodecamp.org/news/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5/)
    
2. How are arrow functions different from regular functions
3. How are template literals processed and what is a tagged templates?
4.  What is the difference between Variadic functions, function rest parameters, and the arguments object?
    1. **Variadic function:** It’s a function that accepts an arbitrary number of arguments
    2. **Rest parameter:** allows a function to accept an indefinite of arguments as an array. proving  a way to represent a variadic function
    3. **Arguments object:** is an array-like object accessible inside functions that contain the values of the arguments passed to that function. Is a local variable within all non-arrow functions. It is useful for functions called with more arguments than they are formally declared to accept, called variadic functions such as Math.min()

⚠️ You cannot write a “use strict” directive in the body of a function definition that accepts rest, default, or destructured parameters. Doing so will throw a `syntaxError`

**Links:**

1. [https://dev.to/sarahokolo/variadic-functions-in-javascript-understand-the-basic-usage-and-benefits-4m8n#:~:text=Variadic functions are also known,an arbitrary number of arguments](https://dev.to/sarahokolo/variadic-functions-in-javascript-understand-the-basic-usage-and-benefits-4m8n#:~:text=Variadic%20functions%20are%20also%20known,an%20arbitrary%20number%20of%20arguments). 
2. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) 
3. **arguments object** ⤵️

[The arguments object - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

1. What is the difference between for...of and for....in loops?
    
    The `[for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)` statement iterates over the [**enumerable string properties**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) of an object, while the `for...of` statement iterates over values that the **[iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)** defines to be iterated over.
    
    1. **for … of**: statement executes a loop that operates on a sequence of values sourced from an [iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol). 
        
        ```jsx
        const array1 = ['a', 'b', 'c'];
        for (const element of array1) {
          console.log(element);
        }
        // Expected output: "a"
        // Expected output: "b"
        // Expected output: "c"
        ```
        
        ## Syntax
        
        ```jsx
        for (variable of iterable)
          statement
        ```
        
2. The difference between the spread operator and rest parameter
    
    **rest operator** puts the rest of some specific user-supplied values into a JavaScript array. But **the spread syntax** expands iterable into individual elements.
    
    The **rest parameter** collects all remaining elements into an array
    
    The **Spread operator** expands collected elements such as arrays into single elements
    
    ### Arguments vs Rest Parameters
    
    - arguments objects is an array-like object, not a real array;
    - you cannot use the arguments object in an arrow function;
    - let rest be your preference
    
    ### 3 Essential pieces about the spread
    
    ⇒ Spread operators can’t expand object literals values you can use it to  clone properties from one object into another;
    
    ⇒ Spread operator does not clone identical properties, identical will be overridden;
    
    ⇒ beware of how spread works when used on objects containing non-primitives
    
    LINKS:
    
    [JavaScript Rest vs Spread Operator – What’s the Difference?](https://www.freecodecamp.org/news/javascript-rest-vs-spread-operators/)
    
3. What is destructuring
    
    js expression to unpack values from arrays or props from objects into distinct variables?
    

 8. What are two types of destructuring and what is the difference between them

1. **Binding pattern:** starts with a declaration keyword (let and const)
2. **Assignment pattern**: doesn't start with a keyword
1. How to swap two variables with destructuring assignment
    
    let number1 = 10
    
    let number2 = 5
    
    // number1 to be 5
    
    // number2 to be 10
    
2. Explain the output of the following code

`const [a, b, ...{ length: size }] = [10, 11, 12, 13, 14];

console.log(size)

1. Explain the output of the following code

const isRaining = new Boolean(false);

if (isRaining) {

console.log("Take the umbrella");

} else {

console.log("Enjoy the sun");

}

1. Explain the output of the following code

const { toLowerCase } = 'Hello world'

console.log(toLowerCase)

1. What is value mutability and immutability? Examples of mutating and non-mutating methods

# ES6 Discussion

- difference between Symbol() and Symbol.for()
- difference between Symbols and well-known symbols
- difference between a map and an object
- difference between a set and an array
- different between a set and WeakSet
- why does for…of not working in plain object
- difference between iterator and generator
- interation protocol and the iterator protocol

[Mental models sessions](JS%20Fundamentals%20Group%20Discussion%20cbbd468ffc244924974062e3ce1eebcf/Mental%20models%20sessions%204cc491678316459c85256bccd11e656e.md)