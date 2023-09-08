
What is the best way to handle Asynchronous? #card
is by using promises

What is promises?

___
## Promises
--- 
> Promise object represents the eventual completion or failure of an asynchronous operation and its resulting value.

#### Chaining

Here each subsequent operation starts when the previous operation succeeds, with the result from the previous step.

> Doing several asynchronous operations in a row would lead to the classic callback pyramid of doom or **Call back hell**

```javascript
doSomething(function (result) {
  doSomethingElse(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log(`Got the final result: ${finalResult}`);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);

```

But this can be accomplish now using promise chain. the API design of promises makes this great, because callbacks are attached to the returned promise object, instead of being passed into  function.

> The <code style="color: red">then()</code> function returns a new promise, different from the original

```js
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);

```
> with this pattern, you can create longer chains of processing, where each promise represents the completion of the one asynchronous step in the chain
> Then arguments to <code style="color: red">then()</code> are optional, and <code style="color: red">catch(failureCallback)</code> is short for <code style="color: red">then(null, failureCallback)</code>, so if your error handling code is the same for all steps, you can attach it to the end of the chain:


```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

> if the previous handler started a promise but did not return it, there's no way to track its settlement anymore, and the promise is said to be **floating**

###### Example
```js
const listOfIngredients = [];

doSomething()
  .then((url) => {
    // I forgot to return this
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        listOfIngredients.push(data);
      });
  })
  .then(() => {
    console.log(listOfIngredients);
    // Always [], because the fetch request hasn't completed yet.
  });

```

>>>> Whenever an operation encounters a promise, return it and defer its handling to the next  <code style="color: red">then</code> handler

###### Example
```js
const listOfIngredients = [];
doSomething()
  .then((url) => fetch(url))
  .then((res) => res.json())
  .then((data) => {
    listOfIngredients.push(data);
  })
  .then(() => {
    console.log(listOfIngredients);
  });

```
##### Common mistakes
1. Bad Example
```js
// Bad example! Spot 3 mistakes!

doSomething()
  .then(function (result) {
    // Forgot to return promise from inner chain + unnecessary nesting
    doSomethingElse(result).then((newResult) => doThirdThing(newResult));
  })
  .then(() => doFourthThing());
// Forgot to terminate chain with a catch!

```
- not to chain things together properly by creating a promise but forget to return it;
- nest unnecessarily, enabling the first mistake, nesting also limits the scope of inner error handlers which can lead to uncaught error;
- forgetting to terminate chains with <code style="color: red">catch</code>, which can lead to uncaught promise rejections in most browsers.

>> A good rule of thumb is to always either return or terminate promise chains, and as soon as you get a new promise, return it immediately, to flatten things

###### Example
```js
doSomething()
  .then(function (result) {
    // If using a full function expression: return the promise
    return doSomethingElse(result);
  })
  // If using arrow functions: omit the braces and implicitly return the result
  .then((newResult) => doThirdThing(newResult))
  // Even if the previous chained promise returns a result, the next one
  // doesn't necessarily have to use it. You can pass a handler that doesn't
  // consume any result.
  .then((/* result ignored */) => doFourthThing())
  // Always end the promise chain with a catch handler to avoid any
  // unhandled rejections!
  .catch((error) => console.error(error));

```
#### Why Promises

>> promises solve a major flaw with the callback pyramid of doom, by catching all errors, even throw exceptions and programming errors.

#### Promise Rejection Event

1. `unhandledrejection` sent when a promise is rejected but there is no rejection handler available
2. `rejectionhandled` sent when a handler is attached to a rejected promise that has already caused an `unhandledrejection`

>>> If a promise rejection event is not handled by any handler, it bubbles to the top of the call stack, and the host needs to surface it. 

### Composition

There are four composition tools for running asynchronous operations: `Promise.all()`,  `Promise.allSettled()`, `Promise.any()`, and `Promise.race()`

Sequential composition can also be done more succinctly with async/await

```js
let result;
for (const f of [func1, func2, func3]) {
  result = await f(result);
}
/* use last result (i.e. result3) */
```

#### Task queues vs microtasks

>> Promise callbacks are handled as a **microtask** whereas `setTimeout()` callbacks are handled as task queues.

```js
const promise = new Promise((resolve, reject) => {
  console.log("Promise callback");
  resolve();
}).then((result) => {
  console.log("Promise callback (.then)");
});

