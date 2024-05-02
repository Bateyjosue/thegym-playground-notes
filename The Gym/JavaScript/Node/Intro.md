open source and cross-platform JavaScript runtime environment. that runs the v8 JavaScript engine, this help **[nodejs]** to be very performant.

Runs in a single process, without creating a new thread for every request.  Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm.

This allows Node.js to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency, which could be a significant source of bugs.

### V8

V8 is the name of the JavaScript engine that powers Google Chrome. It's the thing that takes our JavaScript and executes it while browsing with Chrome.


### What is Node.js
is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to execute JavaScript on the server side, which was traditionally a domain reserved only for languages like PHP, Java, Python, Ruby, etc.

With Node.js, developers can write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web application development around a single programming language, rather than different languages for server-side and client-side scripts.

#### JavaScript runtime
A JavaScript runtime refers to the environment where JavaScript code is executed. It includes the JavaScript engine (such as V8, SpiderMonkey, or Chakra), which interprets or compiles JavaScript code, and a set of APIs that provide functionalities beyond the core language itself. These APIs can include file system access, networking capabilities, and other utilities that allow JavaScript to interact with the operating system and external services.

**Examples of JavaScript runtimes include:**

- **V8**: Used by Google Chrome and Node.js, V8 is a high-performance JavaScript engine that compiles JavaScript code to native machine code, improving performance significantly 
- **SpiderMonkey**: The JavaScript engine used by Mozilla Firefox, SpiderMonkey is another example of a JavaScript runtime
- **Chakra**: Microsoft's JavaScript engine, Chakra, is used in Internet Explorer and Edge
- **Node.js**: Built on Chrome's V8 engine, Node.js provides a runtime environment for executing JavaScript on the server side. It includes additional features like an event-driven architecture and support for various input/output operations 
- **Deno**: Created by the original author of Node.js, Deno is a newer runtime that aims to address some of the issues with Node.js, such as a better module system and improved security
- **Bun**: Another modern JavaScript runtime that focuses on speed, elegant APIs, and a cohesive developer experience, similar to Node.js but with some differences in implementation

## Quid?
  
### What is the difference between the runtime environment in Node.js and a browser environment?

- **Environment Purpose**: Node.js is designed for server-side development, allowing JavaScript to run outside of the browser. Browsers, on the other hand, are designed to host client-side applications where JavaScript interacts with the Document Object Model (DOM) to manipulate web pages 

- **User Interface**: Browsers provide a graphical user interface (GUI) for web pages, whereas Node.js operates via a command-line interface (CLI) since it doesn't deal with user interfaces. This distinction affects how JavaScript is executed and rendered in each environment 

- **Access to Global Objects**: In the browser, JavaScript has access to global objects like `window` and `document`, which represent the browser window and the loaded HTML document. Node.js does not have these objects since it doesn't run in a browser context. Instead, Node.js provides its own set of global objects, such as `process` and `Buffer` 

- **Module System**: Node.js supports both CommonJS (`require()`) and ES Modules (`import`) for loading modules, whereas browsers primarily use ES Modules with the `import` statement. This means that you can use both `require()` and `import` in Node.js, while you are limited to `import` in the browser 
- - **File System Access**: Node.js has direct access to the file system, making it suitable for tasks like reading and writing files, which isn't possible in a browser environment due to security restrictions. Browsers restrict access to the local file system for security reasons 

- **Architecture**: The architecture of Node.js is simpler compared to browsers, which have a more complex setup including a rendering engine alongside the JavaScript engine. Node.js's architecture is centered around the V8 engine, event-driven I/O, and the Libuv library for handling asynchronous operations

### Computers and Code
we write code and the programming will compile them down to machine code
- we can not run directly run JS on a computer but we can run in browser using the V8 engine which is in charge of compiling them down to machine, but outside of the browser we can run our JS using Node.js which uses also V8 engine
#### Node is more than v8
- Read & write files on a computer
- Connect to a database
- Act as  a server for content

> while try to run JS outside of the browser we the access to the DOM

### Role of Node.js
![[node.png]]

