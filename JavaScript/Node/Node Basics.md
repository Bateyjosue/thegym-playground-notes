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
## Use of `global`, `process` and `Buffer`
In Node.js, you would use `global`, `process`, and `Buffer` under the following circumstances:

- **`global`**: You would use `global` when you want to define a global variable that should be accessible throughout your application. However, it's generally recommended to avoid defining too many global variables to prevent naming conflicts and to keep your codebase clean and manageable [1](https://www.geeksforgeeks.org/global-process-and-buffer-in-node-js/).

- **`process`**: This object is particularly useful when you need to interact with the running Node.js process. You might use `process` to:
    - Access command-line arguments with `process.argv`.
    - Get the current working directory with `process.cwd()`.
    - Exit the process with `process.exit()`.
    - Read environment variables with `process.env`.
    - Handle signals like SIGINT (Ctrl+C) and SIGTERM [1](https://www.geeksforgeeks.org/global-process-and-buffer-in-node-js/).

- **`Buffer`**: The `Buffer` class is used when you need to work with binary data. This could be necessary when you are:
    - Reading or writing to the filesystem, especially when dealing with non-text files.
    - Performing network communications, such as sending or receiving data over a socket.
    - Manipulating binary data, like encoding or decoding base64 strings.
    - Working with streams, where data is handled in chunks rather than all at once
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
```node
if(fs.existsSync('./file-name.txt')){
	fs.unlink('./file-name.txt', error => {
		if(error) {
			console.log(error)
		}
		console.log('file deleted')
	})
}
```


### Streams & Buffers

#### Streams
Start using data, before it has finish loading 
![[stream.png]]
##### Read stream
```node
const fs = require('fs')

const readStream = fs.createReadStream('./stream-text.txt', {encoding: 'utf8'})

readStream.on('data', chunk => {
	console.log(chunk)
})

```
##### Write stream
```node
const fs = require('fs')

const readStream = fs.createReadStream('./stream-text.txt', {encoding: 'utf8'})
const writeStream = fs.createWriteStream('./stream-text.txt')

readStream.on('data', chunk => {
	writeStream.write('\n')
	writeStream.write(chunk)
})

```
> there is a shorter way to write using the pipe

```node
readStream.pipe(writeStream)
```
# Exercises
### Exercise 1: Global Variables

Create a new Node.js script and define a global variable named `appName` with the value "MyApp". Then, log the value of `appName` to the console.
```js
global.appName = 'MyApp'

console.log(global.appName)
```
### Exercise 2: Command Line Arguments

Write a Node.js script that logs the first command line argument passed to it. If no arguments are provided, log a message indicating that no arguments were given.

```node
const arguments = process.args

if (arguments.length === 0) {
	console.log('no arguments were given')
}
console.log(arguments[0])
```

### Exercise 3: Environment Variables

Create a Node.js script that reads an environment variable named `MY_ENV_VAR` and logs its value. If the environment variable is not set, log a default value instead.
```node
const {MY_ENV_VAR} = process.env

if (!MY_ENV_VAR) {
	console.log('default')
} 

console.log(MY_ENV_VAR)
```

### Exercise 4: Binary Data Handling

Write a Node.js script that converts a string into a Buffer and then back into a string. Log both the original string and the converted string to the console.

### Exercise 5: File System Operations

Create a Node.js script that performs the following file system operations:

- Create a new text file named `test.txt` with the content "This is a test."
- Append the text " Appended text." to `test.txt`.
- Read the contents of `test.txt` and log it to the console.
- Delete `test.txt`.

### Exercise 6: Streams

Write a Node.js script that uses streams to copy the contents of a source file to a destination file. The source file should be named `source.txt`, and the destination file should be named `destination.txt`.

### Exercise 7: Error Handling

Modify the file copying script from Exercise 6 to include proper error handling. If an error occurs during any of the file operations, log the error message to the console.

### Exercise 8: Process Management

Create a Node.js script that sets a custom title for the process using `process.title`. After setting the title, log `process.title` to verify that it was changed successfully.

Remember to run each exercise in a separate Node.js environment to avoid conflicts between scripts. Good luck, and have fun coding!

___
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