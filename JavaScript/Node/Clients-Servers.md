![[client.png]]
In Node.js, the client-server model is a fundamental concept for building network applications. Clients and servers communicate over a network, typically using protocols like HTTP, TCP, or UDP. Node.js provides the `net` module for creating both TCP and IPC servers and clients.

### Creating a TCP Server

Here's an example of how to create a simple TCP server in Node.js:

```node
const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log('Received data from client:', data.toString());
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port  3000');
});

```

### Creating a TCP Client

Here's an example of how to create a simple TCP client in Node.js:

```node
const net = require('net');

const client = net.createConnection({ port:  3000 }, () => {
  console.log('Connected to server');
  client.write('Hello, server!');
});

client.on('data', (data) => {
  console.log('Received data from server:', data.toString());
  client.end();
});

client.on('end', () => {
  console.log('Disconnected from server');
});

```
### Creating an HTTP Server

Node.js is often used to create HTTP servers, which are a type of TCP server that follow the HTTP protocol. Here's an example using the `http` module:

```node
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode =  200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(3000, () => {
  console.log('Server listening on port  3000');
});

```
### Creating an HTTP Client

Node.js can also act as an HTTP client to make requests to servers. Here's an example using the `http` module:

```node
const http = require('http');

const options = {
  hostname: 'localhost',
  port:  3000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  res.on('data', (chunk) => {
    console.log(`Received data: ${chunk}`);
  });
});

req.on('error', (error) => {
  console.error(`Problem with request: ${error.message}`);
});

req.end();

```
In these examples, the server listens on port 3000, and the client connects to it. The server responds to the client's request with a simple message. The client then logs the response and disconnects.

These are basic examples, and real-world applications would involve more complex handling of requests and responses, error handling, and possibly the use of frameworks like Express.js to simplify the process of building web servers and clients.
### IP Addresses & Domains
 you can use IP addresses to establish network connections for sending and receiving data. as IP are number they are hard to remember sop we use domain name to mask the IP address therefor we can access the computer/IP tie to the specific domain name.
 so once we type a domain in the browser and hit enter it find the IP address associate to it and then give us access to the resources. 
> The communication between the client and the server is via HTTP which define the rules on how data will be transferred effectively

#### Creating a server in Node.js
> server.js
```node
const http = require('http')

const server = http.createServer((req, res) => {
	console.log('request made')
})

server.listen(3000, 'localhost', () => {
	console.log('listening for request on port 3000')
})
```

#### Localhost & Port Numbers

- [Localhost] is like a domain name on the web. loop-back address to our own computer `127.0.0.1`
- [Port number] numbers are like 'doors' into a computer

	##### Localhost
	 "localhost" is a hostname that refers to the current device used to run the application. It is used to access network services that are running on the host via the loopback network interface. Using the loopback interface bypasses any local network interface hardware, and the connection is made as if the client and server were on the same machine.
	
	##### Port numbers
	Port numbers are used to identify specific processes or services running on a host. Each port number can be associated with a specific service, and multiple services can run on the same host, each listening on a different port number.