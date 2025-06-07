const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');

const authRouter = require('./auth');
const roomsRouter = require('./rooms');

const authenticateToken = require('./jwtMiddleware');

require('dotenv').config();

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
});

io.on('connection', socket => {
    console.log('New client connected', socket.id);
})

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});