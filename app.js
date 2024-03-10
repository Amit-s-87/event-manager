const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secretKey = 'your-secret-key';

const eventRouter = require('./routers/event');
const userRouter = require('./routers/user');

app.use('/events', eventRouter);
app.use('/users', userRouter);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is running on http://localhost:${port}`);
});



module.exports = app;