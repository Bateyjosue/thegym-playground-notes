
![[controller.png]]

are responsible for handling [incoming requests] and [returning responses] to the client.

Controllers in NestJS are classes annotated with the `@Controller()` decorator. Decorate a class with `@Controller('route')` to specify the base route for all endpoints defined within that controller.

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  // Endpoint definitions go here
}

```

1. **Handling HTTP Methods:**

	- Controllers use decorators like `@Get()`, `@Post()`, `@Put()`, `@Delete()`, etc., to specify which HTTP methods the route should handle.
	- These decorators are applied to methods within the controller class.
```ts
import { Controller, Get } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  @Get()
  findAll(): string {
    return 'This handles GET requests to /example';
  }
}

```

2. **Route Parameters** 
	- Controllers can handle dynamic route parameters using the `@Param()` decorator.
	- Parameters are extracted from the request URL and passed to the corresponding controller method.
```ts
import { Controller, Get, Param } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This handles GET requests to /example/${id}`;
  }
}

```

3. **Request and Response Objects**
	- Controllers can access the request and response objects using the `@Req()` and `@Res()` decorators.
	- These decorators provide direct access to the Express.js request and response objects.
```ts
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('example')
export class ExampleController {
  @Get()
  findAll(@Req() req: Request, @Res() res: Response): string {
    // Access the request and response objects
    return 'Handling GET requests using request and response objects';
  }
}

```

4.  **Dependency Injection**
	- Controllers support dependency injection, allowing you to inject services or other dependencies into controller classes.
	- Use the constructor to specify the dependencies.

```
import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  findAll(): string {
    return this.exampleService.getData();
  }
}
```

5. **Middleware**

	- Middleware can be applied to controllers using the `@Use()` decorator.
	- Middleware functions can intercept requests before they reach the controller method.
```ts
import { Controller, Get, Use } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Controller('example')
@Use(LoggerMiddleware)
export class ExampleController {
  @Get()
  findAll(): string {
    return 'Handling GET requests with middleware';
  }
}
```

![[dependency injection]]