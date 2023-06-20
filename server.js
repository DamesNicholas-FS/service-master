if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const databaseConnection = require('./config/connectToDB');
//const NewTicket = require('./models/ticket');
const controller = require('./controllers/controller');
const cors = require('cors');
const app = express();

// Only for production builds on Heroku
if (process.env.NODE_ENV === 'production') {
    // Express will serve up assets
    // like main.js and main.css
    app.use(express.static('crud-react/index.html'));
    // Express will serve up the index.html
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    }); 
}

app.use(express.json());
app.use(cors());

databaseConnection();

app.get('/', controller.find);
app.get('/:id', controller.findById)
app.post('/new', controller.create);
app.patch('/:id' , controller.findByIdAndUpdate);
app.delete('/:id' , controller.findByIdAndDelete);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});