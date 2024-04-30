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
- Adaptability: promotes verticalization and customization scenarios
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
- Separation of concerns: keep domain models clean and comprehensible, by factoring out technical concerns
```ts
extend Books with @restrict: [ 
	{ grant:'WRITE', to:'admin' } 
];
```

### Querying & Views
it allows clients to request the exact information they really need.
>  The querying-based approach to process data is in strong contrast to ORM

#### Core Query Language(CQL)
is a CDS's advanced query language. it enhances standard SQL with elements to easily query deeply nest object graphs and document structures.

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

### Services & Events
- All active things are services
- services are declared in CDS
- services provide uniform APIs
- services react on Events
- services consume other services
- all data is passive
![[agnostic-services.drawio.BD7ZXh2C.svg]]
### Served out of the Box
The CAP runtimes in Node.js and Java provide many generic implementations for recurring tasks and best practices distilled from proven SAP applications.
###### Benefits
Accelerate development, minimize boilerplate and increase quality through single points to fix and optimize.