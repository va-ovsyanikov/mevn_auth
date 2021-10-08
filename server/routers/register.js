const router = require('express').Router()
const { register } = require('../controllers')
const { check } = require('express-validator')

router.post("/api/register", [
    check('name')
        .trim()
        .notEmpty()
        .withMessage('Name field is not empty'),
    check('email')
        .trim()
        .notEmpty()
        .withMessage("Email field is not empty")
        .isEmail()
        .withMessage("Invalid Email"),
    check('password')
        .trim()
        .notEmpty()
        .withMessage("Password field is not empty")
        .isLength({ min: 5 })
        .withMessage("Minimum 5 characters")
], register);

module.exports = router