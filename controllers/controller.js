const NewTicket = require('../models/ticket');

// Show All The Tickets
const find = async(req, res) => {
    const notes = await NewTicket.find();
    res.json(notes);
}

// Show A Single Ticket
const findById = async(req, res) => {
    const { id } = req.params;
    const ticket = await NewTicket.findById(id);
    res.json(ticket);
}

// Create A New Ticket
const create = async(req, res) => {
    const { name, phone, title, description } = req.body;
    const newTicket = await NewTicket.create({name, phone, title, description});
    res.json({ message: 'Ticket created', ticket: newTicket });
}

// Update A Single Ticket
const findByIdAndUpdate = async(req, res) => {
    const { id } = req.params;
    const { name, phone, title, description } = req.body;
    await NewTicket.findByIdAndUpdate(id, {
        name,
        phone,
        title,
        description
    });
    const newTicketInfo = await NewTicket.findById(id);
    res.json({ message: 'Ticket updated', newTicketInfo });
}

// Delete A Single Ticket
const findByIdAndDelete = async(req, res) => {
    const { id } = req.params;
    const ticket = await NewTicket.findByIdAndDelete(id);
    res.json({ message: 'Ticket deleted', ticket });
}

module.exports = { find, findById, create, findByIdAndUpdate, findByIdAndDelete };