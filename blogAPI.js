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
    let blogPosts =  await BlogPost.find().sort({date : -1});
    res.status(201).json(blogPosts);
}));


app.post('/new', asyncHandler(async (req, res) => {
    const blogPost = new BlogPost({author: req.body.author, 
        date: req.body.date,
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


app.get('/delete/date', asyncHandler(async (req, res) => {
    const postDate = req.query.postDate;
    const blogPost = await BlogPost.findOneAndDelete({date: postDate});
    if (blogPost) {
        res.status(201).json(blogPost);
    } else {
        res.status(404).json({nessage : "No blog post with such date exists."})
    };
}));

app.get('/delete/title', asyncHandler(async (req, res) => {
    const postTitle = req.query.postTitle;
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