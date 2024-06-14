const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userProfileSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	activity: { type: Number, required: true },
	age: { type: Number, required: true },
	gender: { type: Number, required: true },
	height: { type: Number, required: true },
	name: { type: String, required: true },
	objectiveWeight: { type: Number, required: true },
})

module.exports = mongoose.model('UserProfile', userProfileSchema)