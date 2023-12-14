## Data Types in JavaScript 

### Introduction

 **data type** is a classification or categorization of data that determines what kind of values a variable can hold and how those values behave.

 JavaScript is a loosely typed language, meaning that variables are not explicitly declared with a type
 ```js
 let age :number = 50;
```

```java
Float name = 'Josh'
```
Instead, the data type is dynamically determined at runtime based on the kind of value assigned to the variable.

#### 1 **Primitive Data Types
**Primitive Data Types:**
- **Number**
- **String**
- **Boolean**
- **Null**
- **Undefined
- **Symbol**
#### 2. **Non Primitive**
**Non Primitive Data Type**
- **Object**
- **Array**
- **Function**
### Mutable Data Types:

**Mutability** refers to the ability of an object or value to be changed after it is created. In languages with mutable data types, you can modify the state of an object, and the changes are reflected in the original object.


```js
let mutableArray = [1, 2, 3];
mutableArray.push(4); // Modifies the original array
console.log(mutableArray); // Outputs: [1, 2, 3, 4]

```

1.**Objects:**

- Objects in JavaScript are mutable. You can add, modify, or remove properties after an object is created. 

```js
let mutableObject = { key: 'value' };
mutableObject.newKey = 'newValue'; // Modifies the original object

```

2. **Arrays:**

- Arrays are mutable in JavaScript. You can add, remove, or modify elements within an array after its creation.
```js
let mutableArray = [1, 2, 3];
mutableArray.push(4); // Modifies the original array

```

### Immutable Data Types:

 **Immutability** refers to the inability of an object or value to be changed after it is created. In languages with immutable data types, once a value is assigned, it cannot be modified. Instead of modifying existing values, you create new values based on the existing ones.

```js
let number = 42
number = 43

```

1. **Primitives:**
	- Primitive data types (such as numbers, strings, booleans, null, and undefined) are immutable. Once a primitive value is assigned, it cannot be changed.
```js
let immutableString = 'Hello';
let newString = immutableString + ' World'; // Creates a new string

```

## 2nd Series
----
### Dynamic Typing
1. **Dynamic Typing:**
```js
let x = 5;  // x is a number
x = "hello";  // x is now a string

```

### Loose Typing
2. **Loose Typing**
```js
console.log(5 + "5");  // Outputs: "55"

```

### Object Based
3. **Object-Based**
```js
let str = "hello";
console.log(str.length);  // Outputs: 5

```

### Prototypal Inheritance
4. **Prototypal Inheritance:**
```js
// Creating a simple object and inheriting from it
let parent = { name: "John" };
let child = Object.create(parent);
console.log(child.name);  // Outputs: "John"

```
Certainly! Prototypal inheritance in JavaScript is a unique feature that sets it apart from traditional class-based inheritance in many other programming languages. Let's delve into more details:

##### Prototypal Inheritance in JavaScript:

1. **Prototype Chain:**
    
    - In JavaScript, each object has a private property called `[[Prototype]]` (often referred to as the "dunder proto"). This property points to another object, known as its prototype.
    - When you try to access a property or method on an object, and the object doesn't have it, JavaScript looks up the prototype chain to find the property in the linked objects.
2. **Object.create():**
    
    - The `Object.create()` method is used to create a new object with a specified prototype object. It allows you to explicitly establish the prototype relationship between objects.
    
    javascriptCopy code
    
```js
let parent = { name: "John" }; 
let child = Object.create(parent);

```
    
3. **Inheriting Properties:**
    
    - In the example above, the `child` object inherits the `name` property from its `parent`. The `child` doesn't have a `name` property of its own, but it can access it through the prototype chain.
    
    javascriptCopy code
    
 ```js
	console.log(child.name);  // Outputs: "John"
```
    
4. **Dynamic Inheritance:**
    
    - Prototypal inheritance allows for dynamic changes to the prototype chain during runtime. You can add or modify properties and methods in the prototype, and all objects linked to that prototype will reflect those changes.
    
    javascriptCopy code
    
    `parent.age = 30;  // Adding a new property to the prototype console.log(child.age);  // Outputs: 30`
    
5. **No Classes (Before ES6):**
    
    - In JavaScript, prototypal inheritance was the primary mechanism for code reuse before the introduction of classes in ECMAScript 2015 (ES6). Objects were linked to other objects, forming a chain of prototypes.
6. **Constructor Functions (Historical Approach):**
    
    - Before ES6, constructor functions were often used to simulate class-like behavior. Objects created with constructor functions had a prototype link to the constructor's prototype property.
    
    javascriptCopy code
    
    `function Person(name) {   this.name = name; }  let person1 = new Person("Alice");`
    
    - `person1` inherits from `Person.prototype`.

##### ES6 Classes:

- With the introduction of classes in ES6, JavaScript gained a syntax for more traditional-looking class-based inheritance. However, under the hood, ES6 classes still use prototypal inheritance.

javascriptCopy code

```js
class Animal {   
	constructor(name) {     
		this.name = name;   
	}    
	
	speak() {     
		console.log(`${this.name} makes a sound.`);  
	} 
}  

class Dog extends Animal {   
	speak() {     
		console.log(`${this.name} barks.`);   
	} 
}  
let dog = new Dog("Buddy"); 
dog.speak();  // Outputs: "Buddy barks."
```

In summary, prototypal inheritance in JavaScript provides a flexible and dynamic way to create relationships between objects. It allows for runtime modifications and offers an alternative to the class-based inheritance found in many other programming languages.

### Automatic Type Convention
5. **Automatic Type Conversion (Coercion):**

```js
console.log(5 + "5");  // Outputs: "55"

```

## Title: The Magic of Data Types in JavaScript

## Tags
1. #JavaScript
2. #DataTypes
3. #Programming
4. #WebDevelopment
5. #Coding
6. #card 
7. #moch
8. #sonysanhga
9. #cleverprogramming
10. #mattpocock

