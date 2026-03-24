const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'John Doe',
    url: 'http://example.com/html',
    likes: 5
  },
  {
    title: 'JavaScript is great',
    author: 'Jane Doe',
    url: 'http://example.com/js',
    likes: 10
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }