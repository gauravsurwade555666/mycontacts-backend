const asyncHandler = require("express-async-handler");

//@desc get all contact
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async  (req, res) => {
    res.status(200).json({ message: 'get all contacts' });
});

//@desc Create New contact
//@route POST /api/contacts
//@access Public
const createContact =asyncHandler(async  (req, res) => {
    console.log("here is the contact",req.body);
    const { name, email, phone, type } = req.body;
    if(!name || !email || !phone){
        // return res.status(400).json({ message: 'Please enter all fields' });
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    res.status(201).json({ message: 'create contact' });
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async  (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
});



module.exports = {getContacts,createContact,getContact,deleteContact,updateContact};