
![[JavaScript/Nestjs/Introduction|Introduction]]

![[Controllers]]

###  Class transform and class validate

### Pipes: 
 are functions that transform your data
Pipes have two typical use cases:
- Transformation: transform input data to the desired form
- validation: evaluate input data and if valid, simply pass it through unchanged, other wise raised an error

### DTO (Data Transfer Object)

is an object that define how the data will be sent over the network. they can be define using class.

## Guards 
![[guards.png]]

is a class annotated with the `@Injectable()` decorator, which implements the `CanActivate` interface.
Guards determine whether a given request will be handled by the router handler or not, depending on certain conditions like permissions, roles, ACLs,etc.

<div style="color: skyblue">Hint</div>
###### Guards are executed after all middleware, but before any interceptor or pipe
### Automation testing

 
- End to End testing: verify the high level of the app, how the user interact with app
- Integration testing: define segment of the app and test them together. verify the sign in token for example

#### 1. End to End testing (E2E)

library to be used is `pactum` 

1. setup test database
2. setup the prisma service to cleaned up before everything

![[automated-testing]]

___
## Mental Model
___
1.  What are the main components of a NestJS application?

- **The controller** is responsible for handling incoming requests and sending responses. 
- **The service** is responsible for business logic and interacting with data sources. 
- **The module** is responsible for organizing the application into cohesive units.

#### 2. What are modules and why are they used in NestJS?

Modules are used in NestJS in order to group together related functionality and provide a higher-level structure for applications. By encapsulating related functionality into modules, NestJS applications can be more easily organized and maintained. This also makes it easier to reuse code across different parts of the application.

#### 3. What are controllers and why are they used in NestJS?

Controllers are responsible for handling incoming requests and sending responses to the client. In NestJS, controllers are used to define routes and map incoming requests to the appropriate handler functions.

#### 4. What are services and why are they used in NestJS?

Services are used in NestJS to encapsulate business logic and provide a way to share data and functionality between different parts of the application. Services can be injected into controllers and other services, making them a powerful tool for modularizing an application.

#### 5. What is the difference between a database and a cache?

- A database is where you store all of your data, while a cache stores only the most frequently used data. 
- A database is more permanent than a cache because it’s slower but has better performance. 
- Caches are faster than databases because they use RAM instead of hard drives, but they lose their data when the computer loses power. 
- You can also have multiple caches in an application, but you need just one database.
  
#### 6. What is a web server?
A web server can be described as a computer that stores web pages and distributes them. When you enter a URL into a browser, the browser contacts a web server to request the page. The page is then sent back to the browser by the web server which is displayed on the screen.

NGINX and Apache are two of the most widely used web servers by back-end apps. Web servers are also capable of hosting other resources such as videos and images.

