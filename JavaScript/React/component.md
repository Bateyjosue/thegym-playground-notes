Quiz!
## 1. What is a React component?
A React component is a reusable piece of code that controls a part of the user interface (UI) in a React application. Components are the building blocks of React applications, allowing developers to create complex UIs from small, isolated, and reusable pieces. Each component in React has a specific role and can be thought of as a custom, reusable HTML element.

React components can be classified into two main types:

1. **Functional Components**: These are simple JavaScript functions that accept props (short for properties) as an argument and return a React element. Functional components are the simplest way to write components and are often used for components that don't need to manage their own state.

   Example of a functional component:
   ```javascript
   function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
   }
   ```

2. **Class Components**: These are more complex and are defined as JavaScript classes that extend `React.Component`. Class components can have their own state and lifecycle methods, which makes them more powerful and suitable for components that need to manage their own data or lifecycle events.

   Example of a class component:
   ```javascript
   class Welcome extends React.Component {
     render() {
       return <h1>Hello, {this.props.name}</h1>;
     }
   }
   ```

React components can be composed together to build complex UIs. A parent component can use other components in its render method, allowing for a hierarchical structure of components. This composition makes it easier to build and maintain large applications.

React also supports higher-order components (HOCs), which are functions that take a component and return a new component with additional props or behavior. HOCs are a way to reuse component logic.

React components can be either controlled or uncontrolled, depending on whether they manage their own state or rely on external state management. Controlled components have their state managed by React, typically through the use of state and props, while uncontrolled components manage their own state internally.

In summary, React components are the fundamental building blocks of React applications, allowing developers to create reusable, modular, and maintainable UIs.

1. What's wrong with this code?

```

function myComponent() {

return (

<small>I'm tiny text!</small>

)

}

```
3. What's wrong with this code?

```

function Header() {

return (

<header>

<nav>

<img src="./react-logo.png" width="40px" />

</nav>

</header>

)

}


ReactDOM.render(Header(), document.getElementById("root"))

```