## CAP-Cloud Application Programming model
is framework of languages, libraries, and tools for building enterprise-grade services and applications. 
In SAP we focus on accelerated development and safeguarding investments in world of rapidly changing cloud technologies.

![[overview.drawio.nNpV5hug.svg]]
				NODE | EXPRESS | JAVA | SPRING

On Top of  open source, CAP mainly adds:
1. **Core Data Services (CDS)** as an universal modeling language for both domain models and service definitions.
2. **Service SDKs and runtimes** for Node.js and Java

### Core Data Services (CDS)
is a universal language to capture static, as well as behavioral aspects of problem domains in conceptual,  concise, and comprehensible ways, and hence serves as the very backbone of CAP.

#### Domain Models
Capture static aspects of problem domains as well-know entity-relationship models.
- **Associations** capture relationships
- **Compositions**: extend that to easily model document structures.
- **Annotations**: allow enriching models with additional metadata, such as for UIs, validations, input Validation or Authorization.

#### CDS Aspects & Mixins
Aspects allow to flexibly extend models at design time or dynamically at runtime
##### Adaptability:
> promotes verticalization and customization scenarios
```ts
// Verticalization 
extend Books with { 
	ISBN : String 
}; 
// Customization 
extend Orders with { 
	customer_specific : String 
};
```
##### Separation of concerns: 
> keep domain models clean and comprehensible, by factoring out technical concerns
```ts
// Separation of Concerns
extend Books with @restrict: [ 
	{ grant:'WRITE', to:'admin' } 
];
```
### Querying & Views
it allows clients to request the exact information they really need.
>  The querying-based approach to process data is in strong contrast to ORM

#### Core Query Language(CQL)
> Is a CDS's advanced query language. 
> It enhances standard SQL with elements to easily query deeply nest object graphs and document structures.

`CQL`
```sql
SELECT ID, addresses.country.name from Employees
```

`SQL`
```sql
SELECT Employees.ID, Countries.name FROM Employees
 LEFT JOIN Addresses ON Addresses.emp_ID=Employees.ID
 LEFT JOIN Countries AS Countries ON Addresses.country_ID = Countries.ID
```

##### Queries as first-order Objects (CQN)
> using CQN as plain object notation

```js
// In JS
// In JavaScript code
orders = await SELECT.from (Orders, o=>{
  o.ID, o.descr, o.Items (oi=>{
    oi.book.title, oi.quantity
  })
})

// In OData
// Via OData
GET .../Orders?$select=ID,descr
$expand=Items(
  $select=book/title,quantity
)
```
> OData: (Open Data Protocol) is **a widely adopted standard for building and consuming RESTful APIs**. 
> It simplifies data sharing across disparate systems, making it easier for developers to expose and consume data in a standardized manner

>  is an open protocol that allows the creation and consumption of queryable and interoperable Web service APIs in a standard way


##### Projections at design Time
> using CQL in CDS to declare de-normalized views on the underlying domain model

```ts
// Projections in CDS
service OrdersService {
  define entity OrderDetails
  as select from Orders {
     ID, descr, Items
  }
}
```
### Services & Events
- All active things are services
- services are declared in CDS
- services provide uniform APIs
- services react on Events
- services consume other services
- all data is passive
> Services in CAP are stateless and with a minimal footprint, which allows you to modularize solutions into single-purposed services or functions-as-a-service.
![[agnostic-services.drawio.BD7ZXh2C.svg]]

#### Service Definitions in CDS
> are declared in CDS models, used to serve requests automatically. 
> They embody the bahavioral aspects of a domain in terms of exposed entities, actions and events.

```ts
// Service Definition in CDS
service OrdersService {
  entity Orders as projection on my.Orders;
  action cancelOrder (ID:Orders.ID);
  event orderCanceled : { ID:Orders.ID }
}
```

#### Uniform consumption
> Every active thing in CAP is a service, including  local services or remote ones even databases are represented as services.
> All services provide a uniform API for programmatic consumption. 
> Thus, application code stays agnostic to underlying protocols

```js
// Consumption in JavaScript
let srv = cds.connect.to('OrdersService')
let { Orders } = srv.entities
order = await SELECT.one.from (Orders)
  .where({ ID:4711 })
srv.cancelOrder (order.ID)

// Consumption via REST APIs
GET /orders/Orders/4711
POST /orders/cancelOrder/4711
```

#### ubiquitous events
> Everything in CAP happens in response to events. 
> CAP features a ubiquitous notion of events, which represent both requests coming in through synchronous APIs as well as asynchronous event messages, thus blurring the line between both worlds.
> we add custom logic in event handlers, registered to implement service operations.
> In the same way, we subscribe to asynchronous events emitted by other services.

```js
// Service Implementation
cds.service.impl (function(){
  this.on ('UPDATE','Orders', (req)=>{})
  this.on ('cancelOrder', (req)=>{})
})


// Emitting Events
// e.g. in this.on ('cancelOrder', ...)
let { ID } = req.data
this.emit ('orderCancelled', {ID})


// Subscribing to Events
let srv = cds.connect.to('OrdersService')
srv.on ('orderCancelled', (msg)=>{})
```
### Served out of the Box
> The CAP runtimes in Node.js and Java provide many generic implementations for recurring tasks and best practices distilled from proven SAP applications.

> Benefits are significantly  accelerated development, minimized boilerplate code, as well as increased quality through single points to fix and optimize
#### Benefits of CAP runtimes in Node.js and Java
Accelerate development, minimize boilerplate and increase quality through single points to fix and optimize.

#### Generic Features
##### 1. **Automatically Serving Requests**
  - Serving CRUD requests
  - Serving nested documents
  - Serving media data
  - Serving Draft Choreography
##### 2. Handling Recurring Tasks
  - Implicit Pagination
  - Input validation
  - Authentication
  - Authorization
  - Localization / i18n
  - Concurrency control
##### 3. Enterprise Best Practices 
  - Common reuse types & aspects
  - Managed data
  - Localization data 
  - Temporal data
  - verticalization & extensibility

## Related Concepts
- CAP promotes Domain-Driven Design (DDD)
> DDD is an approach to software development that centers on constructing software based on the requirements of business domains.

## Glossary
- [**CAP**] Colloquial shorthand for "SAP Cloud Application Programming Model". Not an official product name, though.
- [**CDS**] Core Data and Services : a family of languages, tools and libraries to declare, process and consume conceptual, semantically enriched data models.
- [**CDL**] CDS Definition Language : a human-readable representation of CDS models.
- [**CSN**] object-based representation of CDS models.
- [**CQN**] object-based representation to capture queries. 
- [**CXN**] object-based representation to capture expressions.
## SAP BTP(Business Technology Platform)
> is an open set of Software, Platform and Infrastructure as a service system that delivers in-memory capabilities, core platform services and unique micro-services for building and extending intelligent mobile and browser enabled application.
> is multilingual, with support for most major languages (now including ABAP) and support for development, testing, and production systems both inside an organization and to the larger public