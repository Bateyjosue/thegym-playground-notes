### What is an API

API stands for Application Programming Interface. It is a set of rules that allows ones software application to interact with another. APIs define the methods and data formats that applications can use to request and exchange information. they are used to enable the integration of different software systems.

### Key Terms:

1. **Endpoint**: An endpoint is a specific [[URI]](Uniform Resource Identifier) where an API can be accessed
2. **Request**: A request is what you send to the API. It contains information about what you want to do
3. **Response**: A response is what the API sends back to you. It contains the data you requested or an indication of the success/failure of your request.

#### Example

1. Install necessary dependencies:

`npm install @nestjs/common @nestjs/core axios`

2. Create a simple weather service in `src/weather/weather.service.ts`:

```js
import { Injectable } from '@nestjs/common'; 
import axios from 'axios';  
@Injectable() 
export class WeatherService {   
	private readonly apiKey: string = process.env.WEATHER_API_KEY; // Set your API key in the environment variable    
	async getWeather(city: string): Promise<any> {     
		const endpoint = 'https://api.weather.com/current';     const params = { city };      
		try {       
			const response = await axios.get(endpoint, { params, headers: { apikey: this.apiKey } });        
			if (response.status === 200) {         
				return response.data;       
			} else {         
				throw new Error(`Error: ${response.status}`);       
			}     
		} 
		catch (error) {       
			throw new Error(`Error: ${error.message}`);     
		}   
	} 
}
```

Create a simple weather controller in `src/weather/weather.controller.ts`:

```ts
import { Controller, Get, Param } from '@nestjs/common'; 
import { WeatherService } from './weather.service'; 

	@Controller('weather') 
	export class WeatherController { 
		constructor(private readonly weatherService: WeatherService) {}
		 @Get(':city') async getWeather(@Param('city') city: string): Promise<any> { 
		 try { 
			 const weatherData = await this.weatherService.getWeather(city);
			  return { 
				  message: `Current temperature in ${city}: ${weatherData.temperature}` 
			  };
		} catch (error) { 
				  return { 
					  error: error.message 
				  };
		} 
	} 
}
```

4. Set up environment variables. Create a `.env` file in the root of your project:

```makefile
	WEATHER_API_KEY=your_api_key
```
5. Register the controller and service in the `app.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class AppModule {}

```

Now, you can run your NestJS application:

```bash
npm run start
```

And make requests to `http://localhost:3000/weather/NewYork` in your browser or using tools like Postman or cURL.

Remember to replace `'your_api_key'` with your actual weather API key, and always be mindful of securing your API keys, especially in production environments.
![[api.png]]

### How do APIs work?

- A client sends a request to the API server, usually over the internet or a local network. the request is made using a specific protocol (such a HTTP) and includes information about the operation the client wants to perform, e.g: retrieving data or updating resource
- The API server receives the request and processes it. It may validate the request, authenticate the client, authorize the request, or perform other necessary operations.
- The API server sends response back to the client, which may include data, an error message, or a status code indicating the result of the operation.
- The client receives the response and processes it.

### What is an API call?

An API call is a request made to an API to access data or functionality. A client makes an API call and sends a request to the API server, and the server sends back a response. The request and response use a specific format and structure, and are transmitted using a specific protocol (such as HTTP)

### What is an API Key?

an API Key is a unique identifier used to authenticate API requests. API keys will typically track and control how you can use an API. They can also provide access to an API's data and functionality

### How are APIs different from webhooks?

How are APIs different from webhooks? Webhooks are a way for a server to send data to a client in real-time, without the client needing to make a request. When a specified event occurs on the server, the server can send a message to a specified URL.  The message is usually in the form of an HTTP POST request. The client can then process the message and act based on the data received. Webhooks are often used to enable real-time communication and event-driven architectures, and can be used to build more efficient and responsive systems.

### Types of APIs

1. Open APIs: provide access to a specific product or service, and are available to anyone who agrees to the terms of use
2. Internal APIs: These are used within an organization to share resources and functionality between different teams or systems
3. Partner APIs: These APIs are available to a specific group of developers who have a business relationship with the organization that created the API.
4. Composite APIs: These are APIs that combine multiple underlying APIs into a single interface. They provide a simplified way for developers to access multiple resources or functionality in a single call

### Types of API architectures

refers to the overall design and structure of an API, including the way it's organized, the types of requests it supports, the data formats and protocols it uses and any security or authentication mechanisms it employs. A well-designed API architecture should be flexible, scalable and easy to use with clear documentation and robust support system for developers. 

1. Representational State Transfer (REST) APIs: are a type of web API that uses HTTP requests to manipulate data
2. Simple Object Access Protocol (SOAP) APIs: are a type of web API that uses XML (Extensible Markup Language) to encode messages
3. Remote Procedure Call (RPC) APIs: are a type of API designed to make it easy to invoke methods on remote objects, which is useful for building distributed systems.
4. GraphQL APIs: creates a representation of your data that is designed to feel familiar and natural, like a visual graph.  The key concept is that the data structure is non-linear, meaning that one object can be connected to more than one other object, and relationships can also be circular.
	$$GraphQL -- Benifits$$

GraphQL, clients can request only the data they need rather than receiving a fixed set of data from a server