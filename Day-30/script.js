const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 Replace with your Atlas connection
const uri = "mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/titanDB?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db;

async function connectDB() {
await client.connect();
db = client.db("titanDB");
console.log("Connected to MongoDB Atlas");
}

connectDB();


// ================= PRODUCTS =================

// GET with optional category filter
app.get("/api/products", async (req, res) => {

let filter = {};

if(req.query.category) {
filter.category = req.query.category;
}

const products = await db.collection("products").find(filter).toArray();
res.json(products);

});


// ================= ORDERS =================

// Sanitize helper (prevent NoSQL injection)
function sanitize(input) {

if(typeof input === "string") {
return input.replace(/\$/g, "").replace(/\./g, "");
}
return input;
}

app.post("/api/orders", async (req, res) => {

const order = req.body;

// sanitize customer fields
order.customer.name = sanitize(order.customer.name);
order.customer.email = sanitize(order.customer.email);
order.customer.address = sanitize(order.customer.address);

await db.collection("orders").insertOne(order);

res.json({ message: "Order saved" });

});

app.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});