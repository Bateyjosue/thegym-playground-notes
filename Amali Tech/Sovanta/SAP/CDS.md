# Core Data Services
> It provides the means to declaratively capture service definitions and data models, queries and expressions in plain JS object notations.
> CDS features to parse from a variety of source languages and to compile then into various target languages(OData, Open API, Async API, JSON or YAML, SQL or DDL, HANA DDL).

![[csn.drawio.Dl4YQBvj.svg]]
## Definition Language (CDL)
> CDS: a human-readable syntax for defining models
> CQL: extension of SQL to write queries

### Entity and Type definitions
#### Define Entity
> Entities are structured types with named and typed elements, representing sets of data that can be read and manipulated using usual CRUD operations.
> They usually contain on or more designated key elements annotated with 'key' keyword

```ts
define entity Employees {
	key ID: Integer;
	name: String;
	jobTitle: String;
}
```
> The define keyword is optional, we could say `entity Employees {...}`

#### Define Type
> You can declare custom types to reuse later on for elements in entity definitions

```ts
type User: String(111)
type Amount {
	value: Decimal(10, 3);
	currency: Currency;
}
type Currency: Association to Currencies;
```

#### Predefined Types[​](https://cap.cloud.sap/docs/cds/cdl#predefined-types)

[See list of **Built-in Types**](https://cap.cloud.sap/docs/cds/types)

#### Structured Types
> You can declare and use custom struct types as follows

```ts
type Amount {
	value: Decimal(10, 3);
	currency: Currency;
}

entity Books {
	price: Amount;
}
```
> Can also be specified with anonymous inline struct types as follows
```ts

entity Books {
	price: {
		value: Decimal(10, 3);
		currency: Currency;
	};
}
```

#### Arrayed Types
> prefix a type specification with `array of` or `many` to signify array types

```ts
type EmailAddress: {
	kind: String;
	address: String;
}

entity Car {
	emails: many EmailAddress
}
```
OR
```ts
type EmailAddresses: many {
	kind: String;
	address: String;
}

entity Car {
	emails: EmailAddresses
}
```
> When deployed to SQL databases, such fields are mapped to LargeString columns and data is stored denormalized as JSON array.
> with OData v4, arrayed types are rendered as `Collection` in the EDM(X)

$$&Arrayed Elements are not supported on filter expressions, instance-based authorization and search$$
#### Virtual Elements
> An element prefixed with keyword `virtual` indicates that this element isn't added to persistent artifacts that is tables or views in SQL db.
> Virtual elements are part of OData metadata
> They are annotated by default with `@Core.computer:true`, can be explicitly disable by annotating it with `@Core.computed:false`, but they are still not persisted and therefore not sortable or filterable

```ts
entity Employees {
	[...]
	virtual something: String(11);
}
```

#### Literals
Null => `null`
Boolean => `true`, `false`
String => 'foo',
[Learn more about literals and their representation in CSN.](https://cap.cloud.sap/docs/cds/csn#literals)

#### Delimited Identifiers
> Allow you to use any identifiers, even containing special characters or using a keywords
> 
```ts
entity ![Entity] {
	bar: ![Keyword];
	![with space]: Integer;
}
```
> You can escape `]` by `]]`, for example `![L[C]]R]` which will be parsed as L[C]R

#### Calculated Elements
> Elements of entities ans aspects can be specified with a calculated expression in which you can refer to them to other elements of the same entity/aspect.
> calculated elements with value expression are read-only, no value must be provided for them in WRITE operation
##### On-read
```ts
entity Employees {
  firstName : String;
  lastName : String;
  name : String = firstName || ' ' || lastName;
  name_upper = upper(name);
  addresses : Association to many Addresses;
  city = addresses[kind='home'].city;
}
```
##### On-write
> Calculated elements "on-write" (also referred to as "stored" calculated elements) are defined by adding the keyword `stored`. A type specification is mandatory.
```ts
entity Employees {
  firstName : String;
  lastName : String;
  name : String = (firstName || ' ' || lastName) stored;
}
```

#### Default Values
> As in SQL you can specify default values to fill in upon INSERTs if no value is specified for a given element

```ts
entity Foo {
  bar : String default 'bar';
  boo : Integer default 1;
}

```

#### Constraints
> Element definitions can be augmented with constraint `not null` as known from SQL.

```ts
entity Employees {
  name : String(111) not null;
}
```

#### Enums
> You can specify enumeration values for a type as a semicolon-delimited list of symbols

```ts
type Gender: String enum {
	male; 
	female;
	non_binary = 'non-binary';
}

entity Order {
	status: Integer enum {
		submitted =  1;
		fulfilled =  2;
		shipped   =  3;
		canceled  = -1;
	}
}
```
> for string types, declaration of values is optional; if omitted, the actual values are the string counterparts of the symbols.
> To enforce your enum to runtime use the `@assert/range` annotation

```ts
entity Foo {
  bar : Integer  @assert.range: [ 0, 3 ];
  boo : Decimal  @assert.range: [ 2.1, 10.25 ];
  car : DateTime @assert.range: ['2018-10-31', '2019-01-15'];
  zoo : String   @assert.range enum { high; medium; low; };
}
```

### Views and projections
> Use `as select from` or `as project on` to derive new entities from existing ones by projections, very much like views in SQL.

#### The `as select from` variant
```ts
entity Foo1 as select from Bar; //> implicit {*}
entity Foo2 as select from Employees { * };
entity Foo3 as select from Employees LEFT JOIN Bar on Employees.ID=Bar.ID {
  foo, bar as car, sum(boo) as moo
} where exists (
  SELECT 1 as anyXY from SomeOtherEntity as soe where soe.x = y
)
group by foo, bar
order by moo asc;
```

#### The `as proejction on` variant
```ts
entity Foo as projection on Bar {...}
```
> use this to not fully use the power of SQL in your query. 
> for example, having a restricted query in an entity allows us to serve such an entity from external OData services

##### Currently the restrictions of `as projection on` compared to `as select from` are
- no explicit, manual `JOINs`
- no explicit, manual `UNIONs`
- no sub selects in from clauses
#### Views with inferred signatures
> by default views inherit all properties and annotations from their primary underlying base entity.
> Their elements signature is inferred from the projection on base elements.
> Each element inherits all properties from the respective base element, except the `key` property.

##### The `key` is only inherited if all of the following applied
- No explicit `key` is set in the query
- all key elements of the  primary base entity are selected by using `*`
- no path expression with a to-many association is used
- no `union`, `join` or similar query construct is used
For Example
```ts
entity SomeView as select from Employees {
  ID,
  name,
  job.title as jobTitle
};
```
Might result in this inferred signature
```ts
entity SomeView {
  key ID: Integer;
  name: String;
  jobTitle: String;
};
```
> CAP does not enforce uniqueness for key elements of a view or projection.

##### Use a CDL cast to set an element's type, if one of the following conditions apply
- You don't want to use the inferred type
- The query column is a expression(no inferred type is computed)