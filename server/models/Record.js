const { Schema, model } = require('mongoose')

const Record = new Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    }
})

module.exports = model("Record", Record)