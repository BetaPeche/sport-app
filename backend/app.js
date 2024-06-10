require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const userRoutes = require('./routes/user')

mongoose.connect(process.env.DB_LINK)
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch((error) => console.log('Connexion à MongoDB échouée !'))


const corsOptions = {
	origin: ['https://sport-app-eosin.vercel.app', 'https://sport-app-gx5q.vercel.app'],
	methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
}
	
app.use(cors(corsOptions));

app.use(express.json())

app.use('/api/auth', userRoutes)

module.exports = app