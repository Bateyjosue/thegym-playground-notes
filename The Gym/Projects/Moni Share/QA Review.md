
- space between cars display and the back link section
- rounded circle on the circle down the car on the header
- customize the error to display the error happening

## Backend Architecture Moni share

### remark:
- many ways to do an architecture in backend
- might be over engineers, to work on a clean architecture, it support future development


- **controller** 
- services: 
- module
- 

![[architecture.png]]

##### Controller ==Controller==
talk via http, this is the only part of the application that knows about http. think of it as an adapter from the web to your business application

###### Is in charge of: 
- authentication
- syntactic validation
- serialization and deserialization

```js
class PersonDTO {
	id: number
	name: string
	dataOfBorth:string
	hobbies: string[]
}
```

##### Application ==Service==
this is where all business logic lies. this code knows nothing about HTTP or database tables

###### Is in charge of: 
- semantic validation
- business logic

```js
class Person {
	id: number
	name: string
	dataOfBorth: Dayjs
	hobbies: Set<string>
}

```
##### Persistence ==Repository==
The only purpose of this layer is to save domain objects to the database and read them back out

###### Is in charge of: 
- loading/saving to the database,
- serialization and deserialization

```js
type PersonRow = {
	id: number
	name: string
	password_hash: string
	dataOfBirth: number
	hobby_id: number
	
}

type HobbyRow = {
	title: string
}
```


> Take care of converting representational data from persistence to application 

We are decoupling our layers and them flexible  for future changes

data container VS DTO? in this architecture they have the same structure

data container =  
DTO = 

> Barrel exports file is use to export all the module in a specific folder structure to reduce the multiple imports


---
### Test  Container
---
