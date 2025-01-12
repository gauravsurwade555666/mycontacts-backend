const express = require('express');
const router = express.Router();
const { registerUsers, loginUser, currentUser } = require('../controllers/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');


router.route('/register').post(registerUsers);
router.route('/login').post(loginUser);

// using validateTokenHandler middleware on only one routes
router.route('/current').get(validateTokenHandler,currentUser);





module.exports = router;