setTimeout(() => {
  console.log("event-loop cycle: Promise (fulfilled)", promise);
}, 0);

console.log("Promise (pending)", promise);
// output
`Promise callback
Promise (pending) Promise {<pending>}
Promise callback (.then)
event-loop cycle: Promise (fulfilled) Promise {<fulfilled>}
```

## Description About Promise

It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

A `Promise` is in one of these states

1. `pending`: initial state, neither fulfilled nor reject
2. `fulfilled`: meaning that the operation was completed successfully
3. `rejected`: meaning that the operation failed
4. settled: Something happened either fulfilled or rejected![[Pasted image 20230901183108.png]]

 > I promise can only settle once whether **fulfilled** or **rejected** 
 
 ##### Example
 ```js
 new Promise((resolve, reject) => {
	resolve('Hi') // works
	resolve('bye') // can't happen a second time 
});
```

### When should I use Promises

Here are some situations where you should use Promises:

1. **Fetching Data from APIs:** When making HTTP requests to APIs or fetching data from a server, you often have to wait for the response. Promises allow you to handle the asynchronous nature of these requests and process the data once it's available.
    
2. **Reading/Writing Files:** File operations, such as reading from or writing to files, are typically slow and asynchronous. Promises can be used to handle these operations in a non-blocking way.
    
3. **Database Operations:** When working with databases, queries can take time to execute. Promises are useful for handling database operations and waiting for results.
    
4. **Timed Operations:** When you need to perform an action after a certain period of time, such as a delayed animation or a timeout, Promises can be used with `setTimeout` or `setInterval` to manage the timing.
    
5. **Parallel Operations:** When you have multiple asynchronous tasks that can run concurrently and you need to wait for all of them to complete, Promises can be used with functions like `Promise.all`.
    
6. **Error Handling:** Promises have built-in error handling through the `.catch` method, making it easier to manage and propagate errors in asynchronous code.
    
7. **Chaining Operations:** Promises are chainable, which means you can sequence multiple asynchronous operations in a clean and readable manner using methods like `.then`.
    
8. **Async/Await:** With the introduction of async/await in modern JavaScript, Promises have become even more convenient. You can use the `async` keyword to define asynchronous functions that can `await` Promises, making your code appear more synchronous and easier to read.

> A promise is a try and catch wrapper that will finish at a unpredictable time

### Q Style Promise
 ![[Q style promises]]
 <h2>fetchAPI</h2>
![[fetchAPI]]

## Series vs Parallel Requests

1. **Action in series**: occur one after another, sync code is always in series
2. **Action in Parallel**: occur simultaneously, async can be in series or parallel

## Array Methods and Promises

 ### Promises with `.forEach()`

```js
getJSON('url')
.the(function(response){
	let seq = Promise.resolve();
	response.results.forEach(function(url){
		getJSON(url).then(createPlanetThumb);
	});
})
```

 ### Promises with `Promise.all()`

It's take a array of promises and execute the promise for each element to return a an array of values in the same order  as the origin promises

> - Rejects if just one Promise reject
> - Resolves after every Promise resolves



```js
getJSON('../data/earth-like-results.json')

    .then((response) => Promise.all(response.results.map(getJSON)))
    .then(planetData => {
      planetData.forEach(planet => createPlanetThumb(planet));
    })
    .catch(error => console.log(error));
  });
```

## JS Callbacks

<div style='background-color: #d9eee1; color:black; padding: 1rem; text-align: center;'> 
	<p>
			A Callback is  a function passed as an argument to another function
	</p>
	<p>
			This technique allows a function to call another function
	</p>
	<p>
			A callback function can run after another function has finished
	</p>
</div>

## Event Loop

the runtime can  run one task at a time but browser gives us other things like the webAPIs, callback Queue and event loop.
The V8 has **callback** and **Heap**, it does not know about the Call Stack, Event Loop and Callback Queue provided by the browser
![[Pasted image 20230908173540.png]]

1. **Memory Heap**: is for memory allocation
2. **Call stack** is for Execution context

SO the V8 doesn't know about the setTimeout, DOM, HTTP Request, that why the browser add them for use to be used

![[Pasted image 20230908174528.png]]

1. Calls tack:  One thread == One call stack  == one thing at a time

