Express.js is a fast, unopinionated, and minimalist web framework for Node.js. It is designed for building web applications and APIs. Express.js simplifies the process of writing server-side applications by providing a simple and flexible API for [routing], [middleware], and[ handling HTTP requests and responses.]

Here's a basic example of how to set up an Express.js application:

1. **Install Express.js**: First, you need to install Express.js using npm. Navigate to your project directory and run:

   ```sh
   npm install express
   ```

2. **Create an Express Application**: Create a new file, typically named `app.js`, and set up your Express application:

   ```javascript
   const express = require('express');
   const app = express();
   const port =  3000;

   // Define a route handler for the root URL
   app.get('/', (req, res) => {
     res.send('Hello World!');
   });

   // Start the server
   app.listen(port, () => {
     console.log(`Server is running at http://localhost:${port}`);
   });
   ```

3. **Run the Application**: You can start your Express application by running:

   ```sh
   node app.js
   ```

   Alternatively, you can add a start script to your `package.json` file:

   ```json
   "scripts": {
     "start": "node app.js"
   }
   ```

   And then start your application with:

   ```sh
   npm start
   ```

Express.js provides several features that make it a popular choice for web development:

- **Routing**: Express.js allows you to define routes for different HTTP methods and URLs.

- **Middleware**: You can use middleware functions to handle requests and responses, perform common tasks like logging, error handling, or parsing request bodies.

- **Template Engines**: Express.js supports template engines like Pug, EJS, and Handlebars, which allow you to generate dynamic HTML.

- **Static Files**: You can serve static files like images, CSS, and JavaScript directly from a directory.

- **Error Handling**: Express.js provides a built-in error handling mechanism.

Here's an example of an Express.js application that uses some of these features:

```javascript
const express = require('express');
const app = express();
const port =  3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Route for user profile
app.get('/profile', (req, res) => {
  res.send('Welcome to your profile!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

Express.js is highly customizable and can be extended with various middleware and plugins to add additional functionality. It's a powerful tool for building web applications and APIs in Node.js.

### View engine
In Express.js, a view engine is a module that allows you to render views, which are templates that are used to generate HTML markup with dynamic data. View engines enable you to separate the application logic from the presentation logic, which is a good practice in web development.

Express.js supports a variety of view engines, each with its own syntax and features. Some popular view engines include:

- **EJS (Embedded JavaScript)**: A simple templating language that lets you generate HTML markup with plain JavaScript.
- **Pug (formerly Jade)**: A high-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js.
- **Handlebars**: A logic-less templating engine that uses a simple templating language to generate HTML.
- **Mustache**: A logic-less templating engine that can be used for HTML, config files, source code, etc.

To use a view engine in Express.js, you need to do the following:

1. **Install the View Engine**: First, you need to install the view engine package using npm. For example, to install EJS, you would run:

   ```sh
   npm install ejs
   ```

2. **Set the View Engine**: In your Express.js application, you need to set the view engine using the `app.set` method. For example, to set EJS as the view engine, you would do:

   ```javascript
   const express = require('express');
   const app = express();

   app.set('view engine', 'ejs');
   ```

3. **Configure the Views Directory**: By default, Express.js looks for views in a directory named `views` in the root of your project. You can change this directory by setting the `views` property:

   ```javascript
   app.set('views', path.join(__dirname, 'templates'));
   ```

4. **Render Views**: To render a view, you use the `res.render` method, passing the name of the view file (without the file extension) and an object containing the data to be passed to the view:

   ```javascript
   app.get('/', (req, res) => {
     res.render('index', { title: 'Home' });
   });
   ```

5. **Create View Files**: In your views directory, you create view files that correspond to the templates you want to render. For example, for EJS, you might have a file named `index.ejs` with the following content:

   ```ejs
   <!DOCTYPE html>
   <html>
   <head>
     <title><%= title %></title>
   </head>
   <body>
     <h1>Welcome to <%= title %>!</h1>
   </body>
   </html>
   ```

When a client makes a request to your Express.js application, the server will render the appropriate view using the view engine, passing in any data you've provided. The rendered HTML is then sent back to the client as the response.

Using a view engine in Express.js can greatly simplify the process of generating dynamic HTML and can make your code more maintainable and easier to understand.

### EJS

EJS, which stands for Embedded JavaScript, is a simple templating language that lets you generate HTML markup with plain JavaScript. It is a view engine for Node.js applications, particularly those built with the Express.js framework. EJS is designed to be easy to use and to allow developers to embed JavaScript code directly into their HTML templates.

Here are some key features and details about EJS:

1. **Embedding JavaScript**: EJS allows you to embed JavaScript code directly into your HTML templates. This is done using `<% %>` tags for JavaScript code that doesn't output anything and `<%= %>` tags for JavaScript code that outputs a value.

2. **Control Structures**: EJS supports common control structures like loops (`for`, `while`) and conditionals (`if`, `else`). These are used to create dynamic content based on the data passed to the template.

3. **Partials**: EJS supports the use of partials, which are smaller, reusable pieces of HTML that can be included in other templates. This helps to keep your templates DRY (Don't Repeat Yourself) and makes it easier to manage common elements across multiple pages.

4. **Includes**: Similar to partials, EJS allows you to include other EJS files using the `<%- include('partialName') %>` syntax. This is useful for breaking up complex templates into smaller, more manageable pieces.

5. **Layouts**: EJS supports layouts, which are templates that define the common structure of your pages (like headers, footers, and navigation). You can define a layout and then extend it in your individual page templates.

6. **Custom Tags**: EJS allows you to define custom tags that can be used to create more readable and maintainable templates.

7. **Filters**: EJS supports filters, which are functions that can be used to modify the output of your templates.

8. **Whitespace Control**: EJS provides a way to control the whitespace in your templates, which can be useful for controlling the formatting of your HTML output.

Here's an example of how you might use EJS in an Express.js application:

```javascript
const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Render the 'index' view with some data
  res.render('index', { title: 'Home', message: 'Welcome to the home page!' });
});

app.listen(3000, () => {
  console.log('Server is running on port  3000');
});
```

And here's what the corresponding `index.ejs` file might look like:

```ejs
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1><%= message %></h1>
  <% if (user) { %>
    <p>Welcome, <%= user.name %>!</p>
  <% } else { %>
    <p>Please log in.</p>
  <% } %>
</body>
</html>
```

In this example, the `index.ejs` file uses EJS syntax to embed JavaScript code and output dynamic content based on the `title` and `message` variables passed to the `res.render` method.

EJS is a popular choice for server-side templating in Node.js applications due to its simplicity and ease of use. It allows developers to create dynamic HTML content without having to switch between languages or use complex templating syntax.

### Middleware

> Code which runs (on the server) between getting a request and sending a response

Middleware in Express.js is a function that has access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle, commonly denoted by a variable named `next` [0][1][2][4]. Middleware functions can perform various tasks, such as executing code, modifying the request and response objects, ending the request-response cycle, and calling the next middleware function in the stack [0][1][2][4].

Here's how you can use middleware in Express.js:

1. **Application-level Middleware**: Bind application-level middleware to an instance of the `app` object using the `app.use()` function. This middleware will be executed every time the app receives a request.

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
```

2. **Router-level Middleware**: Similar to application-level middleware, but bound to an instance of `express.Router()`. This middleware is executed for requests handled by the router.

```javascript
const express = require('express');
const app = express();
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// mount the router on the app
app.use('/', router);
```

3. **Middleware with Specific Path**: Middleware can be mounted on a specific path, and it will be executed for any type of HTTP request on that path.

```javascript
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});
```

4. **Middleware Array**: Middleware can be declared in an array for reusability.

```javascript
function logOriginalUrl(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log('Request Type:', req.method);
  next();
}

const logStuff = [logOriginalUrl, logMethod];
app.get('/user/:id', logStuff, (req, res, next) => {
  res.send('User Info');
});
```

5. **Skipping Middleware**: If you want to skip the rest of the middleware functions, you can call `next('router')` to pass control back out of the router instance.

```javascript
router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router');
  next();
});
```

Middleware functions are a powerful tool in Express.js for handling various aspects of the request-response cycle, such as logging, authentication, and modifying request and response objects.![[middleware.png]]

> the order of middleware matter so better be careful while defining them.

#### Middleware example
1. logger middleware to log details of every request
2. Authentication checks middleware for protected routes
3. Middleware to parse JSON data data from requests
4. Return 404 pages

#### Using next()
> we use next() to move on the next element or function. it can also be the next middleware.

#### third party middleware

this are middleware already mad for us to be used.
- morgan: a HTTP request logger middleware for node.js
#### static files
In Express.js, static files middleware is used to serve static files such as images, CSS files, and JavaScript files. The `express.static` built-in middleware function is used to serve these files from a specified directory [0][1][2][4].

Here's how to use `express.static` to serve static files:

```javascript
const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server running on port  3000');
});
```

You can serve static files from multiple directories by calling `express.static` multiple times:

```javascript
app.use(express.static('public'));
app.use(express.static('files'));
```

To serve files under a specific path prefix, you can specify a mount path:

```javascript
app.use('/static', express.static('public'));
```

You can also customize the behavior of `express.static` by passing an options object:

```javascript
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
};

