const express = require('express');
const mongoose = require('mongoose');

const app = express()

const Skill = require('./models/skills')

// View engine configuration
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(express.static("node_modules"));

// DB Connection

const dbURI = 'mongodb+srv://josuebatey19:mdpNMoWT3Sgaccsa@cluster0.hs7ibqw.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose.connect(dbURI)
  .then(res => app.listen(3000))
  .catch(err => console.log(err))

// Define a Schema



app.get('/', async (req, res) => {
  const stacks = []

  // // Create a document
  // const skill = new Skill({
  //   title: 'NestJS',
  //   link: 'https://www.nestjs.org',
  //   icon: 'fa fa-home',
  // })

  // try {
  //   const skillData = await skill.save()
  //   console.log(skillData);
  // }
  // catch (err) { 
  //   console.log(err);
  // }

  //get all document

  try {

    const allSkills = await Skill.find()
    allSkills.forEach(skill => stacks.push(skill))
  } catch (err) { 
    console.log(err);
  }

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