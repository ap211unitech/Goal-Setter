require('dotenv').config();

const express = require('express');
const app = express();

const { errHandler } = require('./middleware/errorMiddleware')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/goals', require('./routes/goalRoutes'));

// Error Handler
app.use(errHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})