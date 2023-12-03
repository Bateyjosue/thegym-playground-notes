is a library use to enable client-side routing

## Main jobs of React Router

1. Subscribing and manipulating the [history stack](https://reactrouter.com/en/main/start/concepts#history-stack)
2. Matching the [URL](https://reactrouter.com/en/main/start/concepts#url) to your [routes](https://reactrouter.com/en/main/start/concepts#route-config)
3. Rendering a nested UI from the [route matches](https://reactrouter.com/en/main/start/concepts#matches)

### Multi-page Apps (MPAs)
 ![[Screenshot 2023-10-02 124140.png]]
 MPA means the browser is load multiple html page
### Single Page Application (SPAs)

here the browser loads only one web document on time and you can make incremental update to that existing document![[SPAs.png]]![[SPA1.png]]

when data changes it will load a new page rather a now json data and update the page to the existing view which is react App.

## Layout Router

We call it layout route because it doesn't participate in the matching at all but its children do. it only exists to make wrapping multiple child routes in the same layout simpler.

> Don't forget to add an `<Outlet>` to your layout where you would like child route elements to be rendered. Using `{children}` will not work as expected.

![[loaders]]