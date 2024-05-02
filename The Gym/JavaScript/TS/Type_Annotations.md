you can use type annotations to specify the data type of a variable, parameter, or function return type.

<div style="background-color: #d9eee1; color:black; padding: 2rem 1rem; text-align: center;margin:2rem 1rem">
	These type annotations help TypeScript provide type checking and improve code reliability by catching type-related errors during development.
</div>

**Variable Type Annotation:**
```ts
let age: number; 
age = 30;
```

**Function Parameter Type Annotation:**

```ts
function greet(name: string): void { console.log(`Hello, ${name}!`); }
```
> In this example, `name` is a parameter with a type annotation of `string`, and the function returns `void`.

**Function Return Type Annotation:**
```ts
function add(a: number, b: number): number { return a + b; }
```

> Here, the `add` function has a return type annotation of `number`, indicating that it returns a numeric value.

**Array Type Annotation:**
```ts
let numbers: number[] = [1, 2, 3, 4, 5];
```
> This declares an array `numbers` that can only contain numbers.

**Object Type Annotation:**
```ts
let person: { name: string, age: number } = {
    name: "John",
    age: 30
};
```
> Here, `person` is an object with specific properties and their data types.

**Custom Type (Interface) Annotation:**
```ts
interface Point {
    x: number;
    y: number;
}

let point: Point = { x: 10, y: 20 };
```

> In this example, `Point` is a custom type defined using an interface, and `point` is a variable with this custom type.
