## Introduction

#### Dynamic Typing
#### Loose Typing
#### Object Based
#### Prototypal Inheritance
 #### Automatic Type Convention
 
---

### Dynamic Typing
1. **Dynamic Typing:**

```js
let x = 5;  // x is a number
x = "hello";  // x is now a string

```

---
### Loose Typing
2. **Loose Typing**

```js
console.log(5 + "5");  // Outputs: "55"

```
---
### Object Based
3. **Object-Based**

```js
let str = "hello";
console.log(str.length);  // Outputs: 5

```

---

### Prototypal Inheritance
4. **Prototypal Inheritance:**

```js
// Creating a simple object and inheriting from it
let parent = { name: "John" };
let child = Object.create(parent);
console.log(child.name);  // Outputs: "John"

```

---

### Automatic Type Conversion
5. **Automatic Type Conversion (Coercion):**

```js
console.log(5 + "5");  // Outputs: "55"

```


---

 JavaScript is a loosely typed language, meaning that variables are not explicitly declared with a type