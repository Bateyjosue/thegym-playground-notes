JS was  not the best programming language to use class at it ES5 version because it was using the constructor function and prototype inheritance to create  a class like this:
```js
function Person (ssn, firstName, LastName){
	this.ssn = ssn;
	this.firstName = firstName;
	this.lastName = lastName;
}
```

> So to get the full name you have to define the a prototype method to get the full name of the person like this

```js
Person.prototype.getFullName = function (){
	return this.firstName + " "+this.lastName
}
```

> The you can instantiate the class person like this

 ```js
let person = new Person('171-28-0926','John','Doe')
console.log(person.getFullName)

// Output
John Doe
```

>> But with late version ES6 it was now possible to define a class using the`class` keyword

```js
class Person {
	ssn;
	firstName;
	lastName;
	
	constructor(ssn, firstName, lastName){
		this.ssn = ssn
		this.firstName = firstName
		this.lastName = lastName
	}
	getFullName(){
		return `${this.firstName} ${this.lastName}`;
	}
}
```

> You can also use and instantiate the class Person as following

```js
let person = new Person('171-28-0926','John','Doe'); console.log(person.getFullName());
```

In TypeScript you just to add [**type Annotations**](Type_Annotations) to methods and properties

```typescript
class Person{
	ssn:string;
	firstName: string;
	lastName: string
	constructor(ssn: string, firstName: string, lastName: string){
		this.ssn = ssn
		this.firstName = firstName
		this.lastName = lastName
	}
	getFullName(): sting {
		return `${this.firstName} ${this.lastName}`;
	}
}
```

### Access Modifiers

change the visibility of the properties and methods of a `class`. we have 3 access modifiers `private`, `protected` and `public`.

### Private modifier

It's limit the visibility to the same class only. any attempt to access the private properties or methods outside the class will result in an error at compile time.

```typescript
class Person {
	private ssn: string;
	private firstName: string;
	private lastName: string;
}
```
> Once the `private` property is in place, you can access the `ssn` property in the constructor or methods of the `Person` class.

Example
```ts
class Person {
    private ssn: string;
    private firstName: string;
    private lastName: string;

    constructor(ssn: string, firstName: string, lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`; 
    }
}
```
>> attempts to access the `ssn` property outside the class
```ts
let person = new Person('153-07-3130', 'John', 'Doe');
console.log(person.ssn); // compile error
```

### Public modifier

It allows class properties and methods to be accessible from all locations. by default properties and methods have `public` visibility if not specified
```ts
class Person {
 public getFullName(): string {
	return `${this.firstName} ${this.lastName}`;
 }
}
```
> `getFullName()` method of the `Person` class has `public` modifier 
> It has the same effect as if the `public` keyword were omitted

### Protected modifier
 It allows properties and methods of a class to be accessible within the same class and in the it subclasses.
**Syntax**
```ts
class Person {

    protected ssn: string;
    
    // other code
}

```
> the `ssn` will be now accessible within the `Person` class and in any class that inherits from the `Person` class

<div style="background-color:#c9f8de; color:black; padding: .5rem .7rem; border-radius: 4px;">
	<h2>Summary</h2>
	<ul>
		<li>Use `class` keyword to define a class in TypeScript</li>
		<li>TypeScript leverages the ES6 class syntax and adds 
		<a href="[[Type_Annotations]]">Type_Annotations</a>
		 t o make the class more robust</li>
		 <li>TypeScript provides three access modifiers to class properties and methods: <code>private</code>, <code>protected</code>, and <code>public</code>.</li>
		 <li>The <code>private` modifier allows access within the same class.</li>
		 <li>The <code>protected</code> modifier allows access within the same class and subclasses.</li>
		 <li>The <code>public</code> modifier allows access from any location.</li>
	</ul>
</div>
