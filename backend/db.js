const Database = require('better-sqlite3');

const db = new Database('./geowitcher_db.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        username TEXT UNIQUE,
        password_hash TEXT
    )
`).run();

module.exports = db;