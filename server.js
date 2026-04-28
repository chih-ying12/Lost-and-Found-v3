const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const DB_PATH = "./data/db.json";

// Load database
function loadDB() {
    return JSON.parse(fs.readFileSync(DB_PATH));
}

// Save database
function saveDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// LOGIN / SIGNUP
app.post("/auth", (req, res) => {
    let db = loadDB();
    const { username, password } = req.body;

    let user = db.users.find(u => u.username === username);

    if (!user) {
        db.users.push({ username, password });
        saveDB(db);
        return res.json({ message: "User created" });
    }

    if (user.password === password) {
        return res.json({ message: "Login success" });
    }

    res.status(401).json({ message: "Wrong password" });
});

// ADD FOUND ITEM
app.post("/found", (req, res) => {
    let db = loadDB();
    db.items.push(req.body);
    saveDB(db);
    res.json({ message: "Item posted" });
});

// GET ITEMS
app.get("/items", (req, res) => {
    let db = loadDB();
    res.json(db.items);
});

// VERIFY ITEM
app.post("/verify", (req, res) => {
    let db = loadDB();
    const { id, answer } = req.body;

    let item = db.items.find(i => i.id === id);

    if (item && item.verification === answer) {
        return res.json({ success: true });
    }

    res.json({ success: false });
});

app.listen(3000, () => console.log("Server running on port 3000"));
