require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const userDataRoutes = require('./routes/userData')

mongoose
    .connect(process.env.DB_LINK)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use(
    cors({
        origin: ['https://sport-app-eosin.vercel.app', 'http://localhost:5173'],
        methods: ['POST', 'GET', 'PUT'],
        credentials: true,
    })
)

app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/user', userDataRoutes)

app.get('/', (req, res) => {
    res.json('Ready to go !')
})

module.exports = app
