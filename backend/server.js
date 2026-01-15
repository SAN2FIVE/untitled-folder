const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Handle preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(bodyParser.json({ limit: '50mb' })); // Increase limit for Base64 files
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Helper to read data
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return { notices: [], students: [] };
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- API Endpoints ---

// Get all notices
app.get('/api/notices', (req, res) => {
    try {
        const data = readData();
        res.json(data.notices);
    } catch (error) {
        res.status(500).json({ message: "Error reading notices" });
    }
});

// Post a new notice
app.post('/api/notices', (req, res) => {
    try {
        const { title, dept, data, type, date } = req.body;
        if (!title || !data) {
            return res.status(400).json({ message: "Title and file data are required" });
        }

        const db = readData();
        const newNotice = {
            id: Date.now(),
            title,
            dept,
            data,
            type,
            date
        };

        db.notices.unshift(newNotice);
        writeData(db);

        res.status(201).json(newNotice);
    } catch (error) {
        res.status(500).json({ message: "Error saving notice" });
    }
});

// Delete a notice
app.delete('/api/notices/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const db = readData();
        db.notices = db.notices.filter(n => n.id !== id);
        writeData(db);
        res.json({ message: "Notice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notice" });
    }
});

// Post student login
app.post('/api/students', (req, res) => {
    try {
        const { name, dept } = req.body;
        if (!name || !dept) {
            return res.status(400).json({ message: "Name and Dept are required" });
        }

        const db = readData();
        const newStudent = {
            id: Date.now(),
            name,
            dept,
            loginTime: new Date().toISOString()
        };

        if (!db.students) db.students = [];
        db.students.push(newStudent);
        writeData(db);

        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: "Error saving student data" });
    }
});

// Get all students (for admin)
app.get('/api/students', (req, res) => {
    try {
        const data = readData();
        res.json(data.students || []);
    } catch (error) {
        res.status(500).json({ message: "Error reading students" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
