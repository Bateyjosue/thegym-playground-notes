## Data Types in JavaScript 

 **data type** is a classification or categorization of data that determines what kind of values a variable can hold and how those values behave.

 JavaScript is a loosely typed language, meaning that variables are not explicitly declared with a type
 clinp
Instead, the data type is dynamically determined at runtime based on the kind of value assigned to the variable.

**Primitive Data Types:**
- **Number**
- **String**
- **Boolean**
- **Null**
- **Undefined
- **Symbol**
**Non Primitive**
- **Object**
- **Array**
- **Function**
=> Immutable
=> mutable
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


## 1/26

# Practical Tutorial on Recursion

## Introduction

Recursion is a powerful programming concept where a function calls itself to solve a smaller instance of the same problem. It's like solving a puzzle where you break it down into smaller pieces until you reach a base case, and then build your solution back up.

## Understanding Recursion

Let's take a simple example to understand recursion. Suppose you have a tower of 10 blocks and you want to move all the blocks to another pile, one block at a time.

Without recursion, you would need to manually move each block one by one. But with recursion, you can simplify the process. Here's how:

1. Move the top block from the original pile to the new pile.
2. Now, you have 9 blocks left in the original pile. Use the same process to move these blocks to the new pile.

See the pattern? You're breaking down the problem into smaller instances of the same problem (moving 9 blocks, moving 8 blocks, and so on) until you reach the base case (no blocks left to move). Then, you start building your solution back up.

<!-- ![[Pasted image 20240126103517.png]] -->

<img src="https://miro.medium.com/v2/resize:fit:1200/1*5xiUTJ3T7cej2Tl5-DseUg.png ">

# Implementing Recursion in Code

Now, let's implement this concept in Python:

```js
function moveBlocks(n) {
    if (n === 0) {
        console.log("All blocks moved.");
    } else {
        moveBlocks(n - 1);
        console.log(`Move block ${n}`);
    }
}

moveBlocks(10);

```
![[Pasted image 20240126103517.png]]

In this JavaScript code, `moveBlocks` is a recursive function that takes a number `n` as an argument. If `n` is 0, it logs "All blocks moved." Otherwise, it calls itself with `n - 1` and then logs "Move block n". This continues until `n` reaches 0, at which point the recursion stops.

## Output

Move block 10 
Move block 9 
Move block 8 
Move block 7 
Move block 6 
Move block 5 
Move block 4 
Move block 3 
Move block 2 
Move block 1 
All blocks moved.
## Conclusion

Recursion is a powerful tool that can simplify complex problems by breaking them down into smaller, easier-to-handle instances. It's a fundamental concept in programming and is used in many areas, including sorting algorithms, tree traversal, and more.

Remember, the key to recursion is the base case. Without a base case, a recursive function will call itself indefinitely, leading to an infinite loop. So always ensure that your recursive functions have a clear and reachable base case.

That's it! You now have a basic understanding of recursion. Try to solve some problems using recursion to get a better grasp of this concept. Happy coding!