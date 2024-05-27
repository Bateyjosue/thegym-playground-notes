#mongoose #jwt #express

### Create jwt module
`module/auth.js`
```js
import jwt from 'jsonwebtoken'

export const createJWT = (user) => {

	const token = jwt.sign({
		id: user.id,
		email: user.email
	},
		process.env.JWT_SECRET
	)
	return token
}
```

### Create middleware to intercept unauthorized requests