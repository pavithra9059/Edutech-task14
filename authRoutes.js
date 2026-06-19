const express = require("express");

const router = express.Router();

const { body } =
require("express-validator");

const validate =
require("../middleware/validationMiddleware");

const {
    registerUser
} = require("../controllers/authController");

router.post(
"/register",

[
body("name")
.notEmpty()
.trim()
.escape()
.withMessage(
"Name is required"
),

body("email")
.isEmail()
.normalizeEmail()
.withMessage(
"Valid email required"
),

body("password")
.isLength({ min: 8 })
.matches(/[A-Z]/)
.matches(/[a-z]/)
.matches(/[0-9]/)
.matches(/[!@#$%^&*]/)
.withMessage(
"Password must contain uppercase, lowercase, number and special character"
)
],

validate,
registerUser
);

module.exports = router;
