import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Loader from '../components/Loader'
import useUserProfilStore from '../stores/userProfilStore'

type FormData = {
    name: string
    age: number | null
    height: number | null
    gender: number
    activity: number
    objectiveWeight: number | null
}

const Profil: React.FC = () => {
    const { profil, setProfil } = useUserProfilStore()
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        age: null,
        height: null,
        gender: 2,
        activity: 3,
        objectiveWeight: null,
    })

    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (profil) {
            setFormData({
                name: profil.name,
                age: profil.age,
                height: profil.height,
                gender: profil.gender,
                activity: profil.activity,
                objectiveWeight: profil.objectiveWeight,
            })
        }
    }, [profil])

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

        const processedValue =
            e.target.type === 'number' && value === '' ? null : value

        setFormData({
            ...formData,
            [name]: processedValue,
        })
    }
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setImage(file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let errorMessage = ''

        switch (true) {
            case formData.name === '' ||
                formData.age === null ||
                formData.height === null ||
                formData.objectiveWeight === null:
                errorMessage = 'Veuillez remplir tous les champs'
                break
            default:
                break
        }

        setError(errorMessage)

        if (errorMessage === '') {
            try {
                setLoading(true)
                const formDataToSend = new FormData()
                formDataToSend.append('userId', id as string)
                formDataToSend.append('name', formData.name)
                formDataToSend.append('age', formData.age?.toString() as string)
                formDataToSend.append(
                    'height',
                    formData.height?.toString() as string
                )
                formDataToSend.append('gender', formData.gender.toString())
                formDataToSend.append('activity', formData.activity.toString())
                formDataToSend.append(
                    'objectiveWeight',
                    formData.objectiveWeight?.toString() as string
                )

                if (image) {
                    formDataToSend.append('imageUrl', image)
                }

                const requestOptions: RequestInit = {
                    method: profil ? 'PUT' : 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formDataToSend,
                }

                const url = profil
                    ? `${import.meta.env.VITE_URL_API}/user/profil/${id}`
                    : `${import.meta.env.VITE_URL_API}/user/profil`

                await fetch(url, requestOptions)
                setProfil({
                    userId: id,
                    name: formData.name,
                    age: formData.age,
                    height: formData.height,
                    gender: formData.gender,
                    activity: formData.activity,
                    objectiveWeight: formData.objectiveWeight,
                    imageUrl:
                        previewUrl || profil?.imageUrl || './profil_base.webp',
                })
            } catch (error) {
                setError('Une erreur réseau est survenue')
            }
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
                    <div className="form__image">
                        <img
                            src={
                                previewUrl ||
                                profil?.imageUrl ||
                                './profil_base.webp'
                            }
                            alt="Profile Preview"
                        />
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            name="profil-image"
                            id="profil-image"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="profil-image">Modifier</label>
                    </div>
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
                            value={formData.age === null ? '' : formData.age}
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
                            value={
                                formData.height === null ? '' : formData.height
                            }
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
                            <option value="1.2">Sédentaire</option>
                            <option value="1.375">Légère</option>
                            <option value="1.55">Modérée</option>
                            <option value="1.725">Intense</option>
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
                            onKeyDown={blockInvalidChar}
                            value={
                                formData.objectiveWeight === null
                                    ? ''
                                    : formData.objectiveWeight
                            }
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
