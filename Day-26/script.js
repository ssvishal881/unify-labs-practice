// ==============================
// Backend Bridge - MongoDB Connection
// ==============================

// Import MongoClient
const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Create MongoClient
const client = new MongoClient(url);


// Connect function
async function connectDB() {

    try {

        // Connect to MongoDB
        await client.connect();

        console.log("Database connected successfully");

        // Access database
        const db = client.db("unify_labs");

        // Access collection
        const collection = db.collection("products");

        // Fetch data
        const data = await collection.find().toArray();

        console.log("Products:");
        console.log(data);

    }
    catch (error) {

        console.log("Connection failed:", error.message);

    }
    finally {

        await client.close();
    }
}


// Run connection
connectDB();