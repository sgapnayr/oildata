const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OilSchema = new Schema({
    oilBarrels: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
}, { timestamps: true, collection: 'Oil Data' })

module.exports = mongoose.model('Oil', OilSchema)