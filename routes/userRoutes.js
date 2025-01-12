const express = require('express');
const router = express.Router();
const { registerUsers, loginUser, currentUser } = require('../controllers/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

// router.post("/register", registerUsers);

// router.post("/login", loginUser);

// router.get("/current", currentUser);
router.route('/register').post(registerUsers);
router.route('/login').post(loginUser);
router.route('/current').get(validateTokenHandler,currentUser);

// router.route('/').get(getContacts).post(createContact);
// router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);



module.exports = router;