#### 7. Talk about continuous integration and continuous delivery.
[Continuous integration and continuous delivery](https://www.turing.com/kb/ci-cd-pipeline) are two interconnected software engineering processes. Continuous integration is a process that takes place in an ongoing manner to ensure that the program is built and tested regularly. Continuous delivery, on the other hand, is the ongoing development process that takes place in the latter part of the program lifecycle just before production.

These two processes form a cohesive automated process that keeps the work on track and increases production speed by getting rid of the inconsistencies between the development and operations teams.

#### 8. What is the difference between MySQL and SQL?
SQL (Structured Query Language) is a programming language used to communicate with databases. 
MySQL is a relational database management system that uses SQL as its primary language. 
SQL is used to create, modify, and delete databases, while MySQL is used to store and access data within databases.

#### Peers and coach questions

 ### what are cookies? 
	 are small files of information that a web server generates and sends to a web browser. cookies are stored for a predetermined period of time, or for the lenght of user's session on a website.
#### **types of cookies:**
	- session cookies
	- persistent cookies
	- authentication cookies
	- tracking cookies
	- zombie cookies
### HTTP vs HTTPS? 
HTTPS uses TLS[Transport Layer Security](SSL[Secure Sockets Layer]) to encrypt normal HTTP requests and responses and to digitally sign those requests and response. whereby HTTP requests and responses are sent in plaintext, which means anyone can read them.

### what do you mean by HTTP being stateless independents request: 
this means that every HTTP request the server receives is independent and does not relate to requests that came prior to it. therefore the client's position in the result-set needs to be sent as part of the requests

### dto vs serializer?
 **Serialization:** is a process that happens before objects are returned in a network response. this is the place to provide rules for transforming and sanitizing the data to be returned to the client.-==For example, sensitive data like passwords should always be excluded from the ==
**DTO:** **Data Transfer Objects**
are the basis of data validation nestjs, enable various layers of flexible data validation in Nestjs. ==is an object to validate data and define data structure sent into your nestjs applications, similar to interfaces  but it used for type-checking, structure definition and data validate; they are defined using classes that are supported in native js and it remains after compilation==

 
### advantages of client server architecture???
this architecture improve scalability, centralized management and control, better security and the ability to share resources.
![[client-server-architecture.png.webp]]


 ## differentiate service from providers
 **Providers**: are plain JavaScript classes that are declared as providers in a module. Many of the basic classes may be treated as a provider such as services, repository, factories, helpers and so on. Provider can be injected as a dependency. ==means objects can create various relationships with each other, and the function of wiring up these objects can largely be delegated the Nestjs Runtime system==
![[providers.png]]


### dependencies injection container (repositories, services)
DI Container is an object that knows how to instantiate and configure objects and all their dependent objects. ==this let nestjs manage the creation and injection of dependencies into the components(controllers, services and more)==
1. relational db and non relational db
2. what is mongoose how it helpful
3. what is backend
4. is server hardware or software? both physic or soft
5. what is the decorators @POST, @GET, and @PUT
6. business logic and data access logic
7. invasion of controller: 
8. what are module: Modules are **containers for different parts of an application, such as controllers, services, and other related components**. They serve as a way to organize and encapsulate

## 12.22: Mental models
1. Discuss how tokens are used for authorization in an API. What is the difference between authentication and authorization, and how are these processes implemented with tokens?
2. Why is it important for tokens to have an expiration time? How can you implement token expiration in NestJS, and what role do refresh tokens play in maintaining user sessions?
3. How can you generate API documentation using Swagger in NestJS? Discuss the importance of documenting your API and how it benefits developers.
4. What is the difference between Provider and Services in Nestjs, can we have a provider without an injectable decorator, Give examples.
5. How does the Nest logger differ from the standard console.log() and when would you prefer one over the other?
___
# Backend mental model session questions

### Monishare backend project-related questions

- What are opaque types in TypeScript and what are their use-cases?
	> is a way to let TypeScript understand what we're really after, and will make TS shout at us when using the types wrong.
```ts

type Username = Opaque<string, "Username">;
type Password = Opaque<string, "Password">;

function logIn(username: Username, password: Password) {}

const username: Username = "username";
const password: Password = "password";

logIn(password, username);
```
- Why is it recommended to avoid throwing Nest.js native HTTP exceptions in services?
	> 
- What’s the difference between domain objects and DTOs
	> Domain Object: represent real-world concepts and business logic
	> DTOs: are simple data containers with no significant logic
	
- What’s the difference between a `find()` (eg: `findBookingById()`) and a `get()` (eg: `getBookingById()` method and when to use one over the other?
- What’s the use of the `type-fest` package in a TypeScript project?
	> Is a collection of essential TypeScript types. It contains many types that are not yet built-in
	
	
- What’s the difference between these `pg-promise` database query methods: `none()`, `one()`, `oneOrNone()`, `many()`, `manyOrNone()`
	- db.none: Expects no rows
	- db.one: Expects a single row
	- db.many: Expects one or more rows
	- db.oneOrNone: Expects 1 or 0 rows
	- db.any: Expects anything, same as `manyOrNone`
	- db.manyOrNone: Expects anything, same as `any`
	
- How are interface classes used for dependency injection? For example, using `IBookingRepository` interface class to inject `BookingRepository` in `BookingService`

### General questions

- What are SQL/database constraints and what are their use cases?
- What is Circular dependency (dependency cycle) in Node.js modules, and how can they be fixed?
	>  occurs when two classes depend on each other. For example, class A needs class B, and class B also needs class A.
	>  
		1. **Forward referencing**
		2. **ModuleRef**

```ts
@Module({
  imports: [forwardRef(() => CommonModule)],
})
export class CatsModule {}
```
- What are database transactions?
	> is one or more operations performed on a database
	
	
- What’s the difference between `UnauthorizedException` and `ForbiddenException` HTTP exceptions? When is it appropriate to throw one over the other?
- What are Nest.js exception filters and when would you prefer to use them?
	> is an exceptions layer which is responsible for processing all unhandled exceptions across an  application. When an  exception is not handled by your application code, it is caught by layer, which then automatically sends an appropriate user-friendly response
- What’s the difference between **J**est Spy vs Mock and when to use what**?**
	> you should use Spy when you have untestable code. You should use Mock when your function is critically dependent on other functions
	
	> 1. Mocks: Create fully mock or dummy objects, mainly used in large test suites. Mocks simulate dependency behavior and control the result returned when calling the dependency.
	> 2. Spies: Create partial or half mock objects, mainly used in large test suites. Spies help to monitor the behavior and verify that call is correct. Spies record information about how the class is being used.
	
	- why is recommended to throw http exception in service in nestjs?
		
	- how is the current user extracted from the token?
	- why do password need to be stored in db as hash?
	- password encryption with salt
	- why aren't email/username are not hashed?
	- what is guard?

**What are/is primary purpose of NestJS?** 
> ❑ A) Front-end development ❑ B) Backend development ❑ C) Creating RESTful APIs ❑ D) Creating GraphQL APIs Correct Answers: B, C, D

