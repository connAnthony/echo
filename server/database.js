const mongoose = require("mongoose");
require('dotenv').config();

const dbConnectionUri = `mongodb+srv://${process.env.NAME}:${process.env.MONGODB_PASSWORD}@connors-cluster.5p7zb.mongodb.net/?retryWrites=true&w=majority&appName=connors-cluster`;
const dbName = "echo";

// Function to connect to the database
async function connectToDB() {
    await mongoose.connect(dbConnectionUri, { dbName });
    console.log("Successfully connected to MongoDB");
}

// BlogPost schema and model
const blogPostSchema = new mongoose.Schema({
    author: String,
    date: Date, 
    title: String,
    text: String,
    contentURL: String,
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

// Event schema and model
const eventSchema = new mongoose.Schema({
    organizer: String,
    date: Date,
    time: String,
    location: String,
    title: String,
    description: String,
    contentURL: String,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { connectToDB, BlogPost, Event };
