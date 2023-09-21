TypeScript has two part the parameters and return type. and when you declaring the function type you need to specify both parts 
**Syntax

```typescript
(parameter: type, parameter:type,...) => type
```
 **Example
 
```typescript
let add: (x: number, y: number) => number;
```

> Note that the parameter names `x` and `y` are just for the readability purposes. as long as the type of parameters match, is is valid type for the function.

Typescript compiler will match the number of parameters with their types and the return type.

```typescript
add = function (x: number, y: number) {
    return x + y;
};
//or

let add: (a: number, b: number) => number =
    function (x: number, y: number) {
        return x + y;
    };
```

#### Inferring function types

Typescript does **contextual typing** whereby the compiler figure out the function type when you have the type on one side of the equation

![[Pasted image 20230904080523.png]]

#### Optional Parameter

TypeScript compiler checks every function call and issues an error in the following cases:
1. Different number of parameters and arguments specified on the declaration;
2. Types of arguments are not compatible with the type of function parameters

> 	So, you may need to use a <code style="color:red">?</code> to make a parameter optional after the parameter name just like in interfaces

**Example**

```typescript
function multiply(a: number, b: number, c?: number): number {

    if (typeof c !== 'undefined') {
        return a * b * c;
    }
    return a * b;
}
```

> Note that if you use the expression `if(c)` to check if an argument is not initialized, you would find that the empty string or zero would be treated as `undefined`.

#### Default Parameters

Since ES6 default parameters are supported in JavaScript

**Syntax**

```typescript
function name(parameter1=defaultValue1,...) {
   // do something
}
```

the function will take the default initialed values for omitted parameters if you don't pass arguments or pass `undefined` into the function when call it

**Example**

```typescript
function applyDiscount(price: number, discount: number = 0.05): number { 
	return price * (1 - discount); 
}

console.log(applyDiscount(100)); // 95
```

> When you don't pass the discount argument into the `applyDiscout()` function, the function uses a default value which is `0.05`.

<div style="padding-left: 1rem;background-color:#ffe5e8; color:#ec5525; padding: .5rem .7rem; border-radius: 4px;">
<h4 stype="text-decoration:linethrough">Caution</h4>
	You cannot include default parameters in function type definitions.
</div>
**Example**
```typescript
let promotion: (price: number, discount: number = 0.05) => number;
// OutPut
//error TS2371: A parameter initializer is only allowed in a function or constructor implementation.
```

#### Rest Parameters

Rest parameters allows a function to accept zero or more arguments of the specified type.
Rule in typescript
- Function has only one rest parameter
- the rest parameter appears last in the parameter list
- the type of the res parameter is an array type

>> To declare a rest parameter, you prefix the parameter name with three dots and use the array type as the type annotation

**Syntax**
```typescript
function fn(...rest: type[]) {
   //...
}
```
**Example

```typescript
function getTotal(...numbers: number[]): number {
    let total = 0;
    numbers.forEach((num) => total += num);
    return total;
}
```
In this example, the `getTotal()` calculates the total of numbers passed into it.
>>> Since the numbers parameter is a rest parameter, you can pass one or more numbers to calculate the total

```js
console.log(getTotal()); // 0
console.log(getTotal(10, 20)); // 30
console.log(getTotal(10, 20, 30)); // 60
```

#### Function Overloadings
Function overloadings allow you to  establish the relationship between the parameter types and result types of a function.

**Example**
```typescript
function addNumbers(a: number, b: number): number {
    return a + b;
}

function addStrings(a: string, b: string): string {
    return a + b;
}
```

In this example:

- The `addNumbers()` function returns the sum of two numbers.
- The `addStrings()` function returns the concatenation of two strings.

It’s possible to use a [union type](https://www.typescripttutorial.net/typescript-tutorial/typescript-union-type/) to define a range of types for function parameters and results
```typescript
function add(a: number | string, b: number | string): number | string {
    if (typeof a === 'number' && typeof b === 'number')
        return a + b;

    if (typeof a === 'string' && typeof b === 'string')
        return a + b;
}
```

>> However, the union type doesn't express the relationship between the parameter types and results accurately

> To better describe the relationships between the types used by function, typescript supports function overloadings

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
   return a + b;
}
```
In this example, we added two overloads to the `add()` function. The first overload tells the compiler that when the arguments are numbers, the `add()` function should return a number. The second overload does the same but for a string.

>>> Now, When you call `add()` function, the code editor suggests that there is an overload function available as show in the following picture\
![[Pasted image 20230905083446.png]]
#### Function overloading with optional parameters

When you overload a function, the number of required parameters must be the same. If an overload has more parameters than the other, you have to make the additional parameters optional. For example:
```typescript
function sum(a: number, b: number): number;
function sum(a: number, b: number, c: number): number;
function sum(a: number, b: number, c?: number): number {
    if (c) return a + b + c;
    return a + b;
}

```

<div style="background-color:#c9f8de; color:black; padding: .5rem .7rem; border-radius: 4px;">
	<h2>Summary</h2>
	<ul>
		<li>Use type annotations for function parameters and return type to keep the calling code inline and ensure the type checking within the function body</li>
		<li>By doing type inference, you can significantly reduce the amount of code with annotation</li>
		<li>Use the <code style="color:red">parameter?: type</code> syntax to make a parameter optional.</li>
		<li>Use the expression <code style="color:red">typeof(parameter) !== 'undefined'</code> to check if the parameter has been initialized</li>
		<li>Use default parameter syntax <code>parameter:=defaultValue</code> if you want to set the default initialized value for the parameter</li>
		<li>default parameters are optional</li>
		<li> To use the default initialized value of a parameter, you omit the argument when calling the function or pass the <code>undefined</code></li>
		<li> rest parameters allow you to represent an indefinite number of arguments as an array.</li>
		<li>TypeScript function overloadings allow you to describe the relationship between parameter types and the results of a function</li>
	</ul>
</div>

