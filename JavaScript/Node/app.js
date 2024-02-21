const express = require('express')

const app = express()

// View engine configuration
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(express.static("node_modules"));

app.listen(3000)

app.get('/', (req, res) => {
  const stacks = ['TypeScript', 'Javascript', 'Nodejs', 'TailwindCss']

  res.render('index', { title: 'Home', stacks})
})

app.get('/about', (req, res) => { 
  res.render('about', { title: 'About Page'})
})

// app.get('/*', (req, res) => { 
//   res.render('404')
// // 
//   // res.redirect('/404')
// })

  // 404 page
  app.use((req, res) => {
    res.render('404', { title: '404 | Not Found'})
  })