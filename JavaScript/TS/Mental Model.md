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
