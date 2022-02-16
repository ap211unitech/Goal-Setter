// Environmental Variables
require('dotenv').config();

// Database Connection
const { dbConnect } = require("./config/connect");
dbConnect();

const express = require('express');
const app = express();

// Custom Error Handler
const { errHandler } = require('./middleware/errorMiddleware')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error Handler
app.use(errHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})