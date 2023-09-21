## 08.09.2023
---
1. what is promises chaining
2. how does `finally` work
3. What is asynchronous programming?
4. Event loop
5. Promise and async ... await

### Coach Question
___
- What is asynchronous programming in JavaScript and why is it important?
- Can you explain the Event Loop in JavaScript and its role in asynchronous programming?
- What is promise chaining?
- Can you explain the difference between "promise" and "async/await" in ES6?
	==Promises provide a way to work with asynchronous operations using a chainable syntax, while `async/await` is a more modern and concise way to work with Promises, making asynchronous code more readable and structured, especially for complex asynchronous workflows.
- How can you handle multiple asynchronous tasks in JavaScript?
	==Handling multiple asynchronous tasks in JavaScript can be achieved using various methods. Callbacks can be used by defining functions executed upon task completion, but they can lead to complex nesting. Promises offer cleaner chaining with `.then()` methods and allow waiting for all or the first resolved/rejected promise with `Promise.all()` and `Promise.race()`. `async/await`, a modern approach, provides readability by allowing asynchronous code to resemble synchronous code. Event emitters or libraries like RxJS are suitable for complex event-driven scenarios, while async libraries like `async.js` offer utilities for task management, including series and parallel execution. The choice depends on the complexity and maintainability of your code, with Promises and `async/await` being popular modern choices for clear and structured asynchronous code.
- In what order will the logs below show up in the console?
    
    ```jsx
    console.log('First')//1
    
    setTimeout(function () {
      console.log('Second')
    }, 0)//4
    
    new Promise(function (res) {
	    
      res('Third')
    }).then(console.log)//3
    
    console.log('Fourth')//2
    ```
- What is the difference between asynchronous and parallel programming?
- How can event-based programming be used to improve the performance of a program?
- What are the challenges of event-based programming?
- Is it possible to nest async functions in JavaScript? If yes, then how?
- What will be the output here?
    
    ```jsx
    function job() {
        return new Promise(function(resolve, reject) {
            reject();
        });
    }
    
    let promise = job();
    
    promise
    
    .then(function() {
        console.log('Success 1');
    })
    
    .then(function() {
        console.log('Success 2');
    })
    
    .then(function() {
        console.log('Success 3');
    })
    
    .catch(function() {
        console.log('Error 1');
    })
    
    .then(function() {
        console.log('Success 4');
    });
    ```
- What will be the output here?
###  Asynchronous JavaScript exercises
---
#### Theoretical questions

1. What is event-based programming and how is it implemented in JavaScript?
>>Event-based programming is a programming paradigm where the flow of the program is determined by events or user interactions rather than a sequential execution of code.
    In event-based programming, you define event handlers or callbacks that get executed in response to specific events, such as user input, system notifications, or data changes.

#### Here's how event-based programming is implemented in JavaScript
1. **Event Emitter/Listener Model:** JavaScript provides a built-in mechanism for event-based programming through the Event Emitter/Listener model. In this model, you have objects that act as event emitters. These objects emit events when something significant happens, and you have other objects, known as event listeners or handlers, that "listen" for and respond to those events.
    
2. **DOM Events:** In web development, the Document Object Model (DOM) is a key component for event-based programming. You can attach event listeners to HTML elements to respond to user interactions such as clicks, keypresses, form submissions, and more. For example, you can use `addEventListener` to attach a callback function to an HTML element's event:
    
    javascriptCopy code
    
```js
const button = document.getElementById('myButton');
button.addEventListener('click', function() {     // This function is called when the button is clicked     console.log('Button clicked!'); });
```
    
3. **Custom Events:** In addition to DOM events, you can also create custom events in JavaScript. Custom events allow you to define your own events and emit them when needed. You can use the `Event` constructor to create custom events and the `dispatchEvent` method to trigger them.
    
    javascriptCopy code
    
```js
 Creating a custom event const customEvent = new Event('myCustomEvent');  // 
 Dispatching the custom event document.dispatchEvent(customEvent);  // Listening for the custom event 
 document.addEventListener('myCustomEvent', function() {     
	 console.log('Custom event triggered!'); 
 });
```
    
4. **Node.js Event Loop:** In server-side JavaScript with Node.js, event-based programming is at the core of handling asynchronous operations. Node.js uses an event loop to manage I/O operations efficiently. You can use the `EventEmitter` class to create custom event emitters and listeners in Node.js.
    
    javascriptCopy code
    
```js
	const EventEmitter = require('events');  // Creating a custom event emitter 
    const myEmitter = new EventEmitter();  // Listening for custom events 
    myEmitter.on('customEvent', () => {     
    console.log('Custom event emitted!'); 
    });  // Emitting a custom event myEmitter.emit('customEvent');
```
    
