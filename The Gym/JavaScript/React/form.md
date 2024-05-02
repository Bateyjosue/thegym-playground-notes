1. In a vanilla JS app, at what point in the form submission process do you gather all the data from the filled-out form?
Right before the form is submitted.
  
2. In a React app, when do you gather all the data from the filled-out form?
As the form is being filled out. The data is all held in local state.

3. Which attribute in the form elements (value, name, onChange, etc.)
should match the property name being held in state for that input?
`name` property.

4. What's different about saving the data from a checkbox element vs. other form elements?
A checkbox uses the `checked` property to determine what should
be saved in state. Other form elements use the `value` property instead.  

5. How do you watch for a form submit? How can you trigger a form submit?
- Can watch for the submit with an onSubmit handler on the `form` element.
- Can trigger the form submit with a button click.


## Example

```jsx
import React from "react"
export default function Form() {

const [formData, setFormData] = React.useState(
		{
			firstName: "",
			lastName: "",
			email: "",
			comments: "",
			isFriendly: true,
			employment: "",
			favColor: ""
		}
		)

function handleChange(event) {
	const {name, value, type, checked} = event.target
	setFormData(prevFormData => {
		return {
			...prevFormData,
			[name]: type === "checkbox" ? checked : value
		}
	})
}

function handleSubmit(event) {
event.preventDefault()
// submitToApi(formData)
console.log(formData)
}
return (
<form onSubmit={handleSubmit}>
	<input
	type="text"
	placeholder="First Name"
	onChange={handleChange}
	name="firstName"
	value={formData.firstName}
	/>

	<input
	type="text"
	placeholder="Last Name"
	onChange={handleChange}
	name="lastName"
	value={formData.lastName}
	/>

	<input
	type="email"
	placeholder="Email"
	onChange={handleChange}
	name="email"
	value={formData.email}
	/>

	<textarea
	value={formData.comments}
	placeholder="Comments"
	onChange={handleChange}
	name="comments"
	/>

	<input
	type="checkbox"
	id="isFriendly"
	checked={formData.isFriendly}
	onChange={handleChange}
	name="isFriendly"
	/>

	<label htmlFor="isFriendly">Are you friendly?</label>
	<br />
	<br />
	<fieldset>
	<legend>Current employment status</legend>
	
	<input
	type="radio"
	id="unemployed"
	name="employment"
	value="unemployed"
	checked={formData.employment === "unemployed"}
	onChange={handleChange}
	/>

	<label htmlFor="unemployed">Unemployed</label>
	<br />
	<input
	type="radio"
	id="part-time"
	name="employment"
	value="part-time"
	checked={formData.employment === "part-time"}
	onChange={handleChange}
	/>

	<label htmlFor="part-time">Part-time</label>
	<br />
		<input
		type="radio"
		id="full-time"
		name="employment"
		value="full-time"
		checked={formData.employment === "full-time"}
		onChange={handleChange}
		/>
	
	<label htmlFor="full-time">Full-time</label>
	<br />
	</fieldset>
	<br />
	<label htmlFor="favColor">What is your favorite color?</label>
	<br />

	<select
		id="favColor"
		value={formData.favColor}
		onChange={handleChange}
		name="favColor"
>	
			<option value="red">Red</option>
			<option value="orange">Orange</option>
			<option value="yellow">Yellow</option>
			<option value="green">Green</option>
			<option value="blue">Blue</option>
			<option value="indigo">Indigo</option>
			<option value="violet">Violet</option>
	</select>
	<br />
	<br />
<button>Submit</button>
</form>
)

}
```