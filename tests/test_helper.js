const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'http://blog1.com',
    likes: 1
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'http://blog2.com',
    likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Author 3', url: 'http://blog3.com', likes: 3 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const validToken = async () => {
  const user = {
    username: 'root',
    password: 'sekret'
  }

  const response = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return response.body.token
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  validToken
}
