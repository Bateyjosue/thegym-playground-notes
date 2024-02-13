## The Global Object
in Node.js the global object is `global` whereby in the browser is `window`.

```node
console.log(global)
global.setTimeout(() => {
	console.log('in the timeout')
}, 3000)
```

### Modules and require

you can `require` to import a module

> .people.js
```js
const people = ['Yosh', 'Jonas', 'Jones']
console.log(people)


```

> .modules.js
```js
const names = require('./people')
```

> we should export from people so it can be available in module
> the following code need to be added in .people
> `module.exports = people` so we can access the list of people in modules

#### How to export multiple elements

```node
module.exports = {
	people,
	ages
}
```

##### Can be accessed as following
```node
const { people, ages } = require('./people')

console.log(people)
console.log(ages)
```

##### How to require built-in module

```js
const os = require('os)
```

###### os modules object

- cpus
- freemen
- homedir
- hostname
- platform
- release
- tmpdir
- userInfo
- version
- machine

### The file system

this can be used to read, create and delete files in our computer. the built-in module in charge of this operation is called `fs` module.
to use it import the following module
```node
const fs = require('fs')
```
#### Read file
```node
fs.readFile('./filename.txt', (error, data) => {
	if (error) {
		console.log(error)
	}
	console.log(data)
})
```
> the following code will return a buffer, so we use `toString()` to convert to plaintext

```node
fs.readFile('./filename.txt', (error, data) => {
	if (error) {
		console.log(error)
	}
	console.log(data.toString())
})
```

#### Write file
```node
fs.writeFile('./filename', 'text to be written', () => {
	console.log('file written')
})

```
> if you try to write on file that does not exist it will create one and then write to it

#### Directories
```js
fs.mkdir('./directory-name', error => {
	if (error) {
		console.log(error)
	}
	console.log('folder created')
})
```
> if you try to add a file which already exist will raised an error that the `file already exit`
> -  a good trick before this code is to check if the folder already exist and then create if it doesn't exist

```node
if(!fs.existsSync('./derectory-name')){
	fs.mkdir('./directory-name', error => {
		if (error) {
			console.log(error)
		}
		console.log('folder created')
	})
} else {
	fs.rmdir('./directory-name', error => {
		if(error) {
			console.log(error)
		}
		console.log('folder removed')
	})
}
```
> we provide an `else` clause to run if the file does exist, now it should be removed 

#### Delete file
## Quid?

### Difference between `global`, `process` and `Buffer` in Node.js?

In Node.js, `global`, `process`, and `Buffer` are global objects that provide access to various features of the Node.js runtime environment:

- **`global`**: This object is a namespace object for all global variables, i.e., variables that are available throughout the entire application. In Node.js, `global` is a global object that holds all globally accessible variables [4](https://nodejs.org/api/globals.html).

- **`process`**: This is a special object that provides information about, and control over, the current Node.js process. It is an instance of `EventEmitter` and provides methods for working with the process environment, such as getting command-line arguments, exiting the process, and managing signals. `process.env` is an object that contains the user environment [3](https://stackoverflow.com/questions/52861964/node-js-how-does-process-env-differ-from-global)[4](https://nodejs.org/api/globals.html).

- **`Buffer`**: This is a class that provides a way to work with binary data. It is used to handle raw binary data, which can be manipulated in various ways, such as converting between strings and binary data. Buffers are useful when dealing with I/O operations, such as reading files, making network requests, or working with databases

 Here's a brief example of how you might use these objects:
```js
// Using global to define a global variable
global.myGlobalVar = 'Hello, World!';

// Using process to get command-line arguments
console.log(process.argv); // Outputs the array of command-line arguments passed to the Node.js process

// Using Buffer to create a buffer and manipulate it
const buf = Buffer.from('Hello, World!', 'utf8');
console.log(buf.toString()); // Outputs 'Hello, World!'

```
> It's important to note that while these objects are available globally, they should be used judiciously to avoid polluting the global namespace, which can lead to hard-to-debug issues.