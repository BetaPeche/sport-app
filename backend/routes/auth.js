const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/token', auth, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
});

module.exports = router