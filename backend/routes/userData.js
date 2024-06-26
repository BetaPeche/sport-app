const express = require('express')
const router = express.Router()
const userProfileCtrl = require('../controllers/userProfile')
const userDataCtrl = require('../controllers/userData')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/profil', multer, userProfileCtrl.postUserProfile)
router.get('/profil/:userId', auth, userProfileCtrl.getUserProfile)
router.put('/profil/:userId', auth, multer, userProfileCtrl.updateUserProfile)

router.post('/data', userDataCtrl.postUserData)
router.get('/data/:userId', auth, userDataCtrl.getUserData)

module.exports = router
