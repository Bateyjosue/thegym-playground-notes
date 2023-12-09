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