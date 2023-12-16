Dependency Injection (DI) in NestJS is a powerful design pattern that facilitates the organization and management of components within an application. It simplifies the way components acquire their dependencies, making the code more modular, reusable, and testable. Under the hood, NestJS uses a Dependency Injection container to manage and inject dependencies.

### 1. **Decorators:**

- In NestJS, decorators are used to identify different types of components: `@Module()`, `@Controller()`, `@Service()`, etc.
- Each decorator plays a role in configuring the Dependency Injection container.
### 2. **Providers:**

- In the context of DI, components managed by the DI container are often referred to as "providers."
- Providers include services, controllers, repositories, etc.
### 3. **Module Configuration:**

- The `@Module()` decorator is used to define modules in NestJS.
- Modules are the primary way to organize providers and their dependencies.
```js
import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}

```

### 4. **Constructor Injection:**

- Dependencies are injected through the constructor of a class.
- When a component requests a dependency in its constructor, the DI container resolves and injects it.
```ts
import { Injectable } from '@nestjs/common';
import { ExampleService } from './example.service';

@Injectable()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  // Controller logic using exampleService
}

```

### 5. **Scopes:**

- Providers can have different scopes:
    - **Singleton:** A single instance shared across the entire application.
    - **Transient:** A new instance is created each time it is requested.
    - **Request:** A new instance for each incoming HTTP request.
```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class ExampleService {
  // Service logic
}

```

### 6. **Forward Referencing:**

- NestJS supports forward referencing, meaning you can reference a provider before it's declared in the module.
- This enables clean and readable code.
```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  constructor(private readonly anotherService: AnotherService) {}

  // Service logic
}

@Injectable()
export class AnotherService {
  // Service logic
}

```

### 7. **Custom Providers:**

- You can create custom providers using the `@Inject()` decorator.
- This allows you to inject dependencies that aren't automatically discovered by NestJS.
```ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ExampleService {
  constructor(@Inject('EXAMPLE_TOKEN') private readonly exampleToken: string) {}

  // Service logic
}

```

### 8. **Lifecycle Events:**

- Providers can implement lifecycle events such as `onModuleInit` or `onModuleDestroy` to execute code when a module is initialized or destroyed.
```ts
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class ExampleService implements OnModuleInit {
  onModuleInit() {
    console.log('ExampleService has been initialized');
  }

  // Service logic
}

```

## Conclusion

**NestJS leverages Dependency Injection to manage the instantiation and injection of components within the application. This promotes a modular and maintainable code structure by allowing components to focus on their specific responsibilities and rely on external dependencies through a straightforward and consistent mechanism**

![[reame]]