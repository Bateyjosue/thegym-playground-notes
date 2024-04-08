```js
var x = "5"
x = x + 1  // "51"

var y = "5"
y++ //5
y // 6
```
> when using + it convert the 1 to string, while using ++ it convert the "5" to integer

## Types
- Primitive types
- Abstract Operation
- Coercion
- Equality
- TypeScript, Flow, etc.

## Scope
- Nested Scope
- Hoisting
- Closure
- Modules
## Objects(Oriented)
- this
- class{}
- Prototypes 
- OO vs OLOO


### Types:  
## Primitive types
- undefined = does not currently have a value
- string
- number
- boolean
- object
- symbol

- null?
- function?
- array?
- bigint?

> In JavaScript, Variables don't have types, values do.

#### typeof operator

it is always return a string, it return the type of the values which contain in certain variable.

```js
typeof null
```
> this will return "object"

```js
typeof function (){}
```
> this will return "function", 

```js

var v = 42n
typeof v

```
> this will return "bigInt"

#### Undefined VS undeclared
- [undeclared] means it never been declared
- [undefined] means does not currently have a value
- [uninitialized] (TDZ) can't be touched unless you gonna get an temporary dead zone

#### Special value
- NaN (Not a number), the only value that does not have the identity property
- indicate invalid number
- we can use the function `isNaN` to verify if a variable contain a valid NaN

#### Negative Zero

#### Fundamentals Objects
- native functions
- build-in objects
##### Use `new`
- Object()
- Array()
- Function()
- Date()
- RegExp()
- Error()
> this should be used if you need to construct an object of this fundamentals type use this objects.

##### Should be used with `new`
- String()
- Number()
- Boolean()
> should be used as functions

## Abstract Operations aka Coersion
### ToPrimitive(hint)
###### hint
**hint: "number"**
- valueOf()
- toString()

**hint: "string"**
- toString()
- valueOf()
> it is result in an error if we try both of those and does not give a primitive

### ToString()
> takes any values and give it representation in string form

![[Screenshot from 2024-04-08 16-28-31.png]]
If we call 
`ToString(object): => ToPrimitive(string)`![[Screenshot from 2024-04-08 16-34-46.png]]
### ToNumber()
![[Screenshot from 2024-04-08 16-53-47.png]]
> ![[Screenshot from 2024-04-08 17-08-41.png]]

### Cases of coersion
- unary operator invoke ToNumber() operator
- use the Number function

### Closure
- when a function remembers its lexical scope even when the function is executed outside that lexical scope.
```js
function ask(question) {
	setTimeout(function waitASec() {
		console.log(question)
	}, 100)
}

ask('Waht is closure?')
```
> closure is build in scope basics.
> Closure close over the variables not the value mean it preserves access to the variable.

#### Module Pattern
- modules [[encapsulate]] data and behavior together. the state (data) of a module is held by its methods via closure.
```js
var workshp = (function Module(techer){
	var publicAPI = {ask, }
	return publicAPI;
	function ask(question) {
		console.log(teacher, question)
	}
}("Josh")

workshop.ask("It's a module, right?")
```
>  in here closure prevent the scope to go away. so during garbage collection it will untouchable 