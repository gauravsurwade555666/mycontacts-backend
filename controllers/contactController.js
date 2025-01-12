const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
const Contact = require("../models/contactModel");

//@desc get all contact
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        // return res.status(400).json({ message: 'Please enter all fields' });
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const contact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        phone
    });
    res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: `Get contact for ${req.params.id}` });
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('Not authorized to access this contact');       
    }
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('Not authorized to update this contact');       
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    // res.status(200).json({ message: `Update contact for ${req.params.id}` });
    res.status(200).json(updateContact)
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: `Delete contact for ${req.params.id}` });
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    } 
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('Not authorized to delete this contact');       
    }
         await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
    // }

   
});



module.exports = { getContacts, createContact, getContact, deleteContact, updateContact };