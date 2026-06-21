const mongoose = require('mongoose');

async function dbConnection() {
    const DB_URL = process.env.MONGO_URI;

    if (!DB_URL) {
        console.error('MONGO_URI is not defined in environment variables.');
        return;
    }

    mongoose.connection.on('error', (err) => {
        console.error('Connection Error:', err);
    });

    mongoose.connection.once('open', () => {
        console.log('DB connected...');
    });

    try {
        await mongoose.connect(DB_URL, {
            serverSelectionTimeoutMS: 5000
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
}

module.exports = dbConnection;