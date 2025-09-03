const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let collection;

async function connectDB() {
    await client.connect();
    const db = client.db("petgame");
    collection = db.collection("players");
}
connectDB();

// --- API routes ---

// Save progress
app.post("/save", async (req, res) => {
    const { playerId, data } = req.body;
    await collection.updateOne(
        { playerId },
        { $set: { data, lastUpdate: new Date() } },
        { upsert: true }
    );
    res.json({ success: true });
});

// Load progress
app.get("/load/:playerId", async (req, res) => {
    const playerId = req.params.playerId;
    const player = await collection.findOne({ playerId });
    if (player) {
        res.json({data: player.data, lastUpdate: player.lastUpdate});
    } else {
        res.json(null);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



