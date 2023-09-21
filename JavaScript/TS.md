# TS

# **is a programming language that is a superset of JavaScript. It adds optional static typing and other features to JavaScript.**

Typescript is considered a superset of JavaScript because it includes all the features and syntax of JavaScript while adding additional features on top of it.

**Static typing** means that the type of a variable cannot be changed at any point in a program. It can prevent a LOT of bugs!

## **Here are some key points about TypeScript:**

## 1. Static typing

TypeScript introduces static typing, allowing you to explicitly declare the types of variables, function parameters, and return values. This helps catch type-related errors during development and enables better code documentation.

```jsx
let name: string = "John";
let age: number = 25;
let isStudent: boolean = true;

function calculateSum(a: number, b: number): number {
 return a + b;
}
```

In this example, we explicitly declare the types of variables (`name`, `age`, `isStudent`) and function parameters (`a`, `b`) with their respective types.

## 2. Enhanced tooling:

TypeScript provides a rich set of tools and features for development. It includes features like autocompletion, code navigation, and refactoring support, which can improve productivity and help catch errors early.

For example, if you have the following code snippet:

```jsx
interface Person {
 name: string;
 age: number;
}

const person: Person = {
 name: "John",
 age: 25,
};

person.
```

When you type `person.`, the [TypeScript](https://www.google.com/search?q=TypeScript) IDE or editor will provide autocompletion suggestions for the available properties of the `person` object (e.g., `name`, `age`).

## 3. ECMAScript compatibility:

TypeScript is a superset of JavaScript, which means that any valid JavaScript code is also valid TypeScript code. You can gradually introduce TypeScript into your existing JavaScript projects and leverage its features without having to rewrite your entire codebase.

For example, you can use existing JavaScript code like:

```jsx
function greet(name) {
     console.log("Hello, " + name + "!");
   }
   
   greet("John");
```

This JavaScript code can be directly used in [TypeScript](https://www.google.com/search?q=TypeScript) without any modifications.

## 4. Object-oriented programming (OOP) features:

 

TypeScript supports classes, interfaces, inheritance, and other object-oriented programming concepts. This makes it easier to organize and structure your code, promoting reusability and maintainability. Here's an example:

```jsx
interface Animal {
 name: string;
 makeSound(): void;
}

class Dog implements Animal {
 name: string;

 constructor(name: string) {
   this.name = name;
 }

 makeSound(): void {
   console.log("Woof!");
 }
}

const dog = new Dog("Buddy");
dog.makeSound(); // Output: "Woof!"
```

In this example, we define an `Animal` interface and a `Dog` class that implements the `Animal` interface. The `Dog` class has a `makeSound` method that outputs "Woof!" when called.

## 5. Compile-time type checking:

TypeScript performs type checking at compile time, which can help catch potential errors before running the code. This can save time and prevent bugs from occurring in runtime.

```jsx
let name: string = "John";
let age: number = "25"; // Error: Type 'string' is not assignable to type 'number'
```

In this case, [TypeScript](https://www.google.com/search?q=TypeScript) will catch the type-related error during compilation and notify you about the incompatible assignment.

## 6. Better developer experience:

TypeScript improves the developer experience by providing features like code organization through modules, support for modern JavaScript features, and easier integration with popular JavaScript frameworks and libraries.

```jsx
// mathUtils.ts
   export function calculateSum(a: number, b: number): number {
     return a + b;
   }
   
   // main.ts
   import { calculateSum } from "./mathUtils";
   
   console.log(calculateSum(2, 3)); // Output: 5
```

In this example, we have a separate `mathUtils.ts` file that exports a `calculateSum` function. In the `main.ts` file, we import the function and use it.

## ****Drawbacks of TypeScript****

- **TypeScript takes longer to write than JavaScript**, as you have to specify types, so for smaller solo projects it might not be worth using it.
- **TypeScript has to be compiled** – which can take time, especially in larger projects.

## How to set up a project with TypeScript

## 1. **Install Node and the Typescript Compiler**

Make sure you have the latest supported version of nodejs installed on your Computer and then run the following command to install the typescript compiler globally on your PC

```bash
npm i -g typescript // this install typescript in your PC globally using the option -g
tsc -v             //  check the typescript version installed

**/* Compile Typescript */**

tsc index // this compile the file index.ts
```

### You will need to create `index.ts` with the following code

```tsx
let sport = 'football';
let id = 5;
```

TSC will compile the code into JavaScript and output it in a file called index.js: 

```jsx
var sport = 'football';
var id = 5;
```

> In case you want to specify the compiled file name on the compilation time run the following command instead
> 

```bash
tsc index.ts --outfile file-name.js
```

> Use the flag `-w` to compile automatically once your code have been changed
> 

```bash
tsc index.ts -w
```

## 2. ****How to Set Up the ts config File****

- create the config file by running the follow command

```bash
tsc --init
```

will create a `tsconfig.json` in the root directory

> To compile everything and watch them use the following cmd
> 

```bash
tsc -w
```

using the `tsc index` will ignore other files such as `tsconfig.json` while compiling

## Here is how the `tsconfig.json` look like

```bash
{
    "compilerOptions": {
        ...
        /* Modules */
        "target": "es2016", // Change to "ES2015" to compile to ES6
        "rootDir": "./src", // Where to compile from
        "outDir": "./public", // Where to compile to (usually the folder to be deployed to the web server)
        
        /* JavaScript Support */
        "allowJs": true, // Allow JavaScript files to be compiled
        "checkJs": true, // Type check JavaScript files and report errors
        
        /* Emit */
        "sourceMap": true, // Create source map files for emitted JavaScript files (good for debugging)
         "removeComments": true, // Don't emit comments
    },
    "include": ["src"] // Ensure only files in src are compiled
}
```

## ****Types in TypeScript****

### ****Primitive types****

**Primitives are immutable:** they can't be altered. It is important not to confuse a primitive itself with a variable assigned a primitive value. The variable may be reassigned a new value, but the existing value can't be changed in the same ways that objects, arrays, and functions can be altered.

**Example**

```jsx
let name = 'Josh';
name.toLowerCase();
console.log(name); // Josh- the string method didn't mutate the string

let arr = [1, 3, 5, 7];
arr.pop();
console.log(arr); // [1, 3, 5] - the array method mutated the array

name = 'Cledia' // Assignment gives the primitive a new (not a mutated) value
```

### There are 7 primitive data types:

- string
- number
- bigint
- boolean
- undefined
- null
- symbol

> In JavaScript, all primitive values (apart from null and undefined) have object equivalents that wrap around the primitive values. These wrapper objects are String, Number, BigInt, Boolean, and Symbol. These wrapper objects provide the methods that allow the primitive values to be manipulated.
> 

Back to TypeScript, we can set the type we want a variable to be be adding `: type` (called a "type annotation" or a "type signature") after declaring a variable. Examples:

```jsx
let id: number = 5;
let firstname: string = 'danny';
let hasDog: boolean = true;

let unit: number; // Declare variable without assigning a value
unit = 5;
```

### ****Reference Types****

when we talk of reference types in JavaScript, we are referring to arrays, objects and functions.

## Arrays in Typescript

```tsx
let ids: number[] = [1, 2, 3, 4, 5]; // can only contain numbers
let names: string[] = ['Danny', 'Anna', 'Bazza']; // can only contain strings
let options: boolean[] = [true, false, false]; can only contain true or false
let books: object[] = [
  { name: 'Fooled by randomness', author: 'Nassim Taleb' },
  { name: 'Sapiens', author: 'Yuval Noah Harari' },
]; // can only contain objects
let arr: any[] = ['hello', 1, true]; // any basically reverts TypeScript back into JavaScript

ids.push(6);
ids.push('7'); // ERROR: Argument of type 'string' is not assignable to parameter of type 'number'.
```

## **Caveat**: **You can use union types to define arrays containing multiple types**

```tsx
let person: (string | number | boolean)[] = ['Danny', 1, true];
person[0] = 100;
person[1] = {name: 'Danny'} // Error - person array can't contain objects
```

## If you initialize a variable with a value, it's not necessary to explicitly state the type, as TypeScript will infer it

```tsx
let person = ['Danny', 1, true]; // This is identical to above example
person[0] = 100;
person[1] = { name: 'Danny' }; // Error - person array can't contain objects
```

## Tuples

**is an array with fixed size and known datatypes.** They are stricter than regular arrays.

```tsx
let person: [string, number, boolean] = ['Danny', 1, true];
person[0] = 100; // Error - Value at index 0 can only be a string
```

tuples are a data type that allow you to express an array with a fixed number of elements, where each element can have its own specific type. Tuples are similar to arrays, but they have a fixed length and the types of their elements are known in advance.

Here's an example of how you can define and use tuples in TypeScript:

```tsx
// Declare a tuple type
let myTuple: [string, number, boolean];

// Initialize the tuple
myTuple = ["Hello", 42, true];

// Accessing elements
console.log(myTuple[0]); // Output: "Hello"
console.log(myTuple[1]); // Output: 42
console.log(myTuple[2]); // Output: true

// Modifying elements (not allowed as tuples are immutable)
myTuple[0] = "Hi"; // Error: Index signature in type 'readonly [string, number, boolean]' only permits reading
```

In the example above, `myTuple` is declared as a tuple type with three elements: a string, a number, and a boolean. You can assign values to the tuple elements and access them using index notation. However, modifying tuple elements is not allowed as tuples are immutable.

## Object in Typescript

```tsx
// Declare a variable called person with a specific object type annotation
let person: {
  name: string;
  location: string;
  isProgrammer: boolean;
};

// Assign person to an object with all the necessary properties and value types
person = {
  name: 'Danny',
  location: 'UK',
  isProgrammer: true,
};

person.isProgrammer = 'Yes'; // ERROR: should be a boolean

person = {
  name: 'John',
  location: 'US',
}; 
// ERROR: missing the isProgrammer property
```

## Objects in TypeScript must have all the correct properties and value types

When defining the signature of an object, you will usually use an **interface**.

```tsx
interface Person {
  name: string;
  location: string;
  isProgrammer: boolean;
}

let person1: Person = {
  name: 'Danny',
  location: 'UK',
  isProgrammer: true,
};

let person2: Person = {
  name: 'Sarah',
  location: 'Germany',
  isProgrammer: false,
};
```

### We can also declare function properties with function signatures

```tsx
interface Speech {
  sayHi(name: string): string;
  sayBye: (name: string) => string;
}

let sayStuff: Speech = {
  sayHi: function (name: string) {
    return `Hi ${name}`;
  },
  sayBye: (name: string) => `Bye ${name}`,
};

console.log(sayStuff.sayHi('Heisenberg')); // Hi Heisenberg
console.log(sayStuff.sayBye('Heisenberg')); // Bye Heisenberg
```

## Function in Typescript

```tsx
// Define a function called circle that takes a diam variable of type number, and returns a string
function circle(diam: number): string {
  return 'The circumference is ' + Math.PI * diam;
}

console.log(circle(10)); // The circumference is 31.41592653589793

// Arrow Function

const circle = (diam: number): string => {
  return 'The circumference is ' + Math.PI * dia m;
};

console.log(circle(10)); // The circumference is 31.41592653589793
```

### We can add a question mark after a parameter to make it optional. Also notice below how `c` is a union type that can be a number or string:

```tsx
const add = (a: number, b: number, c?: number | string) => {
  console.log(c);

  return a + b;
};

console.log(add(5, 4, 'I could pass a number, string, or nothing here!'));
// I could pass a number, string, or nothing here!
// 9
```

## Dynamic (any) types

Using the any type, we can basically revert Typescript back into JS

```tsx
let dynamicValue: any = "Hello, world!";

console.log(dynamicValue.length); // No type error, even though length is not a valid property of a string

dynamicValue = 42;
console.log(dynamicValue.toFixed(2)); // No type error, even though toFixed is not a valid method of a number
```

In TypeScript, the type system is designed to be static, meaning that types are checked at compile-time. However, there are cases where you may need to work with dynamic types, such as when interacting with external APIs or when dealing with data of unknown structure. The `any` type allows variables to hold values of any type, and it essentially disables type checking for that variable. This means that you can perform any operation on an `any` type without TypeScript raising any type errors.

## Type Aliases

allow you to create a new name for a type. They are useful when you want to simplify complex type definitions or make your code more readable.

Example

```tsx
type Age = number;

let myAge: Age = 25;

type Point = {
  x: number;
  y: number;
};

type Shape = Circle | Square;

type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};
```

In this example, we create type aliases for `Point`, `Shape`, `Circle`, and `Square`. The `Shape` type is a union type that can be either a `Circle` or a `Square`. The `kind` property is used as a discriminating field to determine which shape it is.

### Difference between type aliases and interfaces

**Type Aliases:**

- Type aliases allow you to create a new name for a type, making your code more readable and expressive.
- They are created using the `type` keyword.
- Type aliases can be used to represent simple types like strings, numbers, or booleans, as well as complex types like unions, intersections, and tuples.
- They can also be used with generics to create reusable type patterns.
- Type aliases are flexible and can be used with any type, including primitive types, object types, and union types.

**Interfaces:**

- Interfaces are used to define the structure of an object and its members.
- They can be used to define properties, methods, and function signatures.
- Interfaces can extend other interfaces to inherit their members.
- They can also be implemented by classes to enforce a specific structure.
- Interfaces are open-ended, meaning you can add new properties or methods to an existing interface without modifying its original declaration.
- Interfaces can be used to describe the shape of an object and provide type checking during development.

**In general, if you need to define the shape of an object or enforce a specific structure, interfaces are a good choice. If you need more flexibility or want to create reusable type patterns, type aliases are a better option**

## DOM and type Casting

Type casting, also known as type assertion, is a way to tell the TypeScript compiler that you know better about the type of a value than it does. It is useful when you are working with the DOM, as the properties and methods of DOM elements are not fully recognized by TypeScript.

To perform type casting in TypeScript, you can use the angle bracket syntax or the "as" keyword. 

**Here's an example:**

```tsx
// Type casting using angle bracket syntax
const element = document.getElementById("myElement") as HTMLInputElement;
element.value = "Hello, TypeScript!";

// Type casting using "as" keyword
const element = document.getElementById("myElement");
const inputElement = element as HTMLInputElement;
inputElement.value = "Hello, TypeScript!";
```

## main TypeScript concepts

## • How to use TypeScript with React

# Links and articles

[TypeScript Cheat Sheet 📄 (32 Code Examples + PDF & Poster)](https://www.doabledanny.com/typescript-cheat-sheet)

[Learn TypeScript – The Ultimate Beginners Guide](https://www.freecodecamp.org/news/learn-typescript-beginners-guide/)

[JavaScript String Manipulation Techniques Every Developer Should Know](https://www.syncfusion.com/blogs/post/javascript-string-manipulation-techniques-every-developer-should-know.aspx)

# Mental Modal Typescript

Document Typescript typing

- custom type
- unknown type
- never type

---

1. access modified in typescript
2. keyof in typescript
    
    The `keyof` operator in TypeScript is a powerful tool that allows you to work with the keys of an object type. It is a type operator that returns a union type of all the keys in an object type. Here's how `keyof` can be used in TypeScript:
    
    1. **Accessing object properties**: You can use `keyof` to access the keys of an object type and then use those keys to access corresponding properties. Here's an example:
    
    typescript
    
    type Person = {
      name: string;
      age: number;
    };
    
    function getProperty(obj: Person, key: [keyof Person](https://www.google.com/search?q=keyof%20Person)) {
      return obj[key];
    }
    
    const person: Person = {
      name: "John",
      age: 25,
    };
    
    const nameValue = getProperty(person, ["name"](https://www.google.com/search?q=%22name%22)); // "John"
    const ageValue = getProperty(person, ["age"](https://www.google.com/search?q=%22age%22)); // 25
    
    In this example, `keyof Person` returns the union type of ["name"](https://www.google.com/search?q=%22name%22) | ["age"](https://www.google.com/search?q=%22age%22), which represents all possible keys of the `Person` type. The `getProperty` function takes an object of type `Person` and a key of type [keyof Person](https://www.google.com/search?q=keyof%20Person). It then uses the key to access the corresponding property of the object.
    
    1. **Type-safe object manipulation**: `keyof` can also be used to enforce type safety during object manipulation. For example, you can use it to create a function that copies selected properties from one object to another:
    
    typescript
    
    function copyProperties<T, K extends [keyof T](https://www.google.com/search?q=keyof%20T)>(source: T, target: Partial<T>, keys: K[]): void {
      keys.forEach(key => {
        target[key] = source[key];
      });
    }
    
    type Person = {
      name: string;
      age: number;
      address: string;
    };
    
    const source: Person = {
      name: "John",
      age: 25,
      address: "123 Main St",
    };
    
    const target: Partial<Person> = {};
    
    copyProperties(source, target, [["name"](https://www.google.com/search?q=%22name%22), ["age"](https://www.google.com/search?q=%22age%22)]);
    
    console.log(target); // { name: "John", age: 25 }
    
    In this example, the `copyProperties` function accepts a source object, a target object, and an array of keys to copy. The [K extends keyof T](https://www.google.com/search?q=K%20extends%20keyof%20T) constraint ensures that only valid keys of the source object can be used. This provides type safety and prevents accidental use of invalid keys.
    
    The `keyof` operator in TypeScript is a valuable tool for working with object types and enables type-safe manipulation of object properties and keys. It helps in creating more robust and maintainable code by leveraging the type system to catch potential errors at compile-time.
    
    1. Why typescript
    2. difference between type annotation and type inference
    3. what is Union Types in typescript
        
        In TypeScript, a union type allows you to define a type that can hold values of multiple types. It represents a value that can be one of several specified types. Union types are denoted using the pipe (`|`) symbol between the types. Here's an example to illustrate union types:
        
        typescript
        
        function displayValue(value: [string] | [number]() {
          console.log(value);
        }
        
        displayValue("Hello"); // Output: Hello
        displayValue(42);      // Output: 42
        
        In this example, the `displayValue` function accepts a parameter `value` of type [string](https://www.google.com/search?q=string) | [number](https://www.google.com/search?q=number). It means that the `value` parameter can be either a [string](https://www.google.com/search?q=string) or a [number](https://www.google.com/search?q=number). You can pass values of either type to the function, and TypeScript allows it because both [string](https://www.google.com/search?q=string) and [number](https://www.google.com/search?q=number) are part of the union type.
        
        Union types are particularly useful in scenarios where a value can take on different types. They provide flexibility and type safety by allowing you to specify all possible types that a value can hold.
        
        You can also use union types with variables, return types, and in type annotations. Here's an example:
        
        typescript
        
        let result: [string] | [number](https://www.google.com/search?q=number);
        
        result = "Success";
        console.log(result); // Output: Success
        
        result = 42;
        console.log(result); // Output: 42
        
        function getRandomValue(): [string] | [number] {
          return Math.random() > 0.5 ? "Hello" : 42;
        }
        
        let value: [string] | [number] = getRandomValue();
        console.log(value); // Output: Hello or 42
        
        In this example, the `result` variable is assigned a value of type [string](https://www.google.com/search?q=string) | [number](https://www.google.com/search?q=number). It can hold either a [string](https://www.google.com/search?q=string) or a [number](https://www.google.com/search?q=number). The `getRandomValue` function returns a value of type [string](https://www.google.com/search?q=string) | [number](https://www.google.com/search?q=number) based on a random condition.
        
        Union types allow you to handle different scenarios where a value can have different types, providing flexibility and type safety in your TypeScript code.
        

### Question

1. Difference Between **Collective Types** and **Literal Types**.
    
    **Collective Types** are types like `number`, `string`, `boolean`
    
    Eg: `const addOne = (numb: number) => num + 1;`
    
    **Literal Types** are sub-types of **Collective Types**
    
    Eg: `type Door = 'open' | 'closed' | 'ajar’`
    
2. **How do you define and use generics in [TypeScript](https://www.google.com/search?q=TypeScript)? X**
    
    Answer: Generics allow you to create reusable components that can work with a variety of types. You can define generics using angle brackets (`<>`). 
    
    For example:
    
    ```tsx
    function identity<T>(arg: T): T {
         return arg;
       }
       let result = identity<string>("Hello, !");
    ```
    
3. **How do you use type assertions** in [TypeScript](https://www.google.com/search?q=TypeScript)? X
    
    Answer: Type assertions allow you to tell the [TypeScript](https://www.google.com/search?q=TypeScript) compiler that you know the type of a value. You can use the `as` keyword
    
    ```tsx
    let value: any = "Hello, TypeScript!";
    let length: number = (value as string).length;
    ```
    
    Type assertions in [TypeScript](https://www.google.com/search?q=TypeScript) allow you to explicitly inform the compiler about the type of a value, even if the compiler cannot infer it automatically. It allows you to override the default type inference and treat a value as a different type. There are two ways to perform type assertions in [TypeScript](https://www.google.com/search?q=TypeScript):
    
    1. **Using the "as" syntax**: You can use the `as` keyword to assert a type. The syntax is `value as Type`. Here's an example:
    
    typescript
    
    let value: any = "Hello, TypeScript!";
    let length: number = (value as string).length;
    
    In this example, we assert that `value` is of type `string` using the `as` syntax. This allows us to access the `length` property of the string.
    
    1. **Using the angle bracket syntax**: [TypeScript](https://www.google.com/search?q=TypeScript) also allows type assertions using the angle bracket syntax: `<Type>value`. However, this syntax can conflict with JSX syntax in certain scenarios, so it is recommended to use the "as" syntax instead. Here's an example:
    
    typescript
    
    let value: any = "Hello, TypeScript!";
    let length: number = (<string>value).length;
    
    In this example, we assert that `value` is of type `string` using the angle bracket syntax.
    
    It is important to note that type assertions do not perform any runtime type checking or conversion. They are purely a way to inform the [TypeScript](https://www.google.com/search?q=TypeScript) compiler about the type of a value. It is your responsibility to ensure that the type assertion is accurate, otherwise, you may encounter runtime errors.
    
    Type assertions are useful in scenarios where you have more information about the type of a value than the compiler can infer. However, it is generally recommended to use type assertions sparingly and rely on proper type annotations and type inference whenever possible.
    
4. **How do you handle optional properties in [TypeScript](https://www.google.com/search?q=TypeScript) interfaces? X**
    
    Answer: You can mark a property as optional in an interface by adding a question mark (`?`) after the property name. 
    
    For example:
    
    ```tsx
    interface Person {
      name: string;
      age?: number;
     }
    ```
    
5. **How do you use interfaces for function types in TypeScript? X**
    
    Answer: You can use interfaces to define function types in TypeScript
    
    Here's an example:
    
    ```tsx
    interface MathFunction {
         (x: number, y: number): number;
       }
    
    let add: [MathFunction] = function(x, y) {
         return x + y;
       };
    
       console.log(add(2, 3)); // Output: 5
    ```