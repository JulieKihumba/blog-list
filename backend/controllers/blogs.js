const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// get all blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});

// get one blog
blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch(error) {
    next(error)
  }
});

// add a blog
blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body

    // 4.12 — title or url missing = 400
    if (!body.title || !body.url) {
      return response.status(400).end()
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0  // 4.11 — default likes to 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)  // 4.10 — return 201
  } catch(error) {
    next(error)
  }
});

// delete a blog
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
});

// update a blog
blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } catch(error) {
    next(error)
  }
});

module.exports = blogsRouter;