04.09.2023
--
___
1.  **Log without dates**
### DESCRIPTION:

You will be given an array of events, which are represented by strings. The strings are dates in HH:MM:SS format.

It is known that all events are recorded in chronological order and two events can't occur in the same second.

Return the minimum number of days during which the log is written.

### Example:
```bash
Input -> ["00:00:00", "00:01:11", "02:15:59", "23:59:58", "23:59:59"]
Output -> 1

Input -> ["12:12:12"]
Output -> 1

Input -> ["12:00:00", "23:59:59", "00:00:00"]
Output -> 2

Input -> []
Output -> 0
```

#### Thought Process
```
1. loop throuth the string of dates
2. get the hours part of the day check in the first hour part is less than the other remainin string hours format an then increase count
```
```typescript
export function checkLogs(log: string[]): number {
  let count = 0;
  log.map((_,index) => log[0].split(':')[0])
}

console.log(checkLogs("12:00:00", "23:59:59", "00:00:00"))
```

#### Solution

```typescript
export function checkLogs(log: string[]): number {
  return log.length != 0
    ? log.filter((el, index) => log[index] >= log[index + 1] && index < log.length).length + 1
    : 0
}
```

2.  **Tail Swap**
### DESCRIPTION:

You'll be given a list of two strings, and each will contain exactly one colon (`":"`) in the middle (but not at beginning or end). The length of the strings, before and after the colon, are random.

Your job is to return a list of two strings (in the same order as the original list), but with the characters after each colon swapped.

## Examples

```bash
["abc:123", "cde:456"]  -->  ["abc:456", "cde:123"]
["a:12345", "777:xyz"]  -->  ["a:xyz", "777:12345"]
```

```typescript
let set = new Set<string>(routes.flat())
let singleRoute :string[]= []
set.forEach((el:string) => singleRoute.push(el))
return singleRoute.join(', ')
```

3. Bit Counting

## Description

Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.

_Example_: The binary representation of `1234` is `10011010010`, so the function should return `5` in this case

#### Solution

```typescript
export function countBits(n: number): number {
	let binary = (n).toString(2)
	if(n > 0){
		return [...binary].filter(el => el ==='1').length
	}
	return 0
}
```

#### Summary 

> In this Kata I have Used the function `toString()` to convert a number to its binary system `Number.toString()`
> `let binary = (n).toString(2)` with `n` being the integer and `2` the binary system representation
> after I spread the binary because after the conversion it came in `string ` format so I will have a array of character in `binary` with the following code `[...binary]` then filter them to get 1's, finally returning the `length` of the filtered array with 1's

4.  Two Sum
## Description
 Write a function that takes an array of numbers (integers for the tests) and a target number. It should find two different items in the array that, when added together, give the target value. The indices of these items should then be returned in a tuple / list (depending on your language) like so: `(index1, index2)`.

For the purposes of this kata, some tests may have multiple answers; any valid solutions will be accepted.

The input will always be valid (numbers will be an array of length 2 or greater, and all of the items will be numbers; target will always be the sum of two different items from that array).

Based on: [http://oj.leetcode.com/problems/two-sum/](http://oj.leetcode.com/problems/two-sum/)

```javascript
twoSum([1, 2, 3], 4) // returns [0, 2] or [2, 0]
```
### First Solution

```js
function twoSum(numbers, target) {
  let min = Math.min(...numbers)
  let i1 = numbers.indexOf(min)
 for(let i= 0; i< numbers.length; i++){
   if(i != i1 && min + numbers[i] === target){
      console.log(numbers[i], numbers[i1])
      return  [ i, i1]
   }
 }
}
```

>> For this code One test wasn't passing because I was starting my condition based on the minimum number but for the case like `twoSum([1234, 5678, 9012], 14690)` was failing because the min number adding the any other in the collection wasn't `===` to the `target`
### Refactored Solution

```js
function twoSum(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        console.log(numbers[i], numbers[j]);
        return [i, j];
      }
    }
  }
}
```

>> Using nested loop will help me to navigate with 2 index the current and `+1`