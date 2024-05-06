const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')


app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('<h1>Hello, this is part 04 of FullstakOpen Course! Now, if I make a change it could be updated only restarting de web browser.</h1>');
});

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


