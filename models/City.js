const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {type: String},
    lat: {type: Number, required: true},
    lon: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

module.exports = mongoose.model('City', citySchema)