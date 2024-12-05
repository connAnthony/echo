const mongoose = require("mongoose");


const dbConnectionUri = "mongodb+srv://connorfagan:<db_password>@connors-cluster.5p7zb.mongodb.net/?retryWrites=true&w=majority&appName=connors-cluster";
const dbName = "";

async function connectToDB() {
	await mongoose.connect(dbConnectionUri, { dbName });
	console.log("Successfully connected to MongoDB");
};


const blogPostSchema = new mongoose.Schema({
    author: String,
    date: String,
    title: String,
    text: String,
	contentURL: String,
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

moduel.exports = {connectToDB, BlogPost};
