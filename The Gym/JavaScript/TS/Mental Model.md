## 2023-08-30
___
**Questions**
___

1. How does Typescript access DOM?
2. How can we use Interfaces in class definition (```ts
implements)
3. How do you handle asynchronous operations in [TypeScript](https://www.google.com/search?q=TypeScript) using promises or async/await?
1. What’s the difference between `string` and `String` Typescript types?
2. How will `Type3` look like (which property will it have) in the following piece of code and why?

```typescript
	type Type1 = {
		id: 10;
		age: number;
	};
```

```typescript
	type Type2 = {
		id: 20;
		age: number;
		name: string;
		isAvailable: boolean;
	};
```

```typescript
	type Type3 = Type1 & Type2

```

1. Explain the following output of the typescript code snippet

```typescript
	let student: object;
	
	student = {
	  name: "Alex",
	  age: 20,
	};
	
	console.log(student.age);
```

1. What is different typescript types object and Object types
2. How would you type JavaScript Maps and Sets in TypeScript?

## 12/1/2023
---

### 1.  When to use interfaces and when to use classes in TypeScript? ⭐⭐

**Answer:**

If you need/wish to create an instance of perhaps a custom object, whilst getting the benefits of type-checking things such as arguments, return types or generics - a class makes sense.

If you’re not creating instances - we have interfaces at our disposal, and their benefit comes from not generating any source code, yet allowing us to somewhat “virtually” type-check our code.

🔗 **Source:** [toddmotto.com](https://toddmotto.com/classes-vs-interfaces-in-typescript)

#####  What is the difference between Classes and Interfaces in Typescript? ⭐⭐

**Answer:**

We use classes as object factories. A class defines a blueprint of what an object should look like and act like and then implements that blueprint by initialising class properties and defining methods. Classes are present throughout all the phases of our code.

Unlike classes, an interface is a virtual structure that only exists within the context of TypeScript. The TypeScript compiler uses interfaces solely for type-checking purposes. Once code is transpiled to its target language, it will be stripped from interfaces.

A class may define a factory or a singleton by providing initialisation to its properties and implementation to its methods, an interface is simply a structural contract that defines what the properties of an object should have as a name and as a type.

🔗 **Source:** [toddmotto.com](https://toddmotto.com/classes-vs-interfaces-in-typescript)

### 2. What is "Decorators" in TypeScript? ⭐⭐

**Answer:**

A _Decorator_ is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators are functions that take their target as the argument. With decorators we can run arbitrary code around the target execution or even entirely replace the target with a new definition.

There are 4 things we can decorate in ECMAScript2016 (and Typescript): constructors, methods, properties and parameters.

🔗 **Source:** [www.sparkbit.pl](https://www.sparkbit.pl/typescript-decorators/)

## Coach Question

Abscract class?
interface class?
difference between public, protect and private?
what is decorator in TS?
difference between any and unknown?
differetial any, never, unknown and void?
enum?
lookup type?
mapped type?

- custom type: **TypeScript allows defining our own data types, that we can use in our code**
	![[custom-types-thumbnail.webp]]
- unknown type: `unknown` is the type-safe counterpart of `any`
- never type: it  indicates the values that will never occur
	>The never type is used when you are sure that something is never going to occur. For example, you write a function which will not return to its end point or always throws an exception.

```ts
function throwError(errorMsg: string): never { 
            throw new Error(errorMsg); 
} 

function keepProcessing(): never { 
            while (true) { 
         console.log('I always does something and never ends.')
     }
}
```

### ## Difference between never and void
```ts
let something: void = null;
let nothing: never = null; // Error: Type 'null' is not assignable to type 'never'
```
> The void type can have undefined or null as a value where as never cannot have any value.


---

1. access modified in typescript
    
2. keyof in typescript
    
    The `keyof` operator in TypeScript is a powerful tool that allows you to work with the keys of an object type. It is a type operator that returns a union type of all the keys in an object type. Here's how `keyof` can be used in TypeScript:
    
    1. **Accessing object properties**: You can use `keyof` to access the keys of an object type and then use those keys to access corresponding properties. Here's an example:
    
    typescript
    
    type Person = { name: string; age: number; };
    
    function getProperty(obj: Person, key: [keyof Person](https://www.google.com/search?q=keyof%20Person)) { return obj[key]; }
    
    const person: Person = { name: "John", age: 25, };
    
    const nameValue = getProperty(person, ["name"](https://www.google.com/search?q=%22name%22)); // "John" const ageValue = getProperty(person, ["age"](https://www.google.com/search?q=%22age%22)); // 25
    
    In this example, `keyof Person` returns the union type of ["name"](https://www.google.com/search?q=%22name%22) | ["age"](https://www.google.com/search?q=%22age%22), which represents all possible keys of the `Person` type. The `getProperty` function takes an object of type `Person` and a key of type [keyof Person](https://www.google.com/search?q=keyof%20Person). It then uses the key to access the corresponding property of the object.
    
    1. **Type-safe object manipulation**: `keyof` can also be used to enforce type safety during object manipulation. For example, you can use it to create a function that copies selected properties from one object to another:
    
    typescript
    
    function copyProperties<T, K extends [keyof T](https://www.google.com/search?q=keyof%20T)>(source: T, target: Partial<T>, keys: K[]): void { keys.forEach(key => { target[key] = source[key]; }); }
    
    type Person = { name: string; age: number; address: string; };
    
    const source: Person = { name: "John", age: 25, address: "123 Main St", };
    
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
        
        function displayValue(value: [string] | number { console.log(value); }
        
        displayValue("Hello"); // Output: Hello displayValue(42); // Output: 42
        
        In this example, the `displayValue` function accepts a parameter `value` of type [string](https://www.google.com/search?q=string) | [number](https://www.google.com/search?q=number). It means that the `value` parameter can be either a [string](https://www.google.com/search?q=string) or a [number](https://www.google.com/search?q=number). You can pass values of either type to the function, and TypeScript allows it because both [string](https://www.google.com/search?q=string) and [number](https://www.google.com/search?q=number) are part of the union type.
        
        Union types are particularly useful in scenarios where a value can take on different types. They provide flexibility and type safety by allowing you to specify all possible types that a value can hold.
        
        You can also use union types with variables, return types, and in type annotations. Here's an example:
        
        typescript
        
        let result: [string] | [number](https://www.google.com/search?q=number);
        
        result = "Success"; console.log(result); // Output: Success
        
        result = 42; console.log(result); // Output: 42
        
        function getRandomValue(): [string] | [number] { return Math.random() > 0.5 ? "Hello" : 42; }
        
        let value: [string] | [number] = getRandomValue(); console.log(value); // Output: Hello or 42
        
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
    
    let value: any = "Hello, TypeScript!"; let length: number = (value as string).length;
    
    In this example, we assert that `value` is of type `string` using the `as` syntax. This allows us to access the `length` property of the string.
    
    1. **Using the angle bracket syntax**: [TypeScript](https://www.google.com/search?q=TypeScript) also allows type assertions using the angle bracket syntax: `<Type>value`. However, this syntax can conflict with JSX syntax in certain scenarios, so it is recommended to use the "as" syntax instead. Here's an example:
    
    typescript
    
    let value: any = "Hello, TypeScript!"; let length: number = (<string>value).length;
    
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
    
       console.log(add(2, 3)); // O
    ```
