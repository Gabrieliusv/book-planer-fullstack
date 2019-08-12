const express = require('express');
const connectDB = require('./db');

const app = express();

//Connect Database
connectDB();

//Bodyparser Middleware
app.use(express.json({ extended: false }));

//Use Routes
app.use('/api/character', require('./routes/api/character'));
app.use('/api/storys', require('./routes/api/storys'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
