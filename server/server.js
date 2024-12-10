const express = require("express");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB, BlogPost, Event } = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Blog routes
app.get('/', asyncHandler(async (req, res) => {
    const blogPosts = await BlogPost.find().sort({ date: 1 });
    res.status(201).json(blogPosts);
}));

app.get('/post/id/:id', asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const blogPost = await BlogPost.findById(postId);
    if (blogPost) {
        res.status(201).json(blogPost);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
}));

app.post('/new', asyncHandler(async (req, res) => {
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

app.get('/delete/id/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const blogPost = await BlogPost.findByIdAndDelete(id);
    if (blogPost) {
        res.status(201).json(blogPost);
    } else {
        res.status(404).json({ message: "Blog post id does not exist." });
    }
}));

app.get('/delete/date/:date', asyncHandler(async (req, res) => {
    const postDate = req.params.date;
    const blogPost = await BlogPost.findOneAndDelete({ date: postDate });
    if (blogPost) {
        res.status(201).json(blogPost);
    } else {
        res.status(404).json({ message: "No blog post with such date exists." });
    }
}));

app.get('/delete/title/:title', asyncHandler(async (req, res) => {
    const postTitle = req.params.title;
    const blogPost = await BlogPost.findOneAndDelete({ title: postTitle });
    if (blogPost) {
        res.status(201).json(blogPost);
    } else {
        res.status(404).json({ message: "Blog post title does not exist." });
    }
}));

// Event routes
app.get('/events', asyncHandler(async (req, res) => {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
}));

app.get('/event/id/:id', asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
}));

app.post('/event/new', asyncHandler(async (req, res) => {
    const event = new Event({
        organizer: req.body.organizer,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        title: req.body.title,
        description: req.body.description,
        contentURL: req.body.contentURL
    });
    await event.save();
    res.status(201).json(event);
}));

app.get('/event/delete/id/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const event = await Event.findByIdAndDelete(id);
    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: "Event ID does not exist." });
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