What is the role of the @Module() decorator in NestJS?
> ❑ A) Defines a service ❑ B) Defines a middleware ❑ C) Organizes the application structure ❑ D) Handles exceptions Correct Answer: C

How does Dependency Injection work in NestJS? 
> ❑ A) Using global variables ❑ B) Through constructors ❑ C) Via the database ❑ D) Using external libraries Correct Answer: B

What is a DTO (Data Transfer Object) in NestJS? 
> ❑ A) A database model ❑ B) An object that defines how data will be sent over the network ❑ C) A type of service ❑ D) A middleware Correct Answer: B

What are exception filters used for in NestJS? 
> ❑ A) To filter out specific HTTP requests ❑ B) To catch and handle exceptions ❑ C) To validate user input ❑ D) To manage database exceptions only Correct Answer: B

What can custom decorators in NestJS be used for?
>❑ A) To add metadata to classes ❑ B) To create new pipes ❑ C) To extract information from the request object ❑ D) To customize exception filters Correct Answers: A, C

What is crucial when integration testing controllers in NestJS?
>❑ A) Checking the integration with services ❑ B) Verifying the response status and data ❑ C) Ensuring proper logging ❑ D) Testing for interruption on the database connection Correct Answers: A, B

When testing services in NestJS, what is a key focus? 
> ❑ A) User interface testing ❑ B) Load testing ❑ C) Unit testing of business logic ❑ D) End-to-end testing Correct Answer: C

What is integration testing? 
> ❑ A) Testing individual components in isolation ❑ B) Testing the interaction between multiple components ❑ C) Testing user interface elements ❑ D) Testing individual functions or methods Correct Answer: B

Which of the following values will evaluate to TRUE when used in an if statement? (if (<value>) { /* will this run? */ } ) 

> ❑ A) [] (an empty array) ❑ B) null ❑ C) 0 (the number zero) ❑ D) "" (an empty string) Correct Answer: A

