const express = require("express");
const asyncHandler = require("express-async-handler");
const { BlogPost } = require("../database");

const router = express.Router();

// Get all blog posts, sorted by date
router.get("/", asyncHandler(async (req, res) => {
    const blogPosts = await BlogPost.find().sort({ date: 1 });
    res.status(200).json(blogPosts);
}));

// Get a blog post by ID
router.get("/id/:id", asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const blogPost = await BlogPost.findById(postId);

    if (blogPost) {
        res.status(200).json(blogPost);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}));

// Create a new blog post
router.post("/new", asyncHandler(async (req, res) => {
    const blogPost = new BlogPost({
        author: req.body.author,
        date: Date.now(),
        title: req.body.title,
        text: req.body.text,
        contentURL: req.body.contentURL
    });

    await blogPost.save();
    res.status(201).json(blogPost);
}));

// Delete a blog post by ID
router.delete("/id/:id", asyncHandler(async (req, res) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findByIdAndDelete(id);

    if (blogPost) {
        res.status(200).json(blogPost);
    } else {
        res.status(404).json({ message: "Blog post ID does not exist." });
    }
}));

// Delete a blog post by date
router.delete("/date/:date", asyncHandler(async (req, res) => {
    const postDate = req.params.date;
    const blogPost = await BlogPost.findOneAndDelete({ date: postDate });

    if (blogPost) {
        res.status(200).json(blogPost);
    } else {
        res.status(404).json({ message: "No blog post with such date exists." });
    }
}));

// Delete a blog post by title
router.delete("/title/:title", asyncHandler(async (req, res) => {
    const postTitle = req.params.title;
    const blogPost = await BlogPost.findOneAndDelete({ title: postTitle });

    if (blogPost) {
        res.status(200).json(blogPost);
    } else {
        res.status(404).json({ message: "Blog post title does not exist." });
    }
}));

module.exports = router;
