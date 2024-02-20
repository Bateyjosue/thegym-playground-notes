const express = require('express')

const app = express()

app.listen(3000)

app.get('/', (req, res) => {
  res.sendFile(
    './views/index.html',
    {root: __dirname}
  )
})

app.get('/about', (req, res) => { 
  res.sendFile(
    './views/about.html',
    {root: __dirname}
  )
})

app.get('/404', (req, res) => { 
  res.sendFile(
    './views/404.html',
    {root: __dirname}
  )
})


app.get('/*', (req, res) => { 
  res.sendFile(
    './views/404.html',
    {root: __dirname}
  )
// 
  // res.redirect('/404')
})

  // 404 page
  app.use((req, res) => {
    res.sendFile('./views/404.html', {root: __dirname})
  })