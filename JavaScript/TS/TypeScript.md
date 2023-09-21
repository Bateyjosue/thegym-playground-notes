
## Type any
**```type any```** change your system and give you the access to the dynamic aspect of the JS programming language where by a variable can accept value of any primitive data type such string, number, Boolean and object. Which make it dangerous because we no longer have the static typing aspect of TS

## Type Aliases

<p>
	Type aliases allow you to create a new name for an existing type
</p>
<h4>Example</4>
```typescript
type alias = existingType;
```
<q>The existing type can be any valid TypeScript type <code style="color: red">string</code>, <code style="color: red">number</code>, <code style="color: red">boolean</code>, and <code style="color: red">object</code></q>
```typescript
/*The following example uses the type alias chars for the string type:*/
	type chars = string;
	let messsage: chars; // same as string type
/*It’s useful to create type aliases for union types. For example:*/
	type alphanumeric = string | number;
	let input: alphanumeric;
	input = 100; // valid
	input = 'Hi'; // valid
	input = false; // Compiler error
```

<div style="background-color: grey; padding: 1rem .5rem; border-radius: 10px;">
	<h4 style="text-decoration:underline; color: yellow">Important</h4>
	<p>Use type aliases to define new names for existing types</p>
</div>

<h2>Interface</2>
<p style="padding-left: 1rem">
	 define the contracts within your code. They also provide explicit names for type checking.
</p>
```typescript
function getFullName(person: {
	firstName: string;
	lastName: string
}) {
	return `${person.firstName} ${person.lastName}`;
}
let person = {
	firstName: 'John',
	lastName: 'Doe'
};

console.log(getFullName(person));
//Output
	John Doe
```

<p>
	If the argument has two properties whose types are string, then the TypeScript compiler passes the check. Otherwise, it’ll issue an error`.`

	As you can see clearly from the code, the <a href="(https://www.typescripttutorial.net/typescript-tutorial/typescript-type-annotations/"> type annotation</a>  of the function argument makes the code difficult to read.
</p>
<p>
To solve this, TypeScript introduces the concept of interfaces.

The following uses an interface called `Person` that has two string properties:
</p>
```typescript
	interface Person {
	    firstName: string;
	    lastName: string;
	}
```
<p>
	After defining the `Person` interface, you can use it as a type. And you can annotate the function parameter with the interface name:
</p>
```typescript
	function getFullName(person: Person) {
	    return `${person.firstName} ${person.lastName}`;
	}
	let john = {
	    firstName: 'John',
	    lastName: 'Doe'
	};
	console.log(getFullName(john));
```
<h3>Optional properties</h3>
<p>
	An interface may have optional properties. To declare an optional property, you use the question mark (`?)` at the end of the property name in the declaration, like this:
</p>
```typescript
interface Person {
	firstName: string;
	middleName?: string;
	lastName: string;
}
```

the Person interface has now two required properties and one optional property. and the following shows how to use the Person interface in the <code style="color: red">getFullName()</code> function

```typescript
function getFullName(person: Person) {
    if (person.middleName) {
        return `${person.firstName} ${person.middleName} ${person.lastName}`;
    }
    return `${person.firstName} ${person.lastName}`;
}

```

## Readonly properties

<p>
	If properties should be modifiable only when the objects is first created, you can use the <code style="color: red">readonly</code> keyword before the name of the property
</p>
```typescript
interface Person {
    readonly ssn: string;
    firstName: string;
    lastName: string;    
}

let person: Person;
person = {
    ssn: '171-28-0926',
    firstName: 'John',
    lastName: 'Doe'
}
```
In this example, the ssn property cannot be changed

```typescript
person.ssn = '171-28-0000';

//error TS2540: Cannot assign to 'ssn' because it is a read-only property.
```
### Function types
Interfaces also allow you to describe function types, you assign the interface to the function signature that contains the parameter list with types and returned types

```typescript
interface StringFormat {
    (str: string, isUpper: boolean): string
}

let format: StringFormat;

format = function (str: string, isUpper: boolean) {
    return isUpper ? str.toLocaleUpperCase() : str.toLocaleLowerCase();
};

console.log(format('hi', true));
```
### Class  types

The interface is used with classes to define a contract between unrelated classes

```typescript
interface Json {
   toJSON(): string
}

//The following declares a class that implements the `Json` interface:
class Person implements Json {
    constructor(private firstName: string,
        private lastName: string) {
    }
    toJson(): string {
        return JSON.stringify(this);
    }
}

//The following example shows how to use the `Person` class:

let person = new Person('John', 'Doe');
console.log(person.toJson());
//output
{"firstName":"John","lastName":"Doe"}
```

### Type vs Interface
They both help you to define a new name for an existing type but the major difference between them is that type can rename all the primitive type in TS while interfaces can only work with object like type.

## Functions
are the building blocks of readable, maintainable and reusable code.

**Syntax**
```typescript
function name(parameter: type, parameter:type,...): returnType {
   // do something
}
```

**Example

```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

>> Unlike js, ts allows you to use type annotations in parameters and return the value of a function

if a function does not return a value, you can use the type  <code style="color: red">void</code> as the return type. the <code style="color: red">void</code> keyword indicates that the function doesn't return any value

**Example

```typescript
function echo(message: string): void {
    console.log(message.toUpperCase());
}
```
<code style="color: red">void</code> prevents the code inside the function from returning a value and stop the calling code from assigning the result of the function to a variable.
>> When the return type isn't specify typescript will try to infer an appropriate type

```typescript
function add(a: number, b: number) {
    return a + b;
}
```

typescript will infer this to a <code style="color: red">:number</code> 
> However, if a function has different branches that return different types the compiler may infer <code style="color: red">union</code> type or <code style="color: red">any</code> type.
## Function Types
![[Function Types]]



## Intersection Types

An intersection type creates a new type by combining multiple existing types. 
To combine types, you use the `&` operator as follows

```typescript
type typeAB = typeA & typeB;
```

The `typeAB` will have all properties from both `typeA` and `typeB`

**Example**: 
```typescript
interface BusinessPartner {
	name: string;
	credit: number;
}

interface Identity {
	id: number;
	name: string;
}

interface Contact {
	id: number;
	phone: string;
}

type Employee = Identity & Contact;
type Customer = BusinessPartner & Contact;
```

the `Employee` type contains all properties of the `Identity` and `Contact` type
```typescript
type Employee = Identity & Contact;
let e: Employee = {
	id: 100,
	name: 'John Doe',
	email: 'john@gmail.com',
	phone: '(408)-897-5684'
};
```
And the `Customer` type contains all properties of the `BusinessPartner` and `Contact` type


## Typescript Class
![[Classes]]

## Type Annotations
![[Type_Annotations]]

---
## Kata
___
![[JavaScript/TS/Kata|Kata]]

---
## Mental Model

![[Mental Model]]
___
