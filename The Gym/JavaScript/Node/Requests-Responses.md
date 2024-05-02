 the concept of requests and responses is central to building web servers and clients. The `http` module is used to create HTTP servers and clients that can send and receive HTTP requests and responses.

#### HTTP request methods
[`GET`]
The `GET` method requests a representation of the specified resource. Requests using `GET` should only retrieve data.

[`HEAD`]
The `HEAD` method asks for a response identical to a `GET` request, but without the response body.

[`POST`]
The `POST` method submits an entity to the specified resource, often causing a change in state or side effects on the server.

[`PUT`]
The `PUT` method replaces all current representations of the target resource with the request payload.

[`DELETE`]
The `DELETE` method deletes the specified resource.

[`CONNECT`]
The `CONNECT` method establishes a tunnel to the server identified by the target resource.

[`OPTIONS`]
The `OPTIONS` method describes the communication options for the target resource.

[`TRACE`]
The `TRACE` method performs a message loop-back test along the path to the target resource.

[`PATCH`]
The `PATCH` method applies partial modifications to a resource.

### Send HTML
```node
const server = http.createServer((req, res) => {

  

  res.setHeader('Content-Type', 'text/html');

  res.write(`

    <h1>Oshi lakin</h1>

    <p> the concept of requests and responses is central to building web servers and clients. The "http" module is used to create HTTP servers and clients that can send and receive HTTP requests and responses</p>

    <button>Hire me</button>

  `);

  res.end()

})
```
### Return HTML Pages

```node
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./views/index.html', (err, data) => {

    if (err) {
      console.log(err)
      res.end()
    } else {
      res.write(data)
      res.end()
    }
  }) 
})
server.listen(3000, "localhost", () => {
  console.log('Server listening on port 3000')
})
```
> Since we are sending on thing the page in view we can directly pass it to the `send` method instead of calling it to write.
> Use `write` in case you want are going to send multiple elements

```node
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/html');
  fs.readFile('./views/index.html', (err, data) => {

    if (err) {
      console.log(err)
      res.end()
    } else {
      res.end(data)
    }
  }) 
})
server.listen(3000, "localhost", () => {
  console.log('Server listening on port 3000')
})
```

### Basic Routing
this will help us to send different resources according to the user's `url` requested

### Status code

- describe the type of response sent to the browser
- status code range ![[status codes range.png]]

In Node.js, when you're working with HTTP servers, you often need to send HTTP status codes as part of the response to the client. These status codes indicate the result of the HTTP request. The `http` module in Node.js provides a set of standard HTTP status codes that you can use.

Here's an example of how you might use status codes in a simple HTTP server:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Set the status code to  200 (OK)
  res.statusCode =  200;

  // Set the content type of the response
  res.setHeader('Content-Type', 'text/plain');

  // Send the response
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

In this example, `res.statusCode =  200;` sets the status code of the response to  200, which indicates that the request has succeeded.

If you want to send a different status code, you can simply change the value of `res.statusCode`. For example, to send a  404 Not Found status, you would do:

```javascript
res.statusCode =  404;
res.end('Not Found\n');
```

The `http` module includes a variety of status codes, which you can find in the `http.STATUS_CODES` object. This object maps numeric status codes to their standard text descriptions. For example:

```javascript
console.log(http.STATUS_CODES[404]); // Outputs: 'Not Found'
```

Remember that it's important to send the correct status code to inform the client about the result of their request. This helps the client handle the response appropriately.

### Redirects in Node.js

```node
const http = require('http');

const server = http.createServer((req, res) => {
  // Check if the request is for the old URL
  if (req.url === '/old-url') {
    // Set the status code to  301 (Moved Permanently)
    res.statusCode =  301;
    // Set the 'Location' header to the new URL
    res.setHeader('Location', '/new-url');
    // End the response
    res.end();
  } else if (req.url === '/new-url') {
    res.statusCode =  200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('New URL\n');
  } else {
    res.statusCode =  404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

```