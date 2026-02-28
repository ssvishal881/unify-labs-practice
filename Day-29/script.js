const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// 🔥 Replace with your real Atlas SRV
const uri = "mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/zenithDB?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db;

async function connectDB() {

await client.connect();
db = client.db("zenithDB");

console.log("Connected to MongoDB Atlas");
}

connectDB();


// GET ALL POSTS
app.get("/api/posts", async (req, res) => {

const posts = await db.collection("posts").find().toArray();
res.json(posts);

});

// CREATE POST
app.post("/api/posts", async (req, res) => {

const post = {
title: req.body.title,
category: req.body.category,
content: req.body.content,
createdAt: new Date()
};

const result = await db.collection("posts").insertOne(post);
res.json(result);

});

// DELETE POST
app.delete("/api/posts/:id", async (req, res) => {

await db.collection("posts").deleteOne({
_id: new ObjectId(req.params.id)
});

res.json({ message: "Deleted successfully" });

});

// UPDATE POST
app.patch("/api/posts/:id", async (req, res) => {

await db.collection("posts").updateOne(
{ _id: new ObjectId(req.params.id) },
{ $set: req.body }
);

res.json({ message: "Updated successfully" });

});

app.listen(3000, () => {

console.log("Server running on http://localhost:3000");

});