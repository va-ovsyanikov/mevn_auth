const record = require('./record.controller')
const {register} = require('./auth.controller')
const {login} = require('./auth.controller')

module.exports = {
    record,
    register,
    login
}