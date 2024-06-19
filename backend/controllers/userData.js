const UserData = require('../models/userData')

exports.postUserData = (req, res) => {
    const userData = new UserData(req.body)

    if (
        !userData.userId ||
        !userData.date ||
        !userData.weight ||
        !userData.muscularMass ||
        !userData.water ||
        !userData.visceralFat ||
        !userData.protein
    ) {
        return res
            .status(400)
            .json({ error: 'Tous les champs sont obligatoires' })
    }

    userData
        .save()
        .then(() => res.status(201).json({ message: 'Données enregistrées !' }))
        .catch((error) => res.status(400).json({ error }))
}

exports.getUserData = (req, res) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    UserData.find({
        userId: req.params.userId,
        date: { $gt: thirtyDaysAgo },
    })
        .then((userData) => res.status(200).json(userData))
        .catch((error) => res.status(404).json({ error }))
}
