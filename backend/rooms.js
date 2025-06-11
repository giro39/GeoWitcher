const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('./db');

const authenticateToken = require('./jwtMiddleware');

router.post('/create', authenticateToken, (req, res) => {
    const { mode } = req.body;
    const user = req.user;

    console.log("1 userId:", user.id);

    try {
        // create a new room
        const stmtRoom = db.prepare(`INSERT INTO rooms (
                mode, curr_round, status, id_map
            ) VALUES (
                ?, 0, 0, 0
            )
        `);
        
        const roomAddResult = stmtRoom.run(mode);
        console.log(roomAddResult); // delete this later
        const roomId = roomAddResult.lastInsertRowid;
    
        console.log("userId:", user.id);
        console.log("roomId:", roomId);
    
        // add user to the new room
        const stmtUserRoom = db.prepare(`INSERT INTO users_rooms 
            (id_room, id_user, health) VALUES (?, ?, ?)
        `);
        stmtUserRoom.run(roomId, user.id, 6000); // 6000 health might be set by room creator in settings
    
        const updatedUser = { ...user, roomId };
        const token = jwt.sign(
            updatedUser, 
            process.env.JWT_SECRET
        ); // not adding the expiration time because it already has one

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })
    
        return res.status(201).json({ roomId });
    }
    catch (error) {
        console.error("Room creation error:", error);
        return res.status(500).json({ error: "Failed to create room" });
    }
});


router.post('/join', authenticateToken, (req, res) => {
    const { roomId } = req.body;
    const user = req.user;

    const room = db.prepare('SELECT * FROM rooms WHERE id_room = ?').get(roomId);
    if (!room) {
        return res.status(404).json({ error: "Room not found" });
    }

    const userCount = db.prepare('SELECT COUNT(*) as count FROM users_rooms WHERE id_room = ?').get(roomId).count;
    if (userCount >= 2) {
        return res.status(400).json({ error: "Room is full (max 2 players)" });
    }

    const userInRoom = db.prepare('SELECT * FROM users_rooms WHERE id_room = ? AND id_user = ?').get(roomId, user.id);
    if (userInRoom) {
        return res.status(400).json({ error: "User already is in this room" });
    }

    const stmt = db.prepare('INSERT INTO users_rooms (id_room, id_user, health) VALUES (?, ?, ?)');
    stmt.run(roomId, user.id, 6000);

    // update token as in creation of the room
    const updatedUser = { ...user, roomId };
    const token = jwt.sign(updatedUser, process.env.JWT_SECRET);

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({ message: "Joined room", roomId });
})

module.exports = router;