- No need to learn an extra language for server
- can share code between front and back end
- Node.js has a massive community behind it
- Huge amount of third-party packages & tools to help
# The Node.js Event Loop, Timers, and `process.nextTick()`
## What is the Event Loop?
The Event Loop is a mechanism in Node.js that enables it to handle asynchronous operations efficiently. It works by offloading I/O operations to the system kernel, which is multi-threaded and can process multiple operations concurrently. When an operation is complete, the kernel notifies Node.js, which then adds the corresponding callback to the poll queue for execution. This allows Node.js to continue executing other code without waiting for I/O operations to complete, thus maintaining its non-blocking nature despite JavaScript's single-threaded execution model.
### The Poll Queue or Event Queue
The poll queue, also known as the [event queue] is a data structure used by Node.js to manage callbacks that are ready to be executed. When an asynchronous operation is completed, such as a file read or a network request, the corresponding callback function is placed into the poll queue.

Here's how the poll queue works within the context of the Event Loop:

1. **Callback Registration**: When an asynchronous operation is initiated, a callback function is registered to be executed once the operation is complete.

2. **Kernel Notification**: The system kernel, which handles the I/O operations, notifies Node.js when the operation is done.

3. **Event Loop Check**: The Event Loop periodically checks the poll queue to see if there are any callbacks waiting to be executed.

4. **Callback Execution**: If there are callbacks in the poll queue, the Event Loop takes the first one and executes it. This is done in a non-blocking manner, meaning that the Event Loop can continue to handle other operations while the callback is being executed.

5. **Continuous Loop**: The Event Loop continues to loop through the poll queue, executing callbacks as they become available, until the poll queue is empty.

The poll queue is a crucial part of Node.js's non-blocking I/O model, which allows it to handle many operations concurrently without waiting for each one to complete before moving on to the next, thus maximizing throughput and efficiency.

The Event Loop in Node.js is a mechanism that handles the execution of JavaScript code in a non-blocking manner. It processes asynchronous operations and callbacks in a specific order, which is defined by several phases. Here's a summary of the Event Loop's phases and their functions:

1. **Timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration.
3. **Idle, Prepare**: Internal phases used by Node.js.
4. **Poll**: Retrieves new I/O events and executes I/O-related callbacks. Node.js may block here when appropriate.
5. **Check**: Executes `setImmediate()` callbacks.
6. **Close Callbacks**: Executes close callbacks for resources like sockets.

The Event Loop continuously cycles through these phases, executing callbacks from the relevant queues. If a phase's queue is empty, the Event Loop will wait for callbacks to be added to the queue before continuing.

`setImmediate()` and `setTimeout()` are similar but behave differently. `setImmediate()` is designed to execute a script once the current poll phase completes, while `setTimeout()` schedules a script to run after a minimum threshold in milliseconds has elapsed.

`process.nextTick()` is not part of the Event Loop phases but is used to queue callbacks to be executed on the next iteration of the Event Loop, after the current operation completes. It's used to handle errors, clean up resources, or to allow a callback to run after the call stack has unwound but before the Event Loop continues.

In summary, the Event Loop in Node.js is a complex system that manages the execution of asynchronous operations and callbacks in a non-blocking manner, ensuring that the JavaScript runtime can handle a large number of operations efficiently.

REPL

___
## Quid? 
### 1. What is the difference between event loop and poll queue?
> the Event Loop is the process that manages the execution of callbacks, while the poll queue is the data structure that holds these callbacks until they are ready to be executed by the Event Loop. The Event Loop continuously checks the poll queue and executes the callbacks in it, allowing Node.js to handle asynchronous operations efficiently without blocking the main thread.

**Event Loop**:
- The Event Loop is the mechanism that drives the execution of JavaScript code in a non-blocking manner.
- It is responsible for continuously checking the poll queue for any callbacks that are ready to be executed.
- The Event Loop runs in a single thread and is the core of Node.js's concurrency model.

**Poll Queue**:
- The poll queue, also known as the event queue, is a data structure that holds callbacks that are ready to be executed.
- When an asynchronous operation is completed, its callback is placed into the poll queue.
- The Event Loop checks the poll queue to determine which callbacks to execute next.
### 2. REPL
> stands for Read-Eval-Print Loop. It is an interactive programming environment that takes single user inputs, evaluates them, and returns the result to the user.
1. **Read**: The REPL reads the user's input.
2. **Eval**: The REPL evaluates the input.
3. **Print**: The REPL prints the result of the evaluation.
4. **Loop**: The REPL then waits for the next input, and the cycle repeats.