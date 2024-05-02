Automated testing is a crucial aspect of software development, ensuring quality and performance goals are met. Nest, a framework for building scalable Node.js applications, strongly supports testing by offering features that simplify the process. It automatically generates default unit tests for components and end-to-end (e2e) tests for applications. Nest provides essential tooling, including a test runner with an isolated module/application loader, streamlining the setup of testing environments.

One notable feature is Nest's integration with popular testing tools like Jest and Supertest out-of-the-box. This integration, while providing default tooling, remains agnostic to testing tools, allowing flexibility for developers and teams. Additionally, Nest makes its dependency injection system available in the testing environment, facilitating the easy mocking of components. This commitment to testing best practices enhances productivity, especially at critical development lifecycle stages such as source code control check-in, feature integration, and version release.

In Nest.js, like in many modern web development frameworks, testing is often categorized into different types, including unit tests, end-to-end (e2e) tests, and integration tests. Let's explore each type with examples in the context of Nest.js.

### 1. Unit Tests:

- **Purpose:** To test individual units or components of the application in isolation.
- **Scope:** Focuses on testing a specific function, method, or class independently.
- **Isolation:** Mocks external dependencies to ensure tests are isolated and deterministic.

**Example**

```js
// Sample service in Nest.js
class CalculatorService {
  add(a: number, b: number): number {
    return a + b;
  }
}

// Corresponding unit test
describe('CalculatorService', () => {
  it('should add two numbers', () => {
    const service = new CalculatorService();
    const result = service.add(2, 3);
    expect(result).toBe(5);
  });
});

```

### 2. End-to-End (e2e) Tests:
- **Purpose:** To test the entire application from end to end, simulating real user scenarios.
- **Scope:** Involves multiple components, services, and modules to ensure the application behaves correctly as a whole.
- **Execution:** Typically runs against a deployed or simulated environment to mimic real-world usage.

**Example**
```js
// Sample e2e test using Nest.js testing utilities
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello, World!');
  });

  afterAll(async () => {
    await app.close();
  });
});

```

### 3. Integration Tests:
- **Purpose:** To test the interactions and collaborations between different parts of the application.
- **Scope:** Focuses on how various components work together to achieve specific functionalities.
- **Execution:** Typically involves testing multiple units or modules interacting with each other.

**Example in Nest.js:**

```js
// Sample integration test using Nest.js testing utilities
import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = module.get<CatsService>(CatsService);
    catsController = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  it('should return an array of cats', async () => {
    const result: Cat[] = [{ name: 'Kitty', age: 3 }];
    jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

    expect(await catsController.findAll()).toBe(result);
  });
});

```

#### Installation
```bash
$ npm i --save-dev @nestjs/testing
```

##### Unit Testing

we perform unit testing on two classes, namely CatsController and CatsService, within the Nest.js framework. Jest, the default testing framework, serves as both a test-runner and offers essential features such as assert functions and utilities for test doubles like mocking and spying. The provided basic test involves manual instantiation of these classes to ensure that both the controller and service adhere to their specified API contracts.

```typescript

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(() => {
    catsService = new CatsService();
    catsController = new CatsController(catsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
```

**HINT**

Keep your test files located near the classes they test. Testing files should have a `.spec` or `.test` suffix.
The unit test should also be isolated - meaning the test doesn't rely on other dependencies to work.
##### Testing utilities
The `@nestjs/testing` package provides a set of utilities that enable a more robust testing process. Let's rewrite the previous example using the built-in `Test` class:
```typescript
import {Test} from '@nestjs/testing'
import {CatsController} from './cats.controller'
import {catsService } from './cats.service'

describe('CatsController', ()=> {
	let catsController: CatsController;
	let catsService: CatsService;

	beforeEach(async ()=>{
		const moduleRef = await Test.createTestingModule({
			controllers: [CatsController],
			providers: [CatsService],
		}).compile()
	catsService = moduleRef.get<CatsService>(CatsService);
	catsController = moduleRef.get<CatsController>(CatsController)
	})

	describe('findAll', ()=> {
		it('should return an array of cats', async() => {
		const result = ['test'];
		jest.spyOn(catsService, 'findAll').mockImplemtation(()=> result);
		expect(await catsController.findAll()).toBe(result)
		})
	})

})
```

  
The Test class in Nest.js is valuable for creating an application execution context that effectively simulates the entire Nest runtime. It offers convenient hooks for managing class instances, including capabilities for mocking and overriding. The Test class features a `createTestingModule()` method, accepting a module metadata object as its argument, mirroring the object used with the `@Module()` decorator. This method returns a TestingModule instance, which, in turn, provides several methods. For unit tests, a crucial method is `compile()`, which bootstraps a module along with its dependencies, akin to the conventional bootstrapping of an application in the main.ts file using `NestFactory.create()`. The result is a module that is prepared for testing.

### Unit testing rules:
1. keep each test small, following the Arrange-Act-Assert paradigm
2. focus on the end result/behavior
3. avoid brittleness by not testing implementation details

A `beforeEach` hook handles any setup that needs to happen before running each test. in this case the hook is using the built in class `Test` to create an isolate NestJS runtime so you get all nestjs behavior like dependency injection.

### Mocking with test doubles in Nestjs

