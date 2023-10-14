1. Explain the following terms in react 
	- Virtual DOM
	- Server-side Rendering
	- Uni-directional data flow
2. Props and state
	- **State** : ==source of data==
	- **Props**: ====
3.  **What are the different phases of React component’s lifecycle?**
	- ==Initial Rendering Phase:== **(Mounting)** This is the phase when the component is about to start its life journey and make its way to the DOM.
	-  ==_Updating Phase:_== **(Updating)** Once the component gets added to the DOM, it can potentially update and re-render only when a prop or state change occurs. That happens only in this phase.
	-  ==_Unmounting Phase:_== **(Unmounting)** This is the final phase of a component’s life cycle in which the component is destroyed and removed from the DOM.
4. What are Higher Order Components(HOC)?
	- are custom components which wrap another component within it.
	- HOC are ‘pure’ components.
5. What is the significance of keys in React?
	- keys are used for identifying unique Virtual DOM Elements with their corresponding data driving the UI

## Peer Question

### [Cynthia]
1. what us a hook and give a example?
### [Lionel]
1. how do you pass props from parent to child component
### [Eligrand]

[Coach]

1. Diffing and reconciliation in react?
2. why do we need keys?
3. which data type the props come with?
4. what are rules for using hooks?
5. why do we need `useEffect()`
6. what are the arguments that can be passed to the `useState()`