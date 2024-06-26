const UserProfile = require('../models/userProfile')
const { createWriteStream, getURL } = require('@vercel/blob')
const { v4: uuidv4 } = require('uuid')

exports.postUserProfile = async (req, res) => {
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
        try {
            const fileId = uuidv4()
            const filePath = `/images/${fileId}`
            const fileStream = createWriteStream({ path: filePath })
            fileStream.end(req.file.buffer)

            fileStream.on('finish', async () => {
                try {
                    const imageUrl = await getURL(filePath)
                    userprofile.imageUrl = imageUrl
                    await userprofile.save()
                    return res
                        .status(201)
                        .json({ message: 'Données enregistrées !' })
                } catch (error) {
                    return res
                        .status(500)
                        .json({
                            error: 'Erreur lors de la sauvegarde du fichier',
                        })
                }
            })

            fileStream.on('error', (error) => {
                return res
                    .status(500)
                    .json({ error: 'Erreur lors du téléchargement du fichier' })
            })
        } catch (error) {
            return res
                .status(500)
                .json({ error: 'Erreur lors du traitement du fichier' })
        }
    } else {
        try {
            await userprofile.save()
            res.status(201).json({ message: 'Données enregistrées !' })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

exports.getUserProfile = (req, res) => {
    UserProfile.findOne({ userId: req.params.userId })
        .then((userprofile) => res.status(200).json(userprofile))
        .catch((error) => res.status(404).json({ error }))
}

exports.updateUserProfile = async (req, res) => {
    const userId = req.params.userId
    let updateData = { ...req.body }

    if (req.file) {
        try {
            const fileId = uuidv4()
            const filePath = `/images/${fileId}`
            const fileStream = createWriteStream({ path: filePath })
            fileStream.end(req.file.buffer)

            fileStream.on('finish', async () => {
                try {
                    const imageUrl = await getURL(filePath)
                    updateData.imageUrl = imageUrl
                    await UserProfile.updateOne({ userId: userId }, updateData)
                    res.status(200).json({ message: 'Données mises à jour !' })
                } catch (error) {
                    res.status(500).json({
                        error: 'Erreur lors de la mise à jour des données',
                    })
                }
            })

            fileStream.on('error', (error) => {
                res.status(500).json({
                    error: 'Erreur lors du téléchargement du fichier',
                })
            })
        } catch (error) {
            res.status(500).json({
                error: 'Erreur lors du traitement du fichier',
            })
        }
    } else {
        try {
            await UserProfile.updateOne({ userId: userId }, updateData)
            res.status(200).json({ message: 'Données mises à jour !' })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
