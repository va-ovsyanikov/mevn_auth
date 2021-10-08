const generecCRUD = require('./generic.controller')
const record = require('../models/Record')
module.exports = {
    ...generecCRUD(record)
}