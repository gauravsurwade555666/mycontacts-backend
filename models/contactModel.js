const mongoose = require('mongoose');




const contactSchema = mongoose.Schema({
    //whenver you want to create a contact it should be associated with a user,
    //so that on get call we can contact list of particular user
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a user id'],
        ref: 'User'
    }
    ,
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number']
       
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema);