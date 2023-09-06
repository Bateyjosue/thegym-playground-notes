is now provided in the global `window` scope, with the first argument being the URL.
`fetch()` allows you to make network requests similar to XMLHttpRequest.
The main difference is that fetchAPI uses promises, which enables a simpler and cleaner API, avoiding callback hell and having to remember the complex API of XMLHttpRequest.
**Syntax**

```js
fetch('https://davidwalsh.name/some/url', {method: 'get'})
.then((response)=> {}).catch(err=>{});
```

> fetchAPI uses JavaScript Promises to handle results/callbacks

```js
// simple response handling
fetch("url")
.then(response=>{})
.catch(err=>{});

// chaining for more 'Advanced' handling
fetch("url")
.then(response=>{})
.then(returnedValue=>{})
.catch(err=>{});
```

### Request Headers

to work with request headers execute the constructor `new Headers`
```js
var headers = new Headers()
// Add a few headers
headers.append('Content-Type', 'text/plain');
headers.append('X-My-Custom-Header', 'CustomValue');
// Check, get, and set header values
headers.has('Content-Type'); // true
headers.get('Content-Type'); // "text/plain"
headers.set('Content-Type', 'application/json');
// Delete a header
headers.delete('X-My-Custom-Header');

// Add initial values
var headers = new Headers({
	'Content-Type': 'text/plain',
	'X-My-Custom-Header': 'CustomValue'
});
```

>> You can use the `append`, `has`, `get`, `set`, and `delete` methods to modify request headers. to us request headers, create a `Request` instance

```js
let request = new Request('url',
						 headers: new Headers({
						 'Content-Type': 'text/plain'
						 }));
fetch(request).then(()=>{})
```

## Request

A `Request` instance represents the request piece of a `fetch` call. By passing `fetch` a `Request` you can make advanced and customized requests:
- `method` - `GET`, `POST`, `PUT`, `DELETE`, `HEAD`
- `url` - URL of the request
- `headers` - associated `Headers` object
- `referrer` - referrer of the request
- `mode` - `cors`, `no-cors`, `same-origin`
- `credentials` - should cookies go with the request? `omit`, `same-origin`
- `redirect` - `follow`, `error`, `manual`
- `integrity` - subresource integrity value
- `cache` - cache mode (`default`, `reload`, `no-cache`)
**Example**

```js
let request = new Request(
	'url',
	method: 'POST',
	mode: 'cors',
	redirect: 'follow',
	headers: new Headers({
	'Content-Type': 'text/plain'
	})
);

fetch(request).then(()=>{})
```

---or---
```js
fetch('https://davidwalsh.name/users.json', {
	method: 'POST', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'Content-Type': 'text/plain'
	})
}).then(function() { /* handle response */ });
```

## Response

The `fetch`'s `then` method is provided a `Response` instance but you can also manually create `Response` objects yourself.
With a `Response` you can configure:
- `type` - `basic`, `cors`
- `url`
- `useFinalURL` - Boolean for if `url` is the final URL
- `status` - status code (ex: `200`, `404`, etc.)
- `ok` - Boolean for successful response (status in the range 200-299)
- `statusText` - status code (ex: `OK`)
- `headers` - Headers object associated with the response.

```js
// Create your own response for service worker testing
// new Response(BODY, OPTIONS)
var response = new Response('.....', {
	ok: false,
	status: 404,
	url: '/'
});

// The fetch's `then` gets a Response instance back
fetch('https://davidwalsh.name/')
	.then(function(responseObj) {
		console.log('status: ', responseObj.status);
	});
```

The `Response` also provides the following methods:
- `clone()` - Creates a clone of a Response object.
- `error()` - Returns a new Response object associated with a network error.
- `redirect()` - Creates a new response with a different URL.
- `arrayBuffer()` - Returns a promise that resolves with an ArrayBuffer.
- `blob()` - Returns a promise that resolves with a Blob.
- `formData()` - Returns a promise that resolves with a FormData object.
- `json()` - Returns a promise that resolves with a JSON object.
- `text()` - Returns a promise that resolves with a USVString (text).

## Handling JSON

Let's say you make a request for JSON -- the resulting callback data has a `json` method for converting the raw data to a JavaScript object

**Example**

```js
fetch('https://davidwalsh.name/demo/arsenal.json')
.then(function(response) { 
	// Convert to JSON
	return response.json();
}).then(function(j) {
	// Yay, `j` is a JavaScript object
	console.log(j); 
});
```


## Handling Blob Responses
If you want to load an image via fetch, for example, that will be a bit different:
```js
fetch('https://davidwalsh.name/flowers.jpg')
	.then(function(response) {
	  return response.blob();
	})
	.then(function(imageBlob) {
	  document.querySelector('img').src = URL.createObjectURL(imageBlob);
	});
```

>>>The `blob()` method of the Body mixin takes a Response stream and reads it to completion.

