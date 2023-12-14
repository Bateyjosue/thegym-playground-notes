
# Todo Sign in

#### Acceptance criteria
- find the user by email
- if user does not exist throw an exception
-  compare password
- if password incorrect throw exception
- else send back the user

##### Logic

- use guard condition to filter out user who are trying to login with an email which does not exist


```ts

```
##### tools
- passport library

```bash
npm install --save-dev @nestjs/passport passport

npm i --save @nest/jwt passport-jwt @types/passport-jwt
```

- session authentication are passed to the request
- JWT authentication are passed with code

### JWT Authentication

- prepare a module 
 - configure module
```bash 
	npm i @nestjs-config
```


Under the hood jwt uses passport auth library

#### After write code for creating token we need another logic to intercept the token and validate if still valid to perform the operation needed
