
Solid is all about small composable pieces that serve as building blocks for application. is a declarative JavaScript library for building user interfaces, and it is often categorized as a reactive UI library.  It is designed to be efficient, small in size, and aims to provide a highly reactive and reactive programming paradigm for building web applications.

## Key features:
1. **Reactivity System:** SolidJS leverages a fine-grained reactivity system, which means that it can efficiently update only the components that are affected by state changes, leading to improved performance.
2. **Compiler Optimization:** SolidJS uses a compiler to optimize the code during the build process. This helps in reducing the size of the final bundle and improving the overall performance of the application.
3. **No Virtual DOM:** Unlike some other popular JavaScript libraries/frameworks like React, SolidJS does not use a virtual DOM. Instead, it directly manipulates the real DOM, which can result in faster updates and reduced memory overhead
4. **Component-based Architecture:** SolidJS follows a component-based architecture, allowing developers to build modular and reusable UI components. Components can be composed together to create complex user interfaces.
5. **TypeScript Support:** SolidJS has built-in support for TypeScript, which provides static typing and enhances the developer experience by catching potential errors during development.
6. **Small Bundle Size:** SolidJS aims to keep the bundle size minimal, making it suitable for projects where optimizing for performance and reducing load times is crucial.

## Installation 

```bash
> npm create vite@latest my-app -- --template solid-ts 
> cd my-app 
> npm i # or yarn or pnpm 
> npm run dev # or yarn or pnpm
```

### Setup Tailwindcss

1.  Installations
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
> Install `tailwindcss` and its peer dependencies via npm, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js`.

2. Configuration
```js
content: [ "./src/**/*.{js,jsx,ts,tsx}", ],
```
>Add the paths to all of your template files in your `tailwind.config.js` file.

3. Add Tailwindcss directives to css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
> Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.

4. Using tailwindcss to your Project

```jsx
export default function App() { 
	return ( 
		<h1 class="text-3xl font-bold underline"> 
			Hello world! 
		</h1> 
	) 
}
```
> Start using Tailwind’s utility classes to style your content.

## Components

 are functions that accept a props object and return JSX elements including native DOM elements and other components. They can be expressed as JSX Elements in PascalCase
```jsx
function MyComponent(props) { 
	return <div>Hello {props.name}</div>; 
} 

<MyComponent name="Solid" />;
```

Components are lightweight in that they are not stateful themselves and have no instances. instead, they serve as factory functions for DOM elements and reactive primitives.


### Three core primitives of solid' js

In SolidJS, the fine-grained reactivity system is built on three core primitives:

#### 1. Signals:

- **Purpose:** Signals are at the heart of SolidJS's reactivity system. They represent reactive values that can be observed for changes.
- **How They Work:** When a signal is created, it holds a value. Components that depend on the signal will automatically re-render when the signal's value changes.
 **Example:**
 ```js
 import { createSignal } from 'solid-js';

const [count, setCount] = createSignal(0);

// In a SolidJS component, count is a signal
// The component will re-render whenever count changes

```

#### 2. Memos:

- **Purpose:** Memos are used to memoize the result of a computation based on one or more signals. They help prevent unnecessary recalculations.
- **How They Work:** Memos take a function and the signals it depends on. The function is only re-invoked if one of the signals changes.
 **Example:**
 ```jsx
import { createMemo, createSignal } from 'solid-js';

const [firstName, setFirstName] = createSignal('John');
const [lastName, setLastName] = createSignal('Doe');

const fullName = createMemo(() => `${firstName()} ${lastName()}`);
// fullName is a memo that recalculates only if firstName or lastName changes

```

#### 3. Effects:

- **Purpose:** Effects are used to perform side effects, such as subscribing to external data sources, setting up event listeners, or cleaning up resources.
- **How They Work:** Effects are executed after the initial render and then re-executed whenever their dependencies (signals or memos) change.
**Example:**
```js
import { createEffect, createSignal } from 'solid-js';

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log(`Count changed: ${count()}`);
  // This effect will run whenever count changes
});

```

> These three core primitives work together to create a reactive system in SolidJS. Signals trigger reactivity when their values change, Memos optimize computations based on signals, and Effects allow for performing side effects in a reactive context.

###### ! Hint

> Effects that developers create with `createEffect` run after rendering has completed and are mostly used for scheduling updates that interact with the DOM. If you want to modify the DOM earlier, use [`createRenderEffect`](https://www.solidjs.com/docs/latest/api#createrendereffect).

## Control Flow

In SolidJS, JSX allows developers to utilize JavaScript for controlling logic flow within templates. However, in the absence of a Virtual DOM, conventional approaches like `Array.prototype.map` could lead to inefficient recreation of all DOM nodes upon each update. To address this, SolidJS employs template helpers encapsulated within components.

#### Show

One fundamental aspect of control flow is conditional rendering. SolidJS's compiler optimally handles ternaries (`a ? b : c`) and boolean expressions (`a && b`). Nevertheless, for improved readability, Solid introduces the `<Show>` component.

For instance, consider a scenario where we want to display only the relevant button based on the current user's login state. SolidJS simplifies this logic using the `<Show>` component.

The example illustrates the usage of the `<Show>` component to conditionally render buttons depending on the user's login status:
**Syntax**
```jsx
<Show 
	when={loggedIn()} 
	fallback={<button onClick={toggle}>Log in</button>} 
