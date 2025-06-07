const Database = require('better-sqlite3');

const db = new Database('./geowitcher_db.db');

// Users
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        username TEXT UNIQUE,
        password_hash TEXT,
        verification_token TEXT,
        reset_token TEXT,
        is_verified INTEGER DEFAULT 0
    )
`).run();

// Rooms
db.prepare(`
    CREATE TABLE IF NOT EXISTS rooms (
        id_room INTEGER PRIMARY KEY AUTOINCREMENT,
        mode TEXT,
        curr_round INTEGER,
        status INTEGER,
        id_map INTEGER,
        FOREIGN KEY (id_map) REFERENCES maps(id_map)
    )
`).run();
// status 0 - not started
// status 1 - started

// Users_rooms
db.prepare(`
    CREATE TABLE IF NOT EXISTS users_rooms (
        id_room INTEGER,
        id_user INTEGER,
        health INTEGER,
        PRIMARY KEY (id_room, id_user),
        FOREIGN KEY (id_room) REFERENCES rooms(id_room),
        FOREIGN KEY (id_user) REFERENCES users(id)
    )
`).run();

// Maps
db.prepare(`
    CREATE TABLE IF NOT EXISTS maps (
        id_map INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT
    )
`).run();

// Locations
db.prepare(`
    CREATE TABLE IF NOT EXISTS locations (
        id_location INTEGER PRIMARY KEY AUTOINCREMENT,
        id_map INTEGER,
        coordX REAL,
        coordY REAL,
        compass_offset INTEGER,
        FOREIGN KEY (id_map) REFERENCES maps(id_map)
    )
`).run();

// Rounds
db.prepare(`
    CREATE TABLE IF NOT EXISTS rounds (
        id_room INTEGER,
        id_user INTEGER,
        round INTEGER,
        points INTEGER,
        location_id INTEGER,
        coordX_guess REAL,
        coordY_guess REAL,
        FOREIGN KEY (id_room) REFERENCES rooms(id_room),
        FOREIGN KEY (id_user) REFERENCES users(id),
        FOREIGN KEY (location_id) REFERENCES locations(location_id)
    )
`).run();

const createWhiteOrchardMap = db.prepare(`
  INSERT OR IGNORE INTO maps (id_map, name, image) 
  VALUES (0, 'White Orchard', 'white_orchard.jpg')
`);
createWhiteOrchardMap.run();

module.exports = db;