> so while executing a slow code can make our application blocking. therefor, it must wait for the current execution to finish, that where <mark>asynchronous callbacks</mark> comes in.

**JavaScript and Asynchronous Operations:**

JavaScript is single-threaded, meaning it can only execute one operation at a time. When a piece of code is running, it occupies the call stack, which is like a to-do list for the JavaScript engine. It processes tasks one by one in a sequential manner.

However, not all operations in a web application are quick and efficient. Some tasks, like fetching data from a server, waiting for user input, or performing animations, may take time. If these time-consuming tasks were executed synchronously, they would block the entire application, causing it to freeze.

**Asynchronous Callbacks:**

To handle such situations and keep the application responsive, JavaScript introduces the concept of asynchronous callbacks. When a task takes time to complete, rather than blocking the main thread of execution, JavaScript schedules it to run in the background and continues executing other code. When the background task finishes, it notifies the JavaScript engine by placing a callback function in a queue.

**Event Loop:**

Here's where the event loop comes into play. The event loop is a crucial part of JavaScript's runtime environment. It continuously checks two main components:

1. **Call Stack:** The call stack is like a stack of function calls. It keeps track of what code is currently being executed. When a function is called, it's pushed onto the stack, and when it's completed, it's popped off the stack.
    
2. **Callback Queue:** The callback queue holds callback functions that are ready to be executed. These callbacks are the result of asynchronous tasks, like timers, HTTP requests, or user interactions.
    

**How It Works:**

1. When a JavaScript script is running, it starts by executing the initial code (synchronous operations) and filling up the call stack.
    
2. If an asynchronous operation, like a `setTimeout` or an AJAX request, is encountered, JavaScript doesn't block the main thread. Instead, it schedules the operation to be executed later.
    
3. Once the asynchronous operation is completed, its callback function is placed in the callback queue.
    
4. The event loop continuously checks if the call stack is empty. If it is, it picks the first function from the callback queue and pushes it onto the call stack for execution.
    
5. This process continues, allowing asynchronous tasks to complete without blocking the main thread.

### How Event Loop works

> the event loop in JavaScript is responsible for managing asynchronous operations like callbacks, promises, and timers. It ensures that these operations are executed in the appropriate order while keeping the main thread responsive

**1. Call Stack:**

At the core of the event loop is the call stack. It's a data structure that keeps track of function calls in your code. When you invoke a function, it's pushed onto the stack, and when the function completes, it's popped off the stack.

The call stack ensures that JavaScript executes code in a single-threaded, synchronous manner. Only one function is processed at a time.

**2. Callback Queue and Microtask Queue:**

Besides the call stack, there are two important queues in the event loop:

- **Callback Queue:** This queue holds callback functions that are ready to be executed. Callbacks come from asynchronous operations like timers (`setTimeout`, `setInterval`), user interactions (click events), or AJAX requests.
    
- **Microtask Queue:** This is a priority queue that holds microtasks. Microtasks are usually promises and their associated `.then()` handlers. Microtasks are processed before callbacks in the callback queue.
    

**3. Event Loop Steps:**

Here's a simplified step-by-step breakdown of how the event loop works:

1. When your JavaScript code starts running, it executes the initial synchronous code and fills up the call stack.
    
2. If an asynchronous operation is encountered (e.g., `setTimeout`, promise resolution, or an event listener), JavaScript doesn't wait for it to complete. Instead, it schedules it for later execution and continues with the next task.
    
3. Once the call stack is empty (i.e., no synchronous code is running), the event loop checks if there are any microtasks in the microtask queue. If there are, it processes them one by one until the microtask queue is empty.
    
4. After all microtasks are executed, the event loop checks the callback queue for pending callback functions.
    
5. If there are callback functions in the callback queue, the event loop takes one callback at a time and pushes it onto the call stack for execution. This process continues until the callback queue is empty.
    
6. Asynchronous tasks are processed in the order they were added to the callback queue. If multiple asynchronous tasks complete at the same time, they are placed in the queue based on their priority.
    
7. The event loop continues this cycle indefinitely, checking for microtasks and then checking the callback queue, ensuring that asynchronous tasks are executed when they are ready.
    

**Important Note:**

The event loop's behavior ensures that JavaScript remains non-blocking. It allows you to initiate time-consuming or I/O-bound tasks without freezing the main thread. This is essential for creating responsive web applications.