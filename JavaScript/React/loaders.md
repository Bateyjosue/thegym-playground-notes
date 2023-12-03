1. Export a `loader` functions from the page that fetches the data that page will need

```js
export function loader() {
	return "The data is here"
}
```

2. Pass a `loader` prop to the route that renders that page and pass in the loader function

```jsx
	import HomePage, { loader as homePageLoader } from "./Home"

const router = createBrowserRouter(createRoutesFromElements(

<Route path="/" element={<HomePage />} loader={homePageLoader} />

))

```

3. Use the `useLoaderData` hook in the component to get the data

```jsx
import React from "react"
import { useLoaderData } from "react-router-dom"\

export function loader() {
	return "The data is here"

}
export default function HomePage() {
	const data = useLoaderData()
	console.log(data)
	return (
		<main>
		<h1>Home page</h1>
		</main>
	);
}
```


The browser will the rendering of the component until the loader is ready

## Quid?
1. When does the code in a loader function run?
		Before the route change happens and the component for that route loads
2. What are some benefits of using a data loader function
		instead of fetching our data in a `useEffect` in a component?
	* Don't need to worry about handling loading state in the component
	* Don't need to have lengthy/confusing `useEffect` code in our component
	* Don't need to handle error state in the component
3. What change do we need to make to our BrowserRouter before we can use loaders (or any of the new data-layer API features) in our app?
	- Get rid of the BrowserRouter component and use
	- createBrowserRouter() instead. Can use
	- createRoutesFromElements() to make the transition a bit easier
4. What are the steps we need to take in order to use a loader on any given route?
	1. Define and export a loader function
	2. Import the loader and pass it to the route we're wanting to fetch data for
	3. Use the useLoaderData() hook to get the data from the loader function.


### Error handling

Error.jsx
```jsx
import React from "react"

import { useRouteError } from "react-router-dom"
export default function Error() {

const error = useRouteError()
return (
	<h1>{error.message}</h1>
)
}
```

in the index.js
```jsx

<Route
	path="vans"
	element={<Vans />}
	errorElement={<Error />}
	loader={vansLoader}
/>

```