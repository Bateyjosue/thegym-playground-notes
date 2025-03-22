# Hugo:
- On the question 3 I didn't see the use of `this` keyword as suggested in the hint, and beside your `function` is using a static variable
	Consider adding a variable that will hold the age of the pet to the object `myPet` maybe something like `myPet.petAge = 7` then use the `this` to return the pet age
- On question 4, why declare a variable that you will not even use like `speciesChecker`? make use of it of remove.
	You could've just passed it to the if clause `if (myPet.species == "dog")` and replace it with the string 'dog' but with what end. I will suggest to remove and again you could also refactor the `if...else` to maybe a ternary operation `myPet.species == "dog" ? true : false`, this will also work `return myPet.species == "dog"`. using also `===` wouldn't hurt 😊😊
- On question 7: I wouldn't advice usage of such variable name `diffMs`, beside I found it quit interesting implementing the helper function `convertTo24Hour`
- On question 10: nice using array function `split`, `join` and `reverse`
-  Nice implementing the `STRETCH GOAL`

# Natasha
- On question 3: I wouldn't suggest someone to use variable name `years` it's better to use something meaningful like `petAge`
- On question 4: handling only one case the best case scenario make your code not secure and not reliable as well because in the case that the `speciesChecker` isn't `dog` it returns `undefined` which is not correct in that case is suppose to return `false` instead, would suggest to whether the early return just by returning the conditional expression as they asking you to return `true` otherwise `false`
```js
	return speciesObject.species === speciesChecker
```
> there is different way to accomplish this though

- On question 10: oh wow  that great to use the brute force pure way to reverse a string. but would you mind using the high order function to do that? JS has functions like `reverse` to reverse a array of thing but before you might need to `split` the string and after `join` them together it seems long in explanation but very short in execution

# Pedram Lalezar
## JavaScript Loops and Arrays
- Make sure that add the console.log to display to make it easy to the reviewer to see the result of your code
- On question 5,  what do you x means. it better at any cost to name your variable a meaningful name 
- On question 6, be mindful while creating variable, declaring a variable and using that a waste of resource so if you will not use a variable better avoid declaring it, and as there are only 2 cases whether it's an array or not you can maybe still use a ternary operation `? :`  that can simplified your code
- On question 7, same here as it's whether an index exist or not you can still use the ternary operator or even just returning the conditional operator like `index>= 0 && index < arr.length`
- I would have been happy to see yah implement the `STRETCH GOAL`
- Kudos to you nice implementation

# Mylea Spicer
## JavaScript Loops and Arrays
- Mylea I think you always need to check there is a error on your code before submitting it
- Avoid also declaring variable that you not use to avoid  waste of memory
- make sure to always name your variable with meaningful name, like `n` does really mean anything maybe if someone reading your then they will not really relate to it until they read the whole, make it easy for whoever reading your code to understand line after line while reading your code
## LESSON 3 OBJECTS
- Question 1: you have been asked to declare  a object with 3 properties `name`, `species` and `color`. but I can see you have added the `petAge` to it. it great to follow instruction to avoid some over usage of resources
- Question 2: a template literals would do the work propertly, checkethis out: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
- Question 3: here is where you suppose to update the object with the new property `petAge` with such code `myPet.petAge = 7` in this case it will found out that it doesn't exist the it will created and then initialized with `7` then in the function you can freely return it `return this.petAge`

# Winifred Kinanda
## LESSON 4 ARRAY METHODS
- Make sure your code runs before submitting—don’t rely solely on the AI reviewer.
- You don’t need to declare a new variable every time you want to use Roslyn-style double quotes added for clarity. In this assignment, since we’re working within a single file, it’s unnecessary to create multiple variables unless the data differs significantly. If you’re handling different data sets, you could name them descriptively, like users1, users2, etc., instead of repeatedly declaring users. This keeps things efficient and clear.
- Using arrow functions in methods is always a great practice—remember to apply them next time where appropriate.
- Giving variables meaningful, self-explanatory names is crucial for clean code and readability. While reviewing your code, I noticed a variable named x, which took me extra time to understand by referring back to the question. Ensure your variable names are descriptive to improve comprehension.
- Kudos for your great work overall! I’ve left some comments that I believe are relevant and addressing them will significantly benefit your code’s readability and cleanliness.