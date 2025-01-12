const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Register a user
//@route POST /api/users
//@access Public
const registerUsers = asyncHandler(async (req, res) => {
    // res.json({ message: "register user" });
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error('User already exists');
    }
    //hask password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword

    });
    console.log(`User created: ${user}`);
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('user data is not available');
    }


});

//@desc login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const user = await User.findOne({ email });
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.JWT_SECRET, { expiresIn: '10m' });
        res.status(200).json({ accesToken })

    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

});


//@desc current user info
//@route POST /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {

    res.json(req.user);
});

module.exports = { registerUsers, loginUser, currentUser };