Given the following objects: const a = { x: 13, y: "A" } const b = { x: 99, z: undefined } const c = { x: undefined, y: "C", z: 42 } What is the result of { ...a, ...b, ...c }? 
> ❑ A) This is not valid TypeScript and will not compile. ❑ B) { x: 99, y: "C", z: 42 } ❑ C) { x: 99, y: "A", C: 42 } ❑ D) { x: undefined, y: "C", z: 42 } Correct Answer: C

What is the primary reason for using database transactions? 
> ❑ A) They increase performance. ❑ B) They improve security. ❑ C) They make your code easier to understand. ❑ D) They make concurrent operations safe. Correct Answer: D

Which statements, if any, are true with regards to application services? 
> ❑ A) A service method should implement a business use case. ❑ B) A service can use multiple repositories. 
❑ C) The errors thrown by a service should mirror common HTTP status codes. ❑ D) A service translates database errors into domain errors. Correct Answer: B

Which of the following statements, if any, are true about domain objects? 
> ❑ A) They should not be nested. ❑ B) They should mirror their DTO-counterparts as closely as possible. ❑ C) They should not be composed of data from more than one database table. ❑ D) They should not be used in controllers. Correct Answer: none

Why does it make sense to differentiate between a controller, application and persistance layer?
..........................................................
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

You are doing the code review for a feature a colleague implemented. For this feature, users will be encouraged to upgrade their car to a more powerful (fast, loud, and smelly) “American muscle car” , if available. Do you have any comments or feedback for the newly implemented method in the CarRepository?

```ts
	public async getPowerfulCars(tx: Transaction, horsepower: number):Promise<Car[]>{
	const rows = await tx.any<Row>("SELECT * FROM cars WHERE fuelType != 'electric",)
	const cars =[]
	for(const row of rows){
		if (row.horsepower > horsePower){
			const car = rowToDomain(row)
			cars.push(car)
		}
	}
	return cars
}
```


What is/are the main responsibility of a controller in NestJS? 
> ❑ A) data validation (syntactical) ❑ B) Database management ❑ C) Handling HTTP requests and responses ❑ D) Injecting dependencies Correct Answer: A, C

## The main core concepts of Nest.js include:

1. **Modules:** Modules are used to organize the application into logical units. Each module encapsulates related components, controllers, services, and other dependencies. Modules provide a boundary for the dependency injection system and help keep the codebase modular and maintainable.
2. **Controllers:** Controllers are responsible for handling incoming requests and generating responses. They receive requests from clients, process the necessary data, and invoke the appropriate services to perform business logic. Controllers are decorated with decorators such as ‘@Controller’ and define routes and HTTP methods to handle.
3. **Providers:** Providers are the building blocks of Nest.js applications. They are responsible for implementing business logic, interacting with databases or external services, and can be injected into other components. Providers can be services, repositories, factories, or any other injectable class. They are decorated with ‘@Injectable’ and can use dependency injection to manage their own dependencies.
4. **Dependency Injection:** Nest.js leverages dependency injection (DI) to manage the application’s dependencies and promote modular design. DI allows you to define providers and inject them into the classes that require them, reducing tight coupling between components and facilitating testing and reusability.
5. **Middleware:** Middleware functions in Nest.js are responsible for intercepting and processing incoming requests and outgoing responses. They sit between the client and the route handler, allowing you to add common functionalities such as logging, authentication, error handling, and more. Middleware can be global, module-specific, or route-specific.
6. **Guards:** Guards are used for authentication and authorization purposes in Nest.js. They allow or deny access to certain routes based on specific conditions. Guards can be used to protect routes based on roles, permissions, authentication tokens, and more. They can be synchronous or asynchronous.
7. **Interceptors:** Interceptors provide a way to intercept and modify the execution flow of requests and responses. They sit between the client and the route handler and can perform tasks such as logging, data transformation, error handling, and more. Interceptors can be used globally, at the module level, or at the route handler level.
8. **Pipes:** Pipes in Nest.js are used for data transformation and validation. They allow you to transform and validate incoming request data before it reaches the route handler. Pipes can be used for tasks such as data sanitization, data transformation, data validation, and more. They can be synchronous or asynchronous.