app.use(express.static('public', options));
```
 
For security, you can add authentication middleware to restrict access to certain paths:

```javascript
const path = require('path');

function checkAuth(req, res, next) {
  // your authentication logic here
  next();
}

app.use('/secured', checkAuth, express.static(path.join(__dirname, 'secure')));
```

Additionally, you can use environment variables to change the behavior of your static file serving, such as setting cache duration:

```javascript
const cacheTime = process.env.CACHE_DURATION || '1d';

app.use(express.static('public', { maxAge: cacheTime }));
```

To optimize performance, you can use the `compression` middleware to enable gzip compression:

```javascript
const compression = require('compression');

app.use(compression());
app.use(express.static('public'));
```

Remember to organize your static files in a dedicated directory, commonly named `public` or `assets`, and to secure your file serving to prevent unauthorized access to sensitive files [4].

### Request types

In Express.js, a popular web application framework for Node.js, you can handle different types of HTTP requests using various methods on the `app` object. These methods correspond to the HTTP request methods, such as GET, POST, PUT, DELETE, etc. Here's a brief overview of how you can handle these request types:

### GET Request

A GET request is used to retrieve data from the server. In Express.js, you can handle GET requests using the `app.get()` method.

```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

### POST Request

A POST request is used to send data to the server, typically to create a new resource. In Express.js, you can handle POST requests using the `app.post()` method.

