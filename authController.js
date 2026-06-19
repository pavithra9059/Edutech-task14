const bcrypt = require("bcryptjs");

const User =
require("../models/User");

const registerUser =
async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        const existingUser =
        await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message:
                "Email already exists"
            });
        }

        const hashedPassword =
        await bcrypt.hash(password, 12);

        const user =
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message:
            "Registration Successful",
            userId: user._id
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    registerUser
};
