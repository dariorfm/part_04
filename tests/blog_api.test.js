const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
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

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog posts have id property', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    assert(blog.id)
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Author 3',
    url: 'http://blog3.com',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(titles.includes('Blog 3'))
})

test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: 'Blog 4',
    author: 'Author 4',
    url: 'http://blog4.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blog = response.body.find(blog => blog.title === 'Blog 4')

  assert.strictEqual(blog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})
