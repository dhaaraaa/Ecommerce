const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Connect to the database
connectDatabase();

const app = express();
const products = require('./routes/product');
const orders = require('./routes/order');

app.use(express.json());
app.use(cors());
app.use('/api/v1/', products);
app.use('/api/v1/', orders); 

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/ecommerce/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './ecommerce/build/index.html'));
    });
}

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
