const express = require('express')
const router = express.Router()
const { login } = require('../controllers')
const {check} = require('express-validator')

router.post("/api/login",[
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
], login)

module.exports = router