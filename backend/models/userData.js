const mongoose = require('mongoose')

const userDataSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: { type: Date, required: true },
    weight: { type: Number },
    muscularMass: { type: Number },
    water: { type: Number },
    visceralFat: { type: Number },
    protein: { type: Number },
})

module.exports = mongoose.model('UserData', userDataSchema)
