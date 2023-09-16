Clarifies the behavior clauses of the earlier Promises/A proposal. Promises/A+ specification does not deal with how to create, fulfill, or reject promises, choosing instead to focus on providing an interoperable `then` method.

### Terminology

- **Promise**: is an object or function with a `then` method whose behavior conforms to this specification
- **"thenable"**: is an object or function that defines a `then` method
- **"value"**: is any legal JavaScript value (including `undefined`, a thenable, or promise)
- **"exception"** is a value that is throw using the `then` statement
- **"reason"**: is a value that indicates why a promise was rejected

#### Promise States
>
**1. When Pending**
>May transition to either fulfilled state or rejected state
**2. When fulfilled**
>Must not transition to any other state, must have a value which must not change
**3. When rejected**
> Must not transition to any other state and must have a reason which must not change

#### The `then` Method

A promise must provide a `then` method to access its current or eventual value or reason. it accepts 2 arguments 
**Syntax**
```js
promise.then(onFulfilled, onRejected)
```
> If `onFulfilled` and `onRejected` are not function they must be ignored else:
1. `onFulfilled` is function: it must be called after `promise` is fulfilled, with `promise`'s value as its first argument; it must not be called before `promise` is fulfilled nor more than once
2. `onRejected` is function: must be called after `promise` is rejected, with `promise`'s reason as its first argument; must not be called before `promise` is rejected nor more than once
3. `onFulfilled` or `onRejected` must not be called until the execution context stack contains only platform code
4. `onFulfilled` and `onRejected` must be called as functions (with no `this` value)
5. `then` may be called multiple times on the same promise
	- if/when `promise` is fulfilled, all respective `onFulfilled` callbacks must execute in the order of their originating calls to `then`
	- if/when `promise` is rejected, all respective `onRejected` callbacks must execute in the order of their originating calls to `then`.
	- `
6. `then` must return a promise
```js
promise2 = promise1.then(onFulfilled, onRejected);
```
1.  If either `onFulfilled` or `onRejected` returns a value `x`, run the Promise Resolution Procedure `[[Resolve]](promise2, x)`.
2. If either `onFulfilled` or `onRejected` throws an exception `e`, `promise2` must be rejected with `e` as the reason.
3. If `onFulfilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled with the same value as `promise1`.
4. If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected with the same reason as `promise1`.