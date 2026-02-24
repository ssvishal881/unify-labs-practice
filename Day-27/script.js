// ==========================
// Shop API Server
// ==========================

const express = require("express");

const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(express.json());


// MongoDB Connection
const client = new MongoClient("mongodb://localhost:27017");

let db;

async function connectDB() {

    await client.connect();

    db = client.db("shop");

    console.log("Database connected successfully");
}

connectDB();


// ==========================
// CREATE PRODUCT (POST)
// ==========================

app.post("/products", async (req, res) => {

    const product = {

        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };

    const result = await db
        .collection("products")
        .insertOne(product);

    res.json(result);
});


// ==========================
// READ PRODUCTS (GET)
// ==========================

app.get("/products", async (req, res) => {

    const products = await db
        .collection("products")
        .find()
        .toArray();

    res.json(products);
});


// ==========================
// UPDATE STOCK ONLY (PATCH)
// ==========================

app.patch("/products/:id", async (req, res) => {

    const id = req.params.id;

    const result = await db
        .collection("products")
        .updateOne(

            { _id: new ObjectId(id) },

            { $set: { stock: req.body.stock } }

        );

    res.json(result);
});


// ==========================
// DELETE PRODUCT (DELETE)
// ==========================

app.delete("/products/:id", async (req, res) => {

    const id = req.params.id;

    const result = await db
        .collection("products")
        .deleteOne(

            { _id: new ObjectId(id) }

        );

    res.json(result);
});


// ==========================
// START SERVER
// ==========================

app.listen(3000, () => {

    console.log("Server running on http://localhost:3000");

});