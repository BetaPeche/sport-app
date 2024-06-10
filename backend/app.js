require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors');
const userRoutes = require('./routes/user')

mongoose.connect(process.env.DB_LINK)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !'))

app.use(cors())

app.use(express.json())

app.use('/api/auth', userRoutes)

module.exports = app