5. **Promises and Async/Await:** While not strictly event-based, Promises and the `async/await` syntax in JavaScript are often used in conjunction with event-based programming to handle asynchronous operations more elegantly. Promises allow you to represent and manage the result of asynchronous operations, making your code more readable and maintainable.


2. How does the `XMLHttpRequest` API’s implementation of asynchronous programming differ from the `fetch` API’s implementation?
==the primary difference is that `fetch` offers a more modern and Promise-based approach to handling asynchronous operations, while `XMLHttpRequest` relies on callback-based programming, which can be more complex and harder to read and maintain, especially for handling multiple requests or complex sequences of requests

#### Practical questions

****************Callbacks****************

1. Create a function called `myReduce` that works similarly to the native [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) the function should receive 3 arguments:
    
    - The array itself is to be reduced
    - A reducer callback function that will be used to reduce the array (this callback function should itself receive 3 parameters: `accumulator`, `currentValue`, `currentIndex`, and `array` (check the original [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) docs for more info)
    - The optional initial value
    
    The function should return the results from running the `reducer` callback function to completion over the entire array.
    
    ```js
    const numbers = [1, 2, 3, 4]
    
    const sum = myReduce(numbers, (acc , curr) => {
    	return acc + curr 
    }, 0)
    
    console.log(sum) // 10
    ```
    

****************Bonus points (optional)****************

Update `myReduce` function so that it can be called as a method of any array instead (it should be called as the native `reduce` method.

```tsx
const numbers = [1, 2, 3, 4]

const sum = numbers.myReduce((acc , curr) => {
	return acc + curr 
}, 0)

console.log(sum) // 10
```

******Promises******

1. Create a function called `myFetch` that should work as a simple version of the native [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API. The function `myFetch` should use the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) to make a `GET` Request and return a promise that resolves with the request’s response and rejects with an error if any.

```tsx
function myFetch(){
	return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if(xhr.status == 200){
                resolve(xhr.response)
            } else {
                reject(Error(xhr.statusText))
            }
        }
        xhr.onerror = () => {
            reject(Error('Network error'))
        }
        xhr.send()
    })
}

myFetch('https://jsonplaceholder.typicode.com/users')
// parse to json the string returned
.then(res => JSON.parse(res))
.then(data => console.log(data))
.catch(error => console.log('Error:', error));
```

**********************Bonus points (optional)**********************

Make your fetch function perform other request methods like `POST` or receive request options

1. Create a function called `fetchUserTodos` that uses the `Promise.all()` method to fetch users and todos concurrently from the provided API endpoints and combine them based on the `userId`. The function should return a promise that resolves with the combined data.

- Users endpoints [`https://jsonplaceholder.typicode.com/users`](https://jsonplaceholder.typicode.com/users)
    
- Todos endpoints [`https://jsonplaceholder.typicode.com/todos`](https://jsonplaceholder.typicode.com/todos)
    
    The returned promise should resolve into an array of users, where each user object has a new key `todos`. This key should contain an array of todos that belong to the user, determined by matching the `userId` of the todo with the `id` of the user.
    
    User objects may look like
    
    ```tsx
    // User object may look like
    {
    	id: 10,
      name: 'Clementina DuBuque',
      ...
    }
    
    // Todo object may look like
    {
    	userId: 5,
      completed: false,
    	...
    }
    
    // The result array will have objects that look like
    
    {
    	id: 10,
      name: 'Clementina DuBuque',
      todos: [
    		{
    			userId: 10,
    		  completed: false,
    			...
    		},
    		{
    			userId: 10,
    		  completed: false,
    			...
    		}
    	]
    	...
    }
    
    ```
    
    Example of function usage
    
    ```tsx
let XMLHttpRequest = require('xhr2');
function myFetch(url){
    //... your code here
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if(xhr.status == 200){
                resolve(xhr.response)
            } else {
               reject(Error(xhr.statusText))
            }
        }
        xhr.onerror = () => {
            reject(Error('Network error'))
        }
        xhr.send()
    })
}
  
function fetchUserTodos(){
    let userPromise = myFetch(`https://jsonplaceholder.typicode.com/users`)
    let todoPromise = myFetch(`https://jsonplaceholder.typicode.com/todos`)
    return Promise.all([userPromise, todoPromise])
    .then((todo) =>todo)
    .then(data => data.map(el => JSON.parse(el)))
    .then((todo) =>{
        let todos = (arr, userID) => {
            return arr.filter(el => el['userId'] === userID)
        }
        todo[0].forEach((el, i) => {
            todo[0][i]['todos'] = todos(todo[1], el.id)
        })
        todo[0][0]['todos'] = todos(todo[1], 1)
        return todo[0]
    })
}
fetchUserTodos()
.then(data => console.log(data))
.catch(error => console.error(error));
```
    
    **Async-await**

# Event loop and async question

- How can event-based programming be used to improve the performance of a program?
	==event-based programming can improve program performance by enabling asynchronous operations, parallelism, responsiveness, scalability, reduced resource consumption, modularity, real-time processing, resource management, event filtering, prioritization, and robust error handling.
- What are the challenges of event-based programming?
	==Event loops in event-based programming present several challenges, including managing event order and timing, designing efficient loops, handling cascading events, complex state management, error handling, debugging complexity (often termed "callback hell"), resource management, ensuring scalability, handling event storms, complex event routing, and the need for clear documentation and well-defined event contracts. Despite these challenges, event loops are crucial for achieving responsiveness and scalability in event-driven systems, and addressing these issues requires careful design and the adoption of appropriate tools and practices.
- Is it possible to nest async functions in JavaScript? If yes, then how?
	When you nest async functions, it means that you are calling one asynchronous function from within another asynchronous function. This can be useful when you need to perform a series of asynchronous operations sequentially or when you want to await the result of an asynchronous function before proceeding with another task
```js
async function outerFunction() {
  console.log("Outer function start");
  // Call an inner async function
  await innerFunction();
  console.log("Outer function end");
}
async function innerFunction() {
  console.log("Inner function start");
  // Simulate an asynchronous operation with a setTimeout
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Inner function end");
}
outerFunction();	
```

In this example, `outerFunction` calls `innerFunction` using the `await` keyword. This allows `outerFunction` to pause its execution until `innerFunction` completes its asynchronous operation.

	- What will be the output here?

```jsx
function job() {
    return new Promise(function(resolve, reject) {
        reject();
    });
}

let promise = job();

promise

.then(function() {
    console.log('Success 1');
})

.then(function() {
    console.log('Success 2');
})

.then(function() {
    console.log('Success 3');
})

.catch(function() {
    console.log('Error 1');
})

.then(function() {
    console.log('Success 4');
});
```

- What will be the output here?

```jsx
function job(state) {
    return new Promise(function(resolve, reject) {
        if (state) {
            resolve('success');
        } else {
            reject('error');
        }
    });
}

let promise = job(true);

promise

.then(function(data) {
    console.log(data);

    return job(false);
})

.catch(function(error) {
    console.log(error);

    return 'Error caught';
})

.then(function(data) {
    console.log(data);

    return job(true);
})

.catch(function(error) {
    console.log(error);
});
```

- How can you use async/await to run multiple asynchronous functions in parallel?

```jsx
const fetchPosts = async () => {
  const response = await fetch("<https://jsonplaceholder.typicode.com/posts>");
  const data = await response.json();
  return data;
};

const fetchUsers = async () => {
  const response = await fetch("<https://jsonplaceholder.typicode.com/users>");
  const data = await response.json();
  return data;
};

(async function fetchUserTodos(){
    return await Promise.all([fetchUsers(), fetchPosts()])
    .then(data => console.log(data));

})()
```

- What is the difference between asynchronous and parallel programming?
	![[asyncvsparal]]
- **What is the difference between event-driven and message-driven architectures?**
	![[event-message-driven]]
- How can you implement real-time notifications and updates in an event-driven system?
	![[realtime-notification-eventdriven]]
- What are the challenges in designing scalable event-driven systems?
	![[challenge-scalable-event-driven-system]]
- What are the trade-offs between asynchronous and synchronous programming?
	![[trade-off-asyc-]]

---

### 1. Explain the concept of async/await and how it relates to Promises
>		The async/await is a syntax sugar for Promises in JavaScript. The async keyword defines an asynchronous function, and the await keyword waits for the result of a Promise. This enables you to write asynchronous code that looks and behaves like synchronous code. With these keywords, you can write asynchronous code that is easy to read and understand, which makes it easier to maintain and debug.
>		

### 2. 

---
1. Finally can be used to catch up an error
2. what is event based programming

# JavaScript async and event-based programming trial interviews

## Theoretical questions

1. What is event-based programming and how is it implemented in JavaScript?
2. How would you stop an interval started with `setInterval()`?
3. How does the value of `this keyword` behave in a function passed as a callback of `setTimeout()`?
	==The behavior of the `this` keyword in a function passed as a callback to `setTimeout()` depends on the type of function used. For regular functions, `this` typically refers to the global object (e.g., `window` in a browser) unless explicitly bound to a specific value. In contrast, arrow functions retain the value of `this` from the enclosing context in which they were defined, making them useful for preserving the context of the surrounding code. You can also explicitly set `this` using `bind()` when passing a regular function as a callback to `setTimeout()`, ensuring it references the desired object or context.
1. Is it possible to cancel a `fetch()` HTTP request in the middle after sending it? If not, why? if yes, how?
2. How does the JavaScript event loop decide what function to run next?
3. How do async functions differ from regular fufnctions

### Practical questions

1. Create a function called `createAlarm` that generates a wake-up message for a person after a specified time delay. This function should accept two parameters: the person's name and the delay time in seconds. The function should return a promise that resolves with the wake-up message (e.g. `Wake up person`) but if the delay is less than 2 seconds, the promise should be immediately rejected with an error message stating `Delay is not sufficient`

Example of how the function should be used

```tsx
createAlarm('John', 4).then((message) => {
	console.log(message) // output "Wake up John" after 4 seconds
}).catch((error) => {
	console.error(error)
})

createAlarm('John', 1).then((message) => {
	console.log(message) 
}).catch((error) => {
	console.error(error) // output "Delay is not sufficient"
})
```

1. Imagine you are developing a real-time news application, and you need to fetch posts from three different sources to provide users with the latest updates.

The API endpoints for getting posts are:

- `https://dummyjson.com/posts`
- `https://this-may-not-exist.com/posts`
- `https://jsonplaceholder.typicode.com/posts`

To ensure a seamless user experience, you are supposed to create a function called `getFastPosts` that fetches posts from these endpoints simultaneously (concurrently) and only presents data from the source that responds the quickest, while ignoring slower or potentially unreliable sources.

Example of how the function should be used

```tsx
// getFastPosts() code here...

getFastPosts().then((posts) => {
	console.log(posts)
})
```

# Event loop and async question
- How can you use async/await to run multiple asynchronous functions in parallel?

```jsx
const fetchPosts = async () => {
  const response = await fetch("<https://jsonplaceholder.typicode.com/posts>");
  const data = await response.json();
  return data;
};

const fetchUsers = async () => {
  const response = await fetch("<https://jsonplaceholder.typicode.com/users>");
  const data = await response.json();
  return data;
};
```

## Theoretical questions

1. What is event-based programming and how is it implemented in JavaScript?
2. How would you stop an interval started with `setInterval()`?
3. How does the value of `this keyword` behave in a function passed as a callback of `setTimeout()`?
4. Is it possible to cancel a `fetch()` HTTP request in the middle after sending it? If not, why? if yes, how?
5. How does the JavaScript event loop decide what function to run next?
6. How do async functions differ from regular functions?

### Practical questions

1. Create a function called `createAlarm` that generates a wake-up message for a person after a specified time delay. This function should accept two parameters: the person's name and the delay time in seconds. The function should return a promise that resolves with the wake-up message (e.g. `Wake up person`) but if the delay is less than 2 seconds, the promise should be immediately rejected with an error message stating `Delay is not sufficient`

```jsx
createAlarm('John', 4).then((message) => {
	console.log(message) // output "Wake up John" after 4 seconds
}).catch((error) => {
	console.error(error)
})

createAlarm('John', 1).then((message) => {
	console.log(message) 
}).catch((error) => {
	console.error(error) // output "Delay is not sufficient"
})
```

**PART 3:**

1. ****What Use cases of asynchronous programming in JavaScript?****
2. ****When should I use callbacks, promises, or async/await methods in my code?****
3. ****What is the purpose of setImmediate() in JavaScript?****
4. ****Is there any other way to execute asynchronous code besides callbacks, promise, or async/wait in JavaScript?****
5. ****Which Queue Is Executed First?**

```jsx
setTimeout(() => console.log('timeout'), 0)
Promise.resolve().then(() => console.log('promise'))
```

1. ****What Is the Output of the Code Below?****

```jsx
let a = 1;

setTimeout(() => {
  console.log(`setTimeout: ${a}`);
  a = 2;
}, 0);

setImmediate(() => {
  console.log(`Immediate: ${a}`);
});

const p = new Promise((resolve) => {
  console.log(`New Promise: ${a}`);
  a = 3;
  resolve();
});

p.then(() => console.log(`Then: ${a}`));

console.log(`console: ${a}`);

```

1. ****What Is the Output of the Code Below?****

```jsx
<div id="container">
  <button id="button">Click</button>
</div>

const 
  container = document.getElementById('container'),
  button = document.getElementById('button')

button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('A'))
  console.log('B')
})

container.addEventListener('click', () => console.log('C'))
```

1. ****In What Order Will Letters Be Logged After the button is clicked??****

```jsx
<div id="container">
  <button id="button">Click</button>
</div>

const 
  container = document.getElementById('container'),
  button = document.getElementById('button')

button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('A'))
  console.log('B')
})

container.addEventListener('click', () => console.log('C'))
```

1. ****Will the Output Change?****

```jsx
const
  container = document.getElementById('container'),
  button = document.getElementById('button')

button.addEventListener('click', () => {
  Promise.resolve().then(() => console.log('A'))
  console.log('B')
})

container.addEventListener('click', () => console.log('C'))

button.click()
```