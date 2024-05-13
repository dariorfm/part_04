const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else if (blogs.length === 1) {
    return blogs[0]
  }
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else if (blogs.length === 1) {
    return { blogs: 1, author: blogs[0].author }
  } else {
    const authors = blogs.map(blog => blog.author)
    const author = authors.reduce((max, author) => {
      const count = authors.filter(a => a === author).length
      return count > max.count ? { count, author } : max
    }, { count: 0, author: '' })
    return { author: author.author, blogs: author.count }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
