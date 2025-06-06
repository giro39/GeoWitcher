const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const openPaths = [
        "/api/auth/register",
        "/api/auth/login",
        "/api/auth/forgot-password",
        "/api/auth/reset-password",
        "/api/auth/verify"
    ];
    
    if (openPaths.includes(req.path)) {
        return next();
    }

    const token = req.cookies && req.cookies.token;

    if (!token) return res.status(401).json({ error: "No JWT token" });

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch {
        return res.status(403).json({ error: "Invalid JWT token" });
    }
};

module.exports = authenticateToken;
