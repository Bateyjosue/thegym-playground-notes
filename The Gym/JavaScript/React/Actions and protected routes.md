
## =>Protected Routes

### **Purpose**: 
Stop data fetching of sensitive information. Only allow logged-in users to access their data.
### Preventing renders

**Approach:** If user isn't logged in, stop data fetching by blocking component from rendering and send to login page. Since fetching is happening inside the components, it those components never render, the fetching never happens.

## =>Loader `redirect()`

### Approach:

If user isn't logged in, redirect to Login page when protected route loaders run, before any route rendering happens.

### Current downside:

needs to happen in every protected route's loader

---
# Quid?
---
1. How did we change our route definitions in order to "protect" certain routes from an un-logged-in user?
		Wrapped the routes we wanted to protect in a Layout route that contains logic to redirect someone if they're not logged in

2. What component can we use to automatically send someone to a different route in our app?
```jsx
 <Navigate to="/login" />
```
3. What component can we render if the user IS logged in?
