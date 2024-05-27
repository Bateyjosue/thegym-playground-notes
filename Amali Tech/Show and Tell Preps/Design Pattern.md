Topic:  Design Patterns Series - Behavioral Patterns.(Observer, Strategy , Command)

>  Behavioral design patterns are concerned with how our objects interact with each other, or how we interact with them
>  concerned with communication between objects, defining how they interact and distribute responsibilities. 
>  These patterns help you design systems where objects collaborate in a more flexible and efficient manner.

1. **Observer Pattern:** Defines a one-to-many dependency between objects, so when one object changes state, all its dependents are notified and updated automatically.
2. **Strategy Pattern:** Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
3. **Command Pattern:** Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations.
## Observer Pattern
> is a pattern that establishes a one-to-many dependency between objects. It allows the object called `observable` to notify multiple observers called `listeners` about the changes in its data. 
> Commonly used for implementing distributed event handling systems where one object's state changes trigger actions in other dependent objects.


> The Observer Pattern is a behavioral design pattern that allows an object, known as the subject, to maintain a list of its dependents, called observers, and automatically notify them of any state changes, usually by calling one of their methods. 
> It is particularly useful for creating a publish-subscribe model where changes in the subject can be broadcasted to observers who have chosen to subscribe to the subject.

> In the Observer Pattern, the subject maintains a list of observers and provides methods for adding or removing observers from this list. Whenever an important event happens to the subject, it iterates through its list of observers and calls a specific method on each observer to notify them of the event.

> This pattern is widely used in designing and implementing distributed event handling systems, where it is important to ensure that when one object changes state, an alert or notification is sent to all its dependent objects automatically.

```ts
// Observer interface declares the update method, used by subjects.
interface Observer {
    update(subject: Subject): void;
}

// Subject interface declares a set of methods for managing observers.
interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

// NewsAgency represents the Subject.
class NewsAgency implements Subject {
    private observers: Observer[] = [];
    private news: string = '';

    // Attaches an observer to the subject.
    attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Observer has already been attached.');
        }

        this.observers.push(observer);
    }

    // Detaches an observer from the subject.
    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
    }

    // Notify all observers about an event.
    notify(): void {
        console.log('Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    // Business logic that triggers a notification.
    public breakNews(news: string) {
        this.news = news;
        console.log(`NewsAgency: New news update: ${news}`);
        this.notify();
    }

    // An additional method to get the update data.
    public getNewsUpdate(): string {
        return this.news;
    }
}

// Concrete Observers
class NewsChannel implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    update(subject: Subject): void {
        if (subject instanceof NewsAgency) {
            console.log(`${this.name} reporting: ${subject.getNewsUpdate()}`);
        }
    }
}

// Demo
const newsAgency = new NewsAgency();
const channel1 = new NewsChannel('Channel 1');
const channel2 = new NewsChannel('Channel 2');

newsAgency.attach(channel1);
newsAgency.attach(channel2);

newsAgency.breakNews('TypeScript Observer pattern example');

// Detaching an observer
newsAgency.detach(channel1);

// Breaking another news
newsAgency.breakNews('Another news update');

```
> In this TypeScript example, `NewsAgency` acts as the subject, and `NewsChannel` represents concrete observers. The `NewsAgency` class maintains a list of observers that subscribe to news updates, and whenever it receives new news (`breakNews` method), it notifies all subscribed observers by calling their `update` method. `NewsChannel` implements the `Observer` interface, allowing instances of this class to be notified by the `NewsAgency`.

> This pattern allows for a flexible observers management system where observers can subscribe or unsubscribe from receiving updates dynamically, and the `NewsAgency` can update them without knowing the specific details of what each observer does with the data.

```ts
interface Observer {
  update(subject: WeatherStation): void;
}

class WeatherStation {
  private observers: Observer[] = [];
  private weatherData: string;

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }

  setWeatherData(weatherData: string): void {
    this.weatherData = weatherData;
    this.notifyObservers();
  }

  getWeatherData(): string {
    return this.weatherData;
  }
}

class WeatherDisplay implements Observer {
  update(weatherStation: WeatherStation): void {
    console.log(`Current weather: ${weatherStation.getWeatherData()}`);
  }
}

// Usage
const weatherStation = new WeatherStation();
const display1 = new WeatherDisplay();
const display2 = new WeatherDisplay();

weatherStation.addObserver(display1);
weatherStation.addObserver(display2);

weatherStation.setWeatherData('Sunny'); // Both displays update with the new weather data

```
> Key differences and enhancements include:
	- An `Observer` interface is defined with the `update` method, enforcing that all observers implement this method.
	- `WeatherStation` now explicitly defines that its `observers` array can only contain objects that implement the `Observer` interface.
	- The `weatherData` property in the `WeatherStation` class is given a type annotation (`string`), indicating that it should store weather data as a string.
	- A getter method `getWeatherData` is added to the `WeatherStation` class to safely access the weather data.
	- The `WeatherDisplay` class is explicitly declared to implement the `Observer` interface, ensuring it has the `update` method as defined by the interface.
