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