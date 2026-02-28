// ==============================
// Cloud MongoDB Atlas Connection
// ==============================

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());


// 🔥 REPLACE WITH YOUR REAL ATLAS STRING
const uri = "mongodb+srv://shopUser:yourPassword123@cluster0.xxxxx.mongodb.net/shopDB?retryWrites=true&w=majority";

// Create MongoClient
const client = new MongoClient(uri);

let db;


// Connect to Atlas
async function connectDB() {

    try {

        await client.connect();

        db = client.db("shopDB");

        console.log("Connected to MongoDB Atlas successfully");

    }
    catch (error) {

        console.error("Atlas connection failed:", error.message);
    }
}

connectDB();


// ==============================
// CREATE PRODUCT
// ==============================

app.post("/products", async (req, res) => {

    const product = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };

    const result = await db.collection("products").insertOne(product);

    res.json(result);
});


// ==============================
// GET PRODUCTS
// ==============================

app.get("/products", async (req, res) => {

    const products = await db.collection("products").find().toArray();

    res.json(products);
});


// ==============================
// START SERVER
// ==============================

app.listen(3000, () => {

    console.log("Server running at http://localhost:3000");

});