> This implementation enhances the type safety and clarity of the original program, leveraging TypeScript's static typing features.

### Real-World Use Cases
**User Interfaces:** Implementing event handling in graphical user interfaces (GUIs) where UI components react to user actions.

**Publish-Subscribe Systems:** Building publish-subscribe systems for distributing messages or events to multiple subscribers.

**Model-View-Controller (MVC):** Separating the model (data) from the view (UI) and notifying views about changes in the model.

**Custom Event Handling:** Creating custom event-driven systems for managing state changes and interactions.
> The Observer pattern is widely used in various real-world applications, offering a robust solution for scenarios where objects need to be notified of changes happening in other objects. This pattern fosters a loose coupling between the subject (notifier) and observers (subscribers), allowing for efficient communication and updates. Here are several real-world use cases illustrating the Observer pattern's versatility and utility:

	### 1. User Interface (UI) Updates
	In web and mobile development, the UI often needs to update in response to data changes. For instance, when a model state changes (subject), all associated views (observers) are automatically updated to reflect the new data without requiring a page refresh.
	
	### 2. Event Management Systems
	Event handling systems in GUI toolkits or game engines rely on the Observer pattern to dispatch and handle events. For example, a button click can be an event where the button is the subject, and the event handlers are the observers. When the button is clicked (subject changes state), all registered event handlers (observers) are notified and executed.
	
	### 3. Financial Market Data Feeds
	In trading platforms, financial data such as stock prices are constantly being updated. The Observer pattern allows trading systems to subscribe to specific stock symbol updates (subjects) and notify all attached traders' interfaces (observers) in real-time to reflect the latest market data.
	
	### 4. Newsletter Subscriptions
	Email marketing systems use the Observer pattern where subscribers can sign up to receive newsletters on various topics (subjects). Whenever there's new content published, all subscribers of the topic (observers) receive an email notification about the update.
	
	### 5. Social Media Notifications
	Social media platforms implement the Observer pattern to notify users about events of interest, such as new posts by a followed account, comments on their posts, or direct messages. The system (subject) keeps track of these events and notifies registered users (observers) accordingly.
	
	### 6. Sensor Data Monitoring
	In IoT (Internet of Things) applications, sensor data monitoring uses the Observer pattern extensively. Sensors (subjects) generate data which observers (data processing units or interfaces) subscribe to. Observers are notified of sensor data changes, enabling real-time monitoring and response systems.
	
	### 7. Model-View-Controller (MVC) Architecture
	The Observer pattern is a key component of the MVC architecture, where the model is the subject, and the views are the observers. Whenever the model changes (e.g., due to user input or backend data updates), the views automatically update to reflect the changes, keeping the UI in sync with the underlying data model.
	
	### 8. Job Queues and Worker Threads
	In systems with job queues, the queue acts as a subject, with worker threads serving as observers. When new tasks are added to the queue, worker threads are notified to process them, allowing for efficient task distribution and processing in multi-threaded applications.
	
	### Conclusion
	The Observer pattern's real-world applications span across software engineering fields, making it a fundamental design pattern for implementing publish-subscribe communication models. Its ability to decouple subjects and observers fosters scalable, maintainable, and flexible software architectures.

### Things to consider when using Observer Pattern
**Memory Management:** Be cautious about memory leaks when observers hold references to subjects. Ensure proper removal of observers when they are no longer needed.

**Order of Notification:** The order in which observers are notified can be important in some scenarios. Ensure that the order meets your application's requirements.

**Event Handling:** When using built-in event handling mechanisms, be aware of event propagation and bubbling in the DOM if applicable.

> When using the Observer pattern, there are multiple considerations to keep in mind to ensure your implementation is efficient, maintainable, and suitable for your application's needs. Here are some key points to consider:

	### 1. Memory Leaks
	One common issue in the Observer pattern, especially in languages without automatic garbage collection, is the potential for memory leaks. This can occur if observers are not properly unregistered from the subject when they are no longer needed or when the observer has a shorter lifecycle than the subject. Ensuring that observers deregister themselves can help mitigate this risk.
	
	### 2. Performance Impact
	Notifying observers can be resource-intensive, especially when there are many observers or when the notifications are frequent. It can lead to performance bottlenecks. Consider the frequency of updates and the complexity of the observer’s update method to mitigate potential performance issues.
	
	### 3. Notification Order
	The order in which observers are notified is not guaranteed unless explicitly managed. In certain scenarios, the order of notification might be important. If so, you'll need to implement additional logic to control the sequence of notifications.
	
	### 4. Loosely Coupled but Interdependent
	While one of the benefits of the Observer pattern is loose coupling between subjects and observers, this can also lead to challenges in understanding the flow of the program or debugging, as the dependencies are not as explicit. Proper documentation and architectural overview diagrams can help mitigate these issues.
	
	### 5. Synchronization and Concurrency
	In a multithreaded environment, consider the thread-safety of your subject and observers. You may need to synchronize the methods responsible for registering, deregistering, and notifying observers to avoid concurrent modification exceptions or other threading issues.
	
	### 6. Unnecessary Updates
	Observers might receive notifications that do not result in any state change or meaningful action, especially in cases where observers are interested in only a subset of the updates from the subject. This can waste computational resources. Consider implementing more granular notification mechanisms or allowing observers to specify their interests.
	
	### 7. Testing and Debugging
	The Observer pattern can make testing and debugging more challenging due to the dynamic and decoupled nature of the observer-subject relationships. Unit testing specific observer or subject interactions may require mocking or other testing strategies to isolate behavior.
	
	### 8. Scalability
	As the number of observers increases, the time and resources required to notify all observers also increase. Consider the scalability of your implementation and explore optimization strategies such as batching notifications or asynchronously notifying observers if scalability becomes an issue.
	
	### 9. Use of Modern Frameworks and Libraries
	Many modern development frameworks and libraries provide built-in support for observing changes and notifying observers (e.g., event listeners in UI frameworks, reactive programming libraries). Leveraging these can often be more efficient and reliable than implementing the Observer pattern from scratch.
	
	### Conclusion
	The Observer pattern is a powerful tool for creating flexible and decoupled designs. However, its successful implementation requires careful consideration of the above factors to ensure that the system remains efficient, understandable, and easy to maintain.

