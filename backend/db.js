const Database = require('better-sqlite3');

const db = new Database('./geowitcher_db.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        username TEXT UNIQUE,
        password_hash TEXT,
        verification_token TEXT,
        is_verified INTEGER DEFAULT 0
    )
`).run();


module.exports = db;