// Exercise 1

// global.appName = "MyApp"

// console.log(global.appName)

// Exercise 2
// const arguments = process.argv
// if (arguments.length < 3) {
//   console.log('no arguments were given')
// } else {
//   console.log(arguments[2])
// }

// Exercise 3
// process.env['MY_ENV_VAR'] = 'Josh App'
// const {MY_ENV_VAR} = process.env

// if (!MY_ENV_VAR) {
// 	console.log('Default')
// }

// console.log(MY_ENV_VAR)

// Exercise 4
// const str = 'hello world'
// console.log("Original String: " +str);

// const bf = Buffer.from(str)
// console.log(bf);
// const strFromBuffer = bf.toString()

// console.log(`String from buffer: "${strFromBuffer}"`);

// exercise 5
const fs = require('fs')

if (fs.existsSync('./test/test.txt')) {
  fs.unlink('./test/test.txt', error => {
    if (error) console.log(error)
    console.log('Delete test.txt');
  })
}
fs.writeFile('./test/test.txt', 'This is a test', () => {
  console.log('test.txt create');
})

fs.appendFile('./test/test.txt', 'Append test', () => {
  console.log('test.txt create');
})

fs.readFile('./test/test.txt', (error, data) => {
  if (error) console.log(error)
  console.log(data.toString())
})

