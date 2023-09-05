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

