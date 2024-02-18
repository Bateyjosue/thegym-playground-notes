const express = require('express')

const app = express()

app.listen(3000)

app.get('/', (req, res) => {
  res.send('<h1>Express Application</h1>')
})

app.get('/about', (req, res) => { 
  res.send('<h1>About Express</h1>')
})