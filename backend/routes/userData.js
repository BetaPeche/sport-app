const express = require('express')
const router = express.Router()
const userProfileCtrl = require('../controllers/userProfile')
const auth = require('../middleware/auth')

router.post('/profil', userProfileCtrl.postUserProfile)
router.get('/profil/:userId', auth, userProfileCtrl.getUserProfile)
router.put('/profil/:userId', auth, userProfileCtrl.updateUserProfile)

module.exports = router
