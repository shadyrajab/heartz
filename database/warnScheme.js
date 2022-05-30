const { model, Schema } = require('mongoose')

module.exports = warnScheme = model('warns',
    new Schema({
        userid: {type: Number},
        warns: {type: Number}
    })
) 