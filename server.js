const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://alexanderjacob1107aj_db_user:21nK0GS4xGcBkLAO@petstats.ujgum8l.mongodb.net/?retryWrites=true&w=majority&appName=PetStats"
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

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));