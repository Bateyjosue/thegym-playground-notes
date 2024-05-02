
## Install dependencies

1. React mde
```bash
	npm i react-mde --legacy-peer-deps
```

2. Showdown
	Showdown is a Javascript Markdown to HTML converter. Showdown can be used client side (in the browser) or server side (with NodeJs).
```bash
npm i showdown --legacy-peer-deps
```
3. react-split
	The `<Split />` component wraps multiple children components to create a resizeable split view. The component is a light wrapper around the [Split.js](https://github.com/nathancahill/Split.js/) library and accepts (mostly) the same options.
```jsx
import Split from 'react-split'

<Split>
    <ComponentA />
    <ComponentB />
</Split>
```
#### Installation

```bash
npm i react-split --legacy-peer-deps
```

4. Nanoid
	A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
```jsx
import { nanoid } from 'nanoid'
model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"
```
#### Installation

```bash
npm i -S nanoid@3.0.0 --legacy-peer-deps
```

Alert: Note working for `npm i nanoid`


## Features

1. sync notes with localstorage
2. add notes summary titles
3. move modified notes to the top list delete notes
4. rename the notes 

## 1. Using localStorage

```js
localStorage.getItem('key')
localStorage.setItem('key', value)
```

**Note:** `value` must be a string, so if you have a more complex value like an array or object to save, you'll need to use:
- `JSON.stringify(value)`
- `JSON.parse(stringifyValue)`
