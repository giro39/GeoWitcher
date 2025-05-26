const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendVerificationEmail, sendPasswordResetEmail } = require('./mailer');
const db = require('./db');
const { error } = require('console');
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ error: 'All fields required.' });
    }
    try {
        const password_hash = await bcrypt.hash(password, 10);
        const verification_token = crypto.randomBytes(32).toString('hex');
        const stmt = db.prepare('INSERT INTO users (email, username, password_hash, verification_token) VALUES (?, ?, ?, ?)');
        stmt.run(email, username, password_hash, verification_token);

        await sendVerificationEmail(email, verification_token);

        res.status(201).json({ message: 'User registered! Please check your email to verify your account.' });
    } catch (err) {
        res.status(400).json({ error: 'Email or username already exists.' });
    }
});

router.get('/verify', (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).send('Verification token is required.');
    }

    const stmt = db.prepare('SELECT * FROM users WHERE verification_token = ?');
    const user = stmt.get(token);
    if (!user) {
        return res.status(400).send('Invalid or expired verification token.');
    }
    db.prepare('UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?').run(user.id);

    const tokenAfterVerify = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
        res.cookie('token', tokenAfterVerify, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'lax',
    });

    res.redirect(`${process.env.FRONTEND_URL}/`);

});

router.post('/login', async (req, res) => {
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
        if (!user.is_verified) {
            return res.status(403).json({ error: 'Account not verified. Please check your email.' });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // sameSite: 'lax',
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.get('/authcheck', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(200).json({ isAuth: false });
    }

    try {
        jwt.verify(token, JWT_SECRET);
        res.status(200).json({ isAuth: true });
    } catch {
        res.status(200).json({ isAuth: false });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'lax',
    });
    res.json({ message: 'Logged out successfully.' });
});

router.post('/forgot-password', async (req, res) => {
    const resetLinkSentMessage = "If the email exists, a reset link was sent. It can take up to few minutes.";

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required.' });

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(200).json({ message: resetLinkSentMessage });

    const reset_token = crypto.randomBytes(32).toString('hex');
    db.prepare('UPDATE users SET reset_token = ? WHERE id = ?').run(reset_token, user.id);

    await sendPasswordResetEmail(email, reset_token);

    res.status(200).json({ message: resetLinkSentMessage});
});

router.post('/reset-password', async (req, res) => {
    const {token, password} = req.body;
    if (!token || !password) return res.status(400).json({ error: "Token and new password required" });

    const user = db.prepare("SELECT * FROM users WHERE reset_token = ?").get(token);
    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    const password_hash = await bcrypt.hash(password, 10);
    db.prepare("UPDATE users SET password_hash = ?, reset_token = NULL WHERE id = ?").run(password_hash, user.id);

    res.status(200).json({ message: "Password reset successful. You can log in now." });
});


module.exports = router;