const UserProfile = require('../models/userProfile')
const cloudinary = require('cloudinary').v2
const upload = require('../middleware/multer-config')

exports.postUserProfile = (req, res) => {
    const userprofile = new UserProfile(req.body)

    if (
        !userprofile.userId ||
        !userprofile.activity ||
        !userprofile.age ||
        !userprofile.gender ||
        !userprofile.height ||
        !userprofile.name ||
        !userprofile.objectiveWeight
    ) {
        return res
            .status(400)
            .json({ error: 'Tous les champs sont obligatoires' })
    }

    if (req.file) {
        cloudinary.uploader.upload(req.file.path, (error, result) => {
            if (error) {
                console.error(
                    "Erreur lors du téléchargement de l'image sur Cloudinary:",
                    error
                )
                return res
                    .status(500)
                    .json({ error: "Erreur lors du téléchargement de l'image" })
            }
            userprofile.imageUrl = result.secure_url

            userprofile
                .save()
                .then(() =>
                    res.status(201).json({ message: 'Données enregistrées !' })
                )
                .catch((error) => res.status(400).json({ error }))
        })
    } else {
        userprofile
            .save()
            .then(() =>
                res.status(201).json({ message: 'Données enregistrées !' })
            )
            .catch((error) => res.status(400).json({ error }))
    }
}

exports.getUserProfile = (req, res) => {
    UserProfile.findOne({ userId: req.params.userId })
        .then((userprofile) => res.status(200).json(userprofile))
        .catch((error) => res.status(404).json({ error }))
}

exports.updateUserProfile = (req, res) => {
    const userId = req.params.userId
    let updateData = { ...req.body }

    if (req.file) {
        cloudinary.uploader.upload(req.file.path, (error, result) => {
            if (error) {
                console.error(
                    "Erreur lors du téléchargement de l'image sur Cloudinary:",
                    error
                )
                return res
                    .status(500)
                    .json({ error: "Erreur lors du téléchargement de l'image" })
            }
            updateData.imageUrl = result.secure_url
            UserProfile.updateOne({ userId: userId }, updateData)
                .then(() =>
                    res.status(200).json({ message: 'Données mises à jour !' })
                )
                .catch((error) => res.status(400).json({ error }))
        })
    } else {
        UserProfile.updateOne({ userId: userId }, updateData)
            .then(() =>
                res.status(200).json({ message: 'Données mises à jour !' })
            )
            .catch((error) => res.status(400).json({ error }))
    }
}
