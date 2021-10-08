const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {validationResult } = require('express-validator');





module.exports = {

    //REGISTER
    register: async function (req, res) {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({
                errors: errors.array()
            })
        }
        const candidate = await User.findOne({ email: req.body.email })
        if (candidate) {
            //Пользователь существует, отдаем ошибку
            res.status(409).send({
                notice: {
                    message: "User with this email exists"
                },
                
            })
        } else {
            // Создаем пользователя
            try {
              
                const password = req.body.password
                const salt = bcrypt.genSaltSync(10);
                const user = await new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(password, salt)
                })
                user.save()
                console.log(user)
                res.status(201).send({
                    notice: {
                        message: "User created successfully. Sign in!",
                        type: "success",
                    },
                    user
                })
            } catch (error) {
                res.status(400).send({
                    notice: {
                        message: "Error user not created",
                    },
                })
            }
        }
    },




//LOGIN
    login: async function (req,res) {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({
                errors: errors.array()
            })
        }
        const candidate = await User.findOne({ email: req.body.email })
        if (candidate) {
            // Проверка прошла, пользователь существует
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if (passwordResult) {
                //Пароли совпали, генерация токена
                const token = jwt.sign({
            
                    email: candidate.email,
                    userId: candidate._id
                }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
                res.status(200).send({
                    name:candidate.name,
                    token: `Bearer ${token}`,
                    notice:{
                        message:"User found. Login allowed",
                        type:"success"
                    }

                })
            } else {
                //Пароли не совпали
                res.status(401).send({
                    notice:{
                        message: "Password was not sniffed"
                    }
                })
            }
        } else {
            //Пользователя нет, ошибка
            res.status(404).send({
                notice:{
                    message: "User with smart email does not exist"
                }
            })
        }
    }

}