1. What are exception filters and how they work?


What is NestJS primarily used for?

a. Front-end development
b. Mobile app development
c. Back-end development
d. Database management
==> c

In NestJS, which programming language is commonly used?

a. JavaScript
b. TypeScript
c. Python
d. Java
==> b

How does NestJS handle dependency injection?

a. Using Angular's dependency injection system
b. Through its own built-in dependency injection system
c. By relying on third-party libraries
d. Dependency injection is not supported in NestJS
==>a

What decorator is used to mark a class as a module in NestJS?

a. @Module
b. @Component
c. @Controller
d. @Service
==> a

Which decorator is used to define a route parameter in NestJS?

a. @Param
b. @RouteParam
c. @PathParam
d. @Query
==> a

What is the purpose of the @Controller decorator in NestJS?

a. It defines a class as a service provider.
b. It defines a class as a controller, handling incoming requests.
c. It declares a class as a middleware in the application.
d. It specifies a class as a data model for the database.
==> b

How can you enable CORS (Cross-Origin Resource Sharing) in NestJS?

a. Using the @EnableCORS decorator
b. By configuring the CORS property in the nest.config.js file
c. Using the @CrossOrigin decorator on controllers or methods
d. CORS is enabled by default in NestJS
==> d

In NestJS, what is the purpose of the @Injectable decorator?

a. To define a class as a module
b. To mark a class as a service provider that can be injected
c. To declare a class as a data transfer object (DTO)
d. To specify a class as a middleware in the application

Which command is used to generate a new NestJS module using the CLI?

a. nest generate module
b. nest create module
c. nest new module
d. nest add module

What role do Guards play in NestJS?

a. To define data models
b. To handle authentication and authorization logic
c. To manage database connections
d. To create middleware functions

How do you define a global prefix for all routes in NestJS?

a. Set the prefix property in the @Module decorator
b. Use the @Global decorator with a prefix parameter
c. Set the globalPrefix property in the nest.config.js file
d. Use the setGlobalPrefix method in the main application file

Which of the following is a valid way to handle errors in NestJS?

a. Using try-catch blocks in route handlers
b. Implementing a custom exception filter
c. Using the @ErrorHandling decorator
d. Errors are automatically handled in NestJS; no specific actions are required

What is the purpose of the @Query() decorator in NestJS?

a. It extracts query parameters from the request
b. It defines a parameter as a query string
c. It queries the database for specific data
d. It sets up a query middleware for the controller
==> a

How do you define a default value for a route parameter in NestJS?

a. Using the @DefaultValue decorator
b. Setting a default value in the @Param decorator
c. Specifying a default value in the route definition
d. Default values for route parameters are not supported in NestJS
==> b
import { Controller, Get, Param } from '@nestjs/common';

@Controller('items')
export class ItemsController {
 @Get(':id')
 getItem(@Param('id') id: string = 'defaultId') {
    // If the id is not provided in the request, 'defaultId' will be used
 }
}


What is the purpose of the @Res() decorator in NestJS?

a. It extracts request parameters
b. It defines a parameter as a response object
c. It represents a reserved keyword and has no specific purpose
d. It is used for result transformation
==> b

Which decorator is used to inject the current user into a route handler in NestJS?

a. @User()
b. @CurrentUser()
c. @InjectUser()
d. @InjectCurrentUser()
==> b

How can you create a global-scoped middleware in NestJS?

a. Use the @Global decorator with @Middleware
b. Define a middleware class and include it in the main application module
c. Use the @GlobalMiddleware decorator
d. Global middleware is not supported in NestJS
Response: b
==> To create a global-scoped middleware in NestJS, you define a middleware class and then include it in the main application module.

