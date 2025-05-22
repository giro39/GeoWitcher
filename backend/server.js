const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./auth');

require('dotenv').config();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});