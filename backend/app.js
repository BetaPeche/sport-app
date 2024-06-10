require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const userRoutes = require('./routes/user')

mongoose.connect(process.env.DB_LINK)
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch((error) => console.log('Connexion à MongoDB échouée !'))


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
	next();
})

app.use(express.json())

app.use('/api/auth', userRoutes)

module.exports = app