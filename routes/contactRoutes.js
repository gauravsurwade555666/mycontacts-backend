const express = require('express');
const router = express.Router();
const {getContacts,createContact,getContact,deleteContact,updateContact }= require('../controllers/contactController');
const validateTokenHandler = require('../middleware/validateTokenHandler');
// router.route('/').get(getContacts)
// router.route('/').post(createContact)
// router.route('/:id').get(getContact)
// router.route('/:id').put(updateContact)
// router.route('/:id').delete(deleteContact)

// using validateTokenHandler middleware on all the routes
router.use(validateTokenHandler);  
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);



module.exports = router;