const { validationResult } = require('express-validator')
const fs = require('fs')

module.exports = (model) => {
    return {
        async fetchAll(req, res) {
            try {
                const users = await model.find()
                res.status(200).send(users)
            } catch (error) {
                res.status(400).send(error)
            }
        },
        async fetchOne(req, res) {
            try {
                const id = req.params.id
                const item = await model.findById(id)
                res.status(200).send({
                    item,
                    notice: {
                        message: "Record updated successfully",
                        type: "success",
                    }
                })
            } catch (error) {
                res.status(400).send(error)
            }
        },
        async create(req, res) {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    // validation
                    return res.status(400).send({
                        errors: errors.array()
                    })
                } else {
                    const itemNew = req.body
                    itemNew.image = req.file.filename

                    const newUser = await new model(itemNew).save()
                    res.status(200).send({
                        newUser,
                        notice: {
                            message: "Entry added successfully",
                            type: "success",
                        }
                    })
                }

            } catch (error) {
                res.status(400).send(error)
            }
        },



        async update(req, res) {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    // validation
                    return res.status(400).send({
                        errors: errors.array()
                    })
                } else {
                    let newImg = ""
                    if (req.file) {
                        newImg = req.file.filename
                        try {
                            fs.unlinkSync('./uploads/' + req.body.oldImage)
                        } catch (error) {
                            return console.log(error)
                        }
                    } else {
                        newImg = req.body.oldImage
                    }
                    const updateItem = req.body
                    updateItem.image = newImg
                    const id = req.params.id
                    const updateUser = await model.findByIdAndUpdate(id, updateItem, { new: true })
                    res.status(200).send({
                        updateUser,
                        notice: {
                            message: "Record updated successfully",
                            type: "success",
                        }
                    })
                }

            } catch (error) {
                res.status(400).send(error)
            }
        },




        async delete({ params: { id } }, res) {
            try {
                const itemDelete = await model.findByIdAndDelete(id)
                if (itemDelete.image != "") {
                    try {
                        fs.unlinkSync('./uploads/' + itemDelete.image)
                    } catch (error) {
                        console.log(error)
                    }
                }
                res.status(200).send({
                    itemDelete,
                    notice: {
                        message: "Entry successfully deleted",
                        type: "success",
                    }
                })
                // res.status(200).send(itemDelete)
            } catch (error) {
                res.status(400).send(error)
            }
        }

    }

}