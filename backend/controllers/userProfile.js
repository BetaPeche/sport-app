const UserProfile = require('../models/userProfile')

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
    UserProfile.updateOne({ userId: req.params.userId }, { ...req.body })
        .then(() => res.status(200).json({ message: 'Données mises à jour !' }))
        .catch((error) => res.status(400).json({ error }))
}
