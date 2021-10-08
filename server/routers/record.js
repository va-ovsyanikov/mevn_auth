const router = require('express').Router()
const passport = require('passport');
const { record } = require('../controllers')
const { check } = require('express-validator');
const multer = require('multer');




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploads = multer(
    {
        storage,
        fileFilter
    }
).single("image")



router.get("/api/",passport.authenticate('jwt', {session:false}), record.fetchAll)

router.get("/api/:id",passport.authenticate('jwt', {session:false}), record.fetchOne)

router.post("/api/add",passport.authenticate('jwt', {session:false}), uploads, [
    check('image').custom((value, { req }) => value === req.files).withMessage("Image field is not empty"),
    check('name')
        .trim()
        .notEmpty()
        .withMessage("Name field is not empty"),
    check('phone')
        .trim().notEmpty()
        .withMessage("Phone field is not empty")
        .isNumeric()
        .withMessage("Number only"),
    check('email')
        .trim()
        .notEmpty()
        .withMessage("Email field is not empty")
        .isEmail()
        .withMessage("Invalid Email"),
], record.create)

router.patch("/api/edit/:id",passport.authenticate('jwt', {session:false}), uploads, [
    check('name')
        .trim()
        .notEmpty()
        .withMessage("Name field is not empty"),
    check('phone')
        .trim().notEmpty()
        .withMessage("Phone field is not empty")
        .isNumeric()
        .withMessage("Number only"),
    check('email')
        .trim()
        .notEmpty()
        .withMessage("Email field is not empty")
        .isEmail()
        .withMessage("Invalid Email"),
], record.update)

router.delete("/api/delete/:id",passport.authenticate('jwt', {session:false}), record.delete)


module.exports = router