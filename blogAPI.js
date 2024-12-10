const express = require("express");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB, BlogPost } = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', asyncHandler(async (req, res) => {
    let blogPosts =  await BlogPost.find().sort({date : 1});
    res.status(201).json(blogPosts);
}));

// used by blogscript.js
app.get('/post/id/:id', asyncHandler(async (req, res) => {
    const postId = req.params.id;

    // Find the blog post by its id
    const blogPost = await BlogPost.findById(postId);
    
    if (blogPost) {
        res.status(201).json(blogPost); // If post found, send it as a response
    } else {
        res.status(404).json({ message: "Post not found" }); // If post not found, send 404 error
    }
}));


app.post('/new', asyncHandler(async (req, res) => {
    const blogPost = new BlogPost({author: req.body.author, 
        date: Date.now(),
        title: req.body.title,
        text: req.body.text,
        contentURL: req.body.contentURL});
    await blogPost.save();
    res.status(201).json(blogPost);
}));

app.get('/delete/id/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    // check if the id is formatted correctly says gpt

    const blogPost = await BlogPost.findByIdAndDelete(id);
    if (blogPost) {
        res.status(201).json(blogPost);
    } else {
        res.status(404).json({message : "Blog post id does not exist."});
    }
}));


app.get('/delete/date/:date', asyncHandler(async (req, res) => {
    const postDate = req.params.date;
    const blogPost = await BlogPost.findOneAndDelete({date: postDate});
    if (blogPost) {
        res.status(201).json(blogPost);
    } else {
        res.status(404).json({nessage : "No blog post with such date exists."})
    };
}));

app.get('/delete/title/:title', asyncHandler(async (req, res) => {
    const postTitle = req.params.title;
    const blogPost = await BlogPost.findOneAndDelete({title: postTitle});
    if (blogPost) {
        res.status(201).json(blogPost);
    } else {
        res.status(404).json({nessage : "Blog post title does not exist."});
    }
}));




async function start() {
    await connectToDB();

    return app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

if (require.main === module) {
    start().catch((err) => console.error(err));
}