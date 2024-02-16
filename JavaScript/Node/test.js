const fs = require('fs');
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


// if (fs.existsSync('./test/test.txt')) {
//   fs.unlink('./test/test.txt', error => {
//     if (error) console.log(error)
//   })
// }
// fs.writeFile('./test/test.txt', 'This is a test', (error) => {
//   if (error) console.log(error)
// })

// fs.appendFile('./test/test.txt', '\nAppend test', (error) => {
//   if (error) console.log(error)
// })

// fs.readFile('./test/test.txt', (error, data) => {
//   if (error) console.log(error)
//   console.log(data.toString())
// })


// Exercise 6

// const source = fs.createReadStream('./test/test.txt', { encoding: 'utf8'})
// const destination = fs.createWriteStream('./test/destination.txt')

// source.pipe(destination)

// Exercise 7

// const source = fs.createReadStream('./test/test.txt', { encoding: 'utf8' }, error => {
//   if (error) console.log(error)
// })
// const destination = fs.createWriteStream('./test/destination.txt', error => {
//   if (error) console.log(error)
// })

// source.on('data', chunk => {
//   destination.write('\n')
//   destination.write(chunk)
//   destination.write('======= Destination Data =========')
// })

// // fs.readFile('./test/destination.txt', ( error, data) => {
// //   if (error) console.log(error)
// //   console.log(data.toString());
// // })


// destination.on('data', chunk => {
//   console.log(chunk);
// })

// Exercise 8

process.title = 'Joshi Tests'

console.log(process.title);