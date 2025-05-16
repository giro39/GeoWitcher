const express = require('express');
const app = express();
const port = 3000;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const JWT_SECRET = 'super_secret_i_wont_tell_you';

app.use(cors());
app.use(bodyParser.json());

const db = require('./db');

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ error: 'All fields required.' });
    }
    try {
        const password_hash = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)');
        stmt.run(email, username, password_hash);
        res.status(201).json({ message: 'User registered!' });
    } catch (err) {
        res.status(400).json({ error: 'Email or username already exists.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, username, password } = req.body;
    if ((!email && !username) || !password) {
        return res.status(400).json({ error: 'Email or username and password required.' });
    }
    try {
        let user;
        if (email) {
            const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
            user = stmt.get(email);
        } else {
            const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
            user = stmt.get(username);
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});