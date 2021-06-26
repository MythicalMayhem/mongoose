const express = require('express');
const morgan = require('morgan')
const app = express();
const mongoose = require('mongoose')
const dbURI = "mongodb+srv://oussema:Azerty123@cluster0.nogpp.mongodb.net/blgretryWrites=true&w=majority"
const Blog = require('./models/blog')
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=> console.log('connected to db'))
    .catch((err)=>console.log('error'))

app.listen(3000);
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(morgan('dev'))

app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title:'new blog2',
        snippet:'about blog',
        body:'blog body'
    })
    blog.save() 
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/all-blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/single-blog',(req,res)=>{
    Blog.findById("60c91f9f97ec782d38a65b3b")
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/', (req, res) => {
      res.redirect('blogs');})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.render('index',{title:'All Blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

