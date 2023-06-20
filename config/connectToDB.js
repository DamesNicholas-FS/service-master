if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');

async function connect () {
    try {
        await mongoose.connect(process.env.URL)
        console.log('Connected to database');
    } catch (err) {
        console.error(err);
    }
    
}

module.exports = connect;