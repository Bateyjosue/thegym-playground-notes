---
tags:
  - redux
  - redux/tookit
  - state-management
  - javascript
Articles: 
Repo: 
Link: https://youtu.be/k68j9xlbHHk
---
___

redux allows us to create `store` with have the information of all our state whereby the components can access it. 

## Steps to implement redux 

1. create react application
2. install dependencies
	 - redux
	 -  react-redux
	 - @reduxjs/toolkit
3. create store in the highest level of our application
```js
import {configureStore} from '@reduxjs/tookit'
import {Provider} from "react-redux"
import userReducer from '.features/user'

// our store should have the list of reducers in an object
const store = configureStore({
	reducer: {
		user: userReducer
	}	
})

	<Provider store={store}>
		<App />
	</Provider>
```
4. create a **[reducer]**, is a function that take a current state and actions to be perform and then return the updated state

		features/userjs

```js
import {createSlice} from "@reduxjs/tookit"

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		value: { name: "", age: 0, email: ""}
	},
	reducers: {
		login: (state, action) => {
			state.value = action.payload
		} 
	}
})

export const {login} = userSlice.actions;

export default userSlice.reducers

```

5. Access the store in different component, `UseSector`


```js
import {useSelector} form 'react-redux'

function Profile(){
	const user = useSelector((state) => state.user.value)
	return (
		<div>
			{user.name}
		</div>
	)
}

```

6. Dispatch store, `useDispatch`
 
```js
import {useDispatch} form "react-redux"
import {login} form '../features/user'

function Login() {
	const dispatch = useDispatch()
return (
	<div>
		<button onClick={
		()=> {
			dispatch(login({
				name: "Josh",
				age: 24,
				email: "joshBatey@gmail.com "
			}))
		}
		}> Login</button>
	</div>
)

}


```