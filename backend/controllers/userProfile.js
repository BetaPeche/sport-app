const UserProfile = require('../models/userProfile')
const { createWriteStream, getURL } = require('@vercel/blob')
const { v4: uuidv4 } = require('uuid')

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
        const imagePath = `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
        }`
        userprofile.imageUrl = imagePath
    }

    userprofile
        .save()
        .then(() => res.status(201).json({ message: 'Données enregistrées !' }))
        .catch((error) => res.status(400).json({ error }))
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
        const fileId = uuidv4()
        const fileStream = createWriteStream({ path: `/images/${fileId}` })
        fileStream.end(req.file.buffer, async (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: 'Erreur lors du téléchargement du fichier' })
            }
            const imageUrl = await getURL(fileStream.path)
            updateData.imageUrl = imageUrl

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
