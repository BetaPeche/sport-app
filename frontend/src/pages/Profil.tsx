import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Loader from '../components/Loader'

type FormData = {
    name: string
    age: string
    height: string
    gender: string
    activity: string
    objectiveWeight: string
}

const Profil: React.FC = () => {
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [haveProfil, setHaveProfil] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        age: '',
        height: '',
        gender: '2',
        activity: '3',
        objectiveWeight: '',
    })

    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await fetch(
                    `${import.meta.env.VITE_URL_API}/user/profil/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const data = await response.json()
                if (data) {
                    setHaveProfil(true)
                    setFormData({
                        name: data.name,
                        age: data.age,
                        height: data.height,
                        gender: data.gender,
                        activity: data.activity,
                        objectiveWeight: data.objectiveWeight,
                    })
                }
            } catch (error) {
                console.error(error)
            }
            setLoading(false)
        }
        fetchData()
    }, [id, token])

    const blockInvalidChar = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault()
        }
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let errorMessage = ''

        switch (true) {
            case formData.name === '' ||
                formData.age === '' ||
                formData.height === '' ||
                formData.objectiveWeight === '':
                errorMessage = 'Veuillez remplir tous les champs'
                break
            default:
                break
        }

        setError(errorMessage)

        if (errorMessage === '') {
            try {
                setLoading(true)
                if (haveProfil) {
                    await fetch(
                        `${import.meta.env.VITE_URL_API}/user/profil/${id}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                userId: id,
                                name: formData.name,
                                age: formData.age,
                                height: formData.height,
                                gender: formData.gender,
                                activity: formData.activity,
                                objectiveWeight: formData.objectiveWeight,
                            }),
                        }
                    )
                } else {
                    await fetch(`${import.meta.env.VITE_URL_API}/user/profil`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: id,
                            name: formData.name,
                            age: formData.age,
                            height: formData.height,
                            gender: formData.gender,
                            activity: formData.activity,
                            objectiveWeight: formData.objectiveWeight,
                        }),
                    })
                }
            } catch (error) {
                setError('Une erreur réseau est survenue')
            }
            setHaveProfil(true)
            setLoading(false)
        }
    }

    return (
        <>
            <Header />
            <Navigation />
            <main className="profil">
                <h2>Profil</h2>
                <form onSubmit={handleSubmit}>
                    <img src="./profil_base.webp" alt="Profile" />
                    <div className="form__input">
                        <label htmlFor="name">Prénom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Ex: "John"'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__input">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder='Ex: "30"'
                            onKeyDown={blockInvalidChar}
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__input">
                        <label htmlFor="height">
                            Taille <span>(en centimètres)</span>
                        </label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            placeholder='Ex: "180"'
                            onKeyDown={blockInvalidChar}
                            value={formData.height}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__input">
                        <label htmlFor="gender">Sexe</label>
                        <select
                            name="gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="1">Femme</option>
                            <option value="2">Homme</option>
                        </select>
                    </div>
                    <div className="form__input">
                        <label htmlFor="activity">Activité physique</label>
                        <select
                            name="activity"
                            id="activity"
                            value={formData.activity}
                            onChange={handleChange}
                        >
                            <option value="1">Sédentaire</option>
                            <option value="2">Légère</option>
                            <option value="3">Modérée</option>
                            <option value="4">Intense</option>
                        </select>
                    </div>
                    <div className="form__input">
                        <label htmlFor="objectiveWeight">
                            Poids objectif <span>(en kilogrammes)</span>
                        </label>
                        <input
                            type="number"
                            id="objectiveWeight"
                            name="objectiveWeight"
                            placeholder='Ex: "75"'
                            value={formData.objectiveWeight}
                            onChange={handleChange}
                        />
                    </div>
                    <span>{error}</span>
                    {loading ? (
                        <Loader />
                    ) : (
                        <Button text="Enregistrer" color={true} />
                    )}
                </form>
            </main>
        </>
    )
}

export default Profil
