const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('./db');
const { error } = require('console');

router.post('/created-new-room', async (req, res) => {
    const { mode } = req.body;

    const stmt = db.prepare(`INSERT INTO rooms (
            mode, curr_round, status, id_map
        ) VALUES (
            ?, 0, 0, 0
        )
    `);
    stmt.run(mode);

    return res.status(200);
});

router.post('/joined-room', async (req, res) => {

});

module.exports = router;