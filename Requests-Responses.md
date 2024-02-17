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