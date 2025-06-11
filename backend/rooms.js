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


module.exports = router;