What is the purpose of the @Header() decorator in NestJS?

a. It extracts header values from the request
b. It defines a parameter as a header object
c. It sets up a middleware to handle headers
d. It represents a reserved keyword and has no specific purpose
Response: a
==> The @Header() decorator in NestJS is used to extract specific header values from the incoming HTTP request. It can be used to retrieve any value from the headers, not just predefined ones. If no argument is passed to the @Header() decorator, it will return the entire headers object
How do you create a POST request handler in NestJS that accepts JSON data?

a. Use @Post() with @Body() decorator
b. Use @Post() with @JsonBody() decorator
c. Use @Post() with @Request() decorator
d. Use @Post() with @FormData() decorator
Response: a
==> 
import { Controller, Post, Body } from '@nestjs/common';

@Controller('items')
export class ItemsController {
 @Post()
 createItem(@Body() itemDto: ItemDto) {
    // Handle the creation of the item here
 }
}


Which of the following statements is true about NestJS interceptors?

a. Interceptors can only be applied at the controller level.
b. They are primarily used for defining data models.
c. They execute after the route handler is called.
d. Interceptors are not supported in NestJS.
Response: c
==> Interceptors in NestJS are powerful tools that can be used to add extra logic to the request handling pipeline. They can bind extra logic before or after method execution, as well as modify the result returned from a function or the exception thrown

How can you set up Swagger documentation for your NestJS application?

a. Use the @Swagger decorator on controllers
b. Configure the Swagger module in nest.config.js
c. Use the @ApiOperation decorator on route handlers
d. Install the @nestjs/swagger package and configure it in the main application module
Response: d

Which decorator is used for request validation in NestJS?

a. @ValidateRequest
b. @ValidationPipe
c. @RequestValidation
d. @RequestPipe
Response: b

What is the purpose of the @Response() decorator in NestJS?

a. It extracts response parameters
b. It defines a parameter as a response object
c. It is used to manipulate the HTTP response
d. It is used for handling responses from external APIs
Response: b

How do you implement versioning in NestJS?

a. Use the @Version decorator on controllers
b. Specify the version in the route definition
c. Use the @ApiVersion decorator on route handlers
d. Versioning is not supported in NestJS.
Response: b

How do you create a middleware in NestJS?

a. Use the @Middleware decorator on a class
b. Define a class with a specific naming convention (e.g., middleware.controller.ts)
c. Use the @Middleware() decorator on route handlers
d. NestJS does not support middleware.
Response: a

Which of the following is a valid use case for a custom decorator in NestJS?

a. To define route parameters
b. To create a new module
c. To handle authentication logic
d. To specify the controller path
Response: c

How can you handle file uploads in NestJS?

a. Use the @FileUpload decorator
b. Use the @Upload() decorator on route handlers
c. Use the @UploadedFile decorator
d. File uploads are not supported in NestJS
Response: c

	import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
	import { FileInterceptor } from '@nestjs/platform-express';

	@Controller('upload')
	export class FileAndDataUploadController {
    		@Post()
    		@UseInterceptors(FileInterceptor('file'))
    		uploadFileAndData(@UploadedFile() file, @Body() body) {
        		console.log(file);
        		console.log(body);
        		return 'File and data uploaded successfully!';
    		}
	}


What is the purpose of the @UsePipes() decorator in NestJS?

a. To define a global prefix for routes
b. To apply a middleware to specific route handlers
c. To handle authentication logic
d. To apply validation pipes to route handlers
Response: d

How can you secure routes in NestJS?

a. Use the @Secure decorator on controllers
b. Implement custom guards for authentication and authorization
c. Set security rules in the nest.config.js file
d. Security is handled automatically in NestJS; no additional steps are required
Response: b,

How do you handle database interactions in NestJS?

a. Use the @Database decorator on controllers
b. Implement a custom database module
c. Utilize the built-in TypeORM or Mongoose modules
d. NestJS does not support database interactions.
Response: b, c