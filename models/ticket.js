const mongoose = require( "mongoose" );

const newTicketSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    title: String,
    description: String,
});

const NewTicket = mongoose.model('NewTicket', newTicketSchema);

module.exports = NewTicket;