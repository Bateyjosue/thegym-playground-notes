
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

1. what are cookies?
2. HTTP vs HTTPS? => public and private???
3. what do you mean by HTTP being stateless independant request....
4. Dto in nestjs? is dto same as the serializer??????
5. advantages of client server architecture???
6. relational db and non relational db
7. what is mongoose how it helpful
8. what is backend
9. is server hardware or software? both physic or soft
10. what is the decorators @POST, @GET, and @PUT
11. business logic and data access logic
12. 