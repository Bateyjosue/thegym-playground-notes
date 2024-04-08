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
- 