## Strategy Pattern
> pattern that allows you to select an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use. This pattern is useful when you have several ways to perform a task and you want to choose among them dynamically.

```ts
// Define the Payment Strategy Interface
interface PaymentStrategy {
  processPayment(amount: number): void;
}

// Implement Concrete Strategies

class PayPalStrategy implements PaymentStrategy {
  processPayment(amount: number): void {
    console.log(`Paid ${amount} using PayPal.`);
  }
}

class CreditCardStrategy implements PaymentStrategy {
  processPayment(amount: number): void {
    console.log(`Paid ${amount} using Credit Card.`);
  }
}

class BitcoinStrategy implements PaymentStrategy {
  processPayment(amount: number): void {
    console.log(`Paid ${amount} using Bitcoin.`);
  }
}

// Context Class
class OnlineStore {
  private paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  checkout(amount: number): void {
    this.paymentStrategy.processPayment(amount);
  }
}

// ### Usage
const paypal = new PayPalStrategy();
const storeWithPayPal = new OnlineStore(paypal);
storeWithPayPal.checkout(100); // Outputs: "Paid 100 using PayPal."

const creditCard = new CreditCardStrategy();
const storeWithCreditCard = new OnlineStore(creditCard);
storeWithCreditCard.checkout(200); // Outputs: "Paid 200 using Credit Card."

const bitcoin = new BitcoinStrategy();
const storeWithBitcoin = new OnlineStore(bitcoin);
storeWithBitcoin.checkout(300); // Outputs: "Paid 300 using Bitcoin."

```
> This example shows how the Strategy Pattern allows the `OnlineStore` to switch between different payment strategies without changing its internal structure. Each payment method is encapsulated in its own class, adhering to the `PaymentStrategy` interface. This approach enhances flexibility and maintainability by allowing new payment methods to be added without modifying existing code.

### Real-World Use Cases
The Strategy Pattern is a powerful tool in software development that allows for the dynamic selection of algorithms or behaviors at runtime. Here are simplified explanations of its real-world use cases:

- **Algorithm Selection**: Imagine you're building a game that can play different levels. Each level requires a different algorithm to determine the winner. With the Strategy Pattern, you can switch between these algorithms easily without changing the game's core mechanics.

- **Configuration and Settings**: Think of an app that can adjust its performance based on the device it's running on. You might have different algorithms for optimizing battery life, screen resolution, or network usage. The Strategy Pattern lets you pick the right optimization strategy based on the current conditions.

- **Customizable Behavior**: Consider a social media platform where users can customize their experience. They might choose different notification strategies (e.g., email, push notifications, SMS). The Strategy Pattern makes it easy to add new customization options without rewriting the entire system.

- **Testing and Mocking**: During development, you often need to test how your code interacts with external services. The Strategy Pattern allows you to replace these services with mock versions during testing, ensuring your tests are fast and reliable.

### Things to consider when using strategy pattern
When applying the Strategy Pattern, it's crucial to keep a few considerations in mind to ensure your implementation is effective and maintainable:

- **Clear Separation**: Maintain a clear distinction between the context (the part of your program that uses the strategies) and the strategies themselves. This separation ensures that your code remains organized and easy to understand. It also facilitates future modifications, as changes to one aspect won't necessarily affect the other.

- **Dynamic Switching**: One of the main benefits of the Strategy Pattern is the ability to switch between different strategies at runtime. Your design should support this flexibility, allowing the context to easily swap out strategies as needed without significant restructuring.

- **Strategy Initialization**: How you initialize and pass strategies to the context is important. You need to ensure that the correct strategy is being used at any given time. This might involve setting up a mechanism for selecting the appropriate strategy based on certain conditions or configurations.

## Command Pattern