```javascript
app.post('/data', (req, res) => {
  // Handle the POST request
  res.send('Data received!');
});
```

### PUT Request

A PUT request is used to update an existing resource on the server. In Express.js, you can handle PUT requests using the `app.put()` method.

```javascript
app.put('/data/:id', (req, res) => {
  // Handle the PUT request
  res.send('Data updated!');
});
```

### DELETE Request

A DELETE request is used to delete a resource on the server. In Express.js, you can handle DELETE requests using the `app.delete()` method.

```javascript
app.delete('/data/:id', (req, res) => {
  // Handle the DELETE request
  res.send('Data deleted!');
});
```

### Handling All Requests

If you want to handle all types of requests to a specific route, you can use the `app.all()` method. This is useful for setting up middleware that should run for all request types.

```javascript
app.all('/data', (req, res) => {
  // This will run for all request types to '/data'
  res.send('This route handles all request types!');
});
```

### Using Middleware

Express.js also allows you to use middleware functions to handle requests. Middleware functions have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

```javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
```

In this example, the middleware function logs the current time and then calls `next()` to pass control to the next middleware function in the stack. If `next()` is not called, the request will be left hanging.

Express.js provides a powerful and flexible way to build web applications by handling different types of HTTP requests and using middleware to manage the request-response cycle.

### POST Request
In Express.js, handling POST requests involves defining a route that listens for POST requests on a specific URL path. When a client sends a POST request to that path, the server executes a callback function that processes the request. This is typically used for submitting form data, uploading files, or sending JSON data to the server.

```node
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({extended: true}))

// POST request handler
app.post('/submit-data', (req, res) => {
    console.log(req.body); // Log the request body to the console
    res.status(200).send('Data received!'); // Send a response back to the client
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

```

> app.use(express.urlencoded({extended: true}))

The line `app.use(express.urlencoded({extended: true}))` in Express.js is middleware that parses incoming request bodies in a middleware before your handlers, available under the `req.body` property. This is particularly useful when you're dealing with form submissions where the data is sent as `application/x-www-form-urlencoded` instead of JSON.

Here's a breakdown of what this line does:

- `app.use()`: This is a method to register middleware functions with the Express application. Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle.

- `express.urlencoded()`: This is a built-in middleware function in Express. It parses incoming requests with URL-encoded payloads and is based on body-parser.

- `{extended: true}`: This option allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. If `extended` is set to `false`, the URL-encoded data will be parsed with the `querystring` library.

Here's an example of how you might use this middleware in an Express.js application:

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({extended: true}));

// POST request handler
app.post('/submit-form', (req, res) => {
    console.log(req.body); // Log the request body to the console
    res.status(200).send('Form submitted!'); // Send a response back to the client
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

In this example, when a form is submitted to the `/submit-form` endpoint, the `express.urlencoded({extended: true})` middleware parses the form data and makes it available under `req.body`. This allows you to easily access the form data in your route handler.

This setup is particularly useful for handling form submissions in web applications where users input data through HTML forms. The `extended: true` option allows for more complex data structures to be encoded into the URL-encoded format, enabling a more flexible and powerful way to handle form data.

### Route Parameters

Route parameters in Express.js are a way to capture dynamic values from the URL. They are used to create flexible routes that can handle a variety of requests with different values. Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are then available to the route handler function as properties of the `req.params` object.

```node
const express = require('express');
const app = express();
const port = 3000;

// Define a route with a route parameter
app.get('/users/:userId', (req, res) => {
    // Access the route parameter
    const userId = req.params.userId;
    res.send(`User ID: ${userId}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

```
> In this example, `:userId` is a route parameter. When you navigate to a URL like `http://localhost:3000/users/123`, the `userId` parameter will capture the value `123`. This value is then accessible in the route handler function through `req.params.userId`.

#### Example with Multiple Route Parameters
You can also use multiple route parameters in a single route. Here's an example:
```node
app.get('/users/:userId/posts/:postId', (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    res.send(`User ID: ${userId}, Post ID: ${postId}`);
});

```
> In this example, the route `/users/:userId/posts/:postId` has two route parameters: `userId` and `postId`. When you navigate to a URL like `http://localhost:3000/users/123/posts/456`, the `userId` parameter will capture the value `123`, and the `postId` parameter will capture the value `456`.

Route parameters are a powerful feature in Express.js that allow you to create dynamic and flexible routes that can handle a wide variety of requests.