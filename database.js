const mongoose = require("mongoose");
require('dotenv').config();


const dbConnectionUri = `mongodb+srv://${process.env.NAME}:${process.env.MONGODB_PASSWORD}@connors-cluster.5p7zb.mongodb.net/?retryWrites=true&w=majority&appName=connors-cluster`;
const dbName = "echo";

// console.log(dbConnectionUri);
async function connectToDB() {
	await mongoose.connect(dbConnectionUri, { dbName });
	console.log("Successfully connected to MongoDB");
};


const blogPostSchema = new mongoose.Schema({
    author: String,
    date: String, // Date?
    title: String,
    text: String,
	contentURL: String,
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = {connectToDB, BlogPost};
