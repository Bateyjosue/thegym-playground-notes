## 12.09.2023
___
1. Palindromic Numbers
### DESCRIPTION:
A [palindromic number](http://en.wikipedia.org/wiki/Palindromic_number) is a number that remains the same when its digits are reversed. Like 16461, for example, it is "symmetrical".

Non-palindromic numbers can be paired with palindromic ones via a series of operations. First, the non-palindromic number is reversed and the result is added to the original number. If the result is not a palindromic number, this is repeated until it gives a palindromic number.

### Lychrel Numbers

It is not known whether all non-palindromic numbers can be paired with palindromic numbers in this way. While no number has been proven to be unpaired, many do not appear to be. For example, 196 does not yield a palindrome even after 700,000,000 iterations. Any number that never becomes palindromic in this way is known as a [Lychrel number](http://en.wikipedia.org/wiki/Lychrel_number).

This Kata is about actually finding a palindromic number out of an original seed.

You will be given a number as input and in the output you must return a string containing the number of iterations (i.e. additions) you had to perform to reach the palindromic result and the palindromic number itself, separated by a space. In Haskell return a tuple `(Int, Integer)`.

```mostlangs
palindromize(195) == 4 9339
palindromize(265) == 5 45254
palindromize(750) == 3 6666
```

### Some Assumptions

You can assume that all numbers provided as input will be actually paired with a palindromic result and that you will reach that result in less than 1000 iterations and yield a palindrome.
#### Thought Process
```
1. check if the number is a palendrome
2. get non palindrome
3. computer with the palindrome
```

#### Solution

```js
function isPalindrome(n) {
  const strNum = n.toString();
  const reversedStr = strNum.split('').reverse().join('');
  return strNum === reversedStr;
}
function palindromize(num){
    let iterations = 0;

    while (!isPalindrome(num)) {
        const reversedNum = parseInt(num.toString().split('').reverse().join(''), 10);
        num += reversedNum;
        iterations++;
    }

    return `${iterations} ${num}`;
}
```

2.  **So Many Permutations!**
### DESCRIPTION:

In this kata, your task is to create all permutations of a non-empty input string and remove duplicates, if present.

Create as many "shufflings" as you can!

### Examples

Examples:

```bash
With input 'a':
Your function should return: ['a']

With input 'ab':
Your function should return ['ab', 'ba']

With input 'abc':
Your function should return ['abc','acb','bac','bca','cab','cba']

With input 'aabb':
Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
```

Note: The order of the permutations doesn't matter.
#### Thought Process
```
- Use recursion.
- For each letter in the given string, create all the partial permutations for the rest of its letters.
- Use Array.prototype.map() to combine the letter with each partial permutation.
- Use Array.prototype.reduce() to combine all permutations in one array.
- Base cases are for String.prototype.length equal to 2 or 1
- WARNING: The execution time increases exponentially with each character. Anything more than 8 to 10 characters will cause your environment to hang as it tries to solve all the different combinations.
```

#### Solution

```js
function permutations(string) {
	if(string.length <= 2) return string.length === 2 ? [...new Set([string, string[1]+ string[0]])]  : [string]
  return [... new Set(
    string.split('')
  .reduce(
    (acc, curr, index) => 
      acc.concat(permutations(string.slice(0, index) + string.slice(index + 1)).map(el => curr + el)),[]
  )
  )] 
}
```

## 14.09.2023
---

 1. **Sum the nums, sum the sums and sum the nums up to that sum**
### Description

You will be given an integer `N` as input; your task is to return the value of `S(Z(N))`.

For example, let `N = 3`:

```javascript
Z(3n) = 1n + 3n + 6n = 10n
S(Z(3n)) = S(10n) = 55n
```

The input range is `1 <= N <= 10^9` and there are `80` ( `40` in LC ) test cases, of which most are random.

### Solution

```js
function sumOfSums(n) {
  let sum = 0n
  let innerSum = 0n 
  for(let i = 1n; i <= n; i++){
    innerSum += (i * (i + 1n)) / 2n
  }
  for(let j = 1n; j <= innerSum; j++){
      sum += j
    }
  console.log(sum)
  return sum;
}
```