> 
	<button onClick={toggle}>Log out</button>
</Show>

```
> The `fallback` prop acts as the `else` and will show when the condition passed to `when` is not truthy

**Example**
```js
import { render } from 'solid-js/web';

import { createSignal, Show } from 'solid-js';

  

function App() {

  const [loggedIn, setLoggedIn] = createSignal(false);

  const toggle = () => setLoggedIn(!loggedIn())

  return (

    <>

      <Show when={loggedIn()} fallback={<button onClick={toggle}>Log in</button>}>

        <button onClick={toggle}>Log out</button>

      </Show>

    </>

  );

}

  

render(() => <App />, document.getElementById('app'))
```

#### For
The `<For>` component is the best way to loop over an array of objects. As the array changes, `<For>` updates or moves items in the DOM rather than recreating them

**Syntax**

```jsx
<For each={cats()}>
	{(cat, i) => 
		<li> 
			<a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`}> 
				{i() + 1}: {cat.name} 
			</a> 
		</li> 
	}
</For>
```
> There is one prop on the `<For>` component: `each`, where you pass the array to loop over

Then, instead of writing nodes directly between `<For>` and `</For>`, you pass a _callback_. This is a function similar to JavaScript's [`map` callback](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#parameters). For each element in the array, the callback is called with the element as the first argument and the index as the second. (`cat` and `i` in this example.) You can then make use of those in the callback, which should return a node to be rendered.

#### Index

`<Index>` component,  will cause less rerenders in certain situations.

When the array updates, the `<For>` component uses referential equality to compare elements to the last state of the array. But this isn't always desired.

In JavaScript, primitives (like strings and numbers) are always compared by value. When using `<For>` with primitive values or arrays of arrays, we could cause a lot of unnecessary rendering. If we used `<For>` to map a list of strings to `<input>` fields that could edit each, every change to that value would cause the `<input>` to be recreated.

> The `<Index>` component is provided for these cases. As a rule of thumb, when working with primitives use `<Index>`.
```jsx
<Index each={cats()}>
	{(cat, i) => 
		<li> 
			<a target="_blank" href={`https://www.youtube.com/watch?v=${cat().id}`}> 
				{i + 1}: {cat().name} 
			</a> 
		</li> 
	}
</Index>
```
> It has a similar signature to `<For>`, except this time the item is the signal and the index is fixed. Each rendered node corresponds to a spot in the array. Whenever the data in that spot changes, the signal will update.

##### `For` vs `Index`

`<For>` cares about each piece of data in your array, and the position of that data can change; `<Index>` cares about each index in your array, and the content at each index can change.

#### Switch

Sometimes you need to deal with conditionals with more than 2 mutual exclusive outcomes. For this case, we have the `<Switch>` and `<Match>` components modeled roughly after JavaScript's `switch`/`case`.

It will try in order to match each condition, stopping to render the first that evaluates to true. Failing all of them, it will render the fallback.

```js
<Switch fallback={<p>{x()} is between 5 and 10</p>}>
	<Match when={x() > 10}>
		<p> {x()} is greater than 10</p>
	</Match>
	<Match when={x() < 5}>
		<p> {x()} is less than 5</p>
	</Match>
</Switch>
```
> In the example, we can replace our nested `<Show>` components with this:

#### Dynamic

The `<Dynamic>` tag is useful when you render from data. It lets you pass either a string for a native element or a component function and it will render that with the rest of the provided props.

This is often more compact than writing a number of `<Show>` or `<Switch>` components.

>> replace the `<Switch>` statement:
```jsx
<Switch fallback={<BlueThing />}> 
	<Match when={selected() === 'red'}><RedThing /></Match> 
	<Match when={selected() === 'green'}><GreenThing /></Match> 
</Switch>
```
With
```jsx
<Dynamic component={options[selected()]} />
```
**Example**

```js

import { render, Dynamic } from "solid-js/web";

import { createSignal, Switch, Match, For } from "solid-js";

  

const RedThing = () => <strong style={{ "color": "red" }}>Red Thing</strong>;

const GreenThing = () => <strong style={{ "color": "green" }}>Green Thing</strong>;

const BlueThing = () => <strong style={{ "color": "blue" }}>Blue Thing</strong>;

  

const options = {

  red: RedThing,

  green: GreenThing,

  blue: BlueThing

}

  

function App() {

  const [selected, setSelected] = createSignal("red");

  

  return (

    <>

      <select value={selected()} onInput={e => setSelected(e.currentTarget.value)}>

        <For each={Object.keys(options)}>{

          color => <option value={color}>{color}</option>

        }</For>

      </select>

      <Dynamic component={options[selected()]} />

    </>

  );

}

  

render(() => <App />, document.getElementById("app"));
```

#### Portal

Sometimes it's beneficial to insert elements outside the normal flow of the app. Z-indexes are sometimes insufficient to deal with render contexts for floating elements like Modals.

Solid has a `<Portal>` component whose child content will be inserted at the location of your choosing. By default, its elements will be rendered in a `<div>` in the `document.body`.
** Syntax**
```jsx
<Portal> <div class="popup"> <h1>Popup</h1> <p>Some text you might need for something or other.</p> </div> </Portal>
```

#### Error Boundary
A JavaScript error originating in the UI shouldn’t break the whole app. Error boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

```jsx
<ErrorBoundary fallback={err => err}> 
	<Broken /> 
</ErrorBoundary>
```