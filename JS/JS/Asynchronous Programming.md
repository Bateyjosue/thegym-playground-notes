
What is the best way to handle Asynchronous? #card
is by using promises

What is promises?

___
## Promises
--- 
> Promise object represents the eventual completion or failure of an asynchronous operation and its resulting value.

#### Chaining

Here each subsequent operation starts when the previous operation succeeds, with the result from the previous step.

> Doing several async operations in a row would lead to the classic callback pyramid of doom or **Call back hell**

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