const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sport-app',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        resource_type: 'auto',
    },
})

const upload = multer({ storage: storage })

module.exports = upload
