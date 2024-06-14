import { useState, ChangeEvent, FormEvent } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Navigation from '../components/Navigation'

type FormData = {
    name: string
    age: string
    height: string
    gender: string
    activity: string
    objectiveWeight: string
}

const Profil: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: 'Loïc',
        age: '',
        height: '',
        gender: '1',
        activity: '1',
        objectiveWeight: '',
    })

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
        console.log(formData)
    }

    return (
        <>
            <Header />
            <Navigation />
            <main className="profil">
                <h2>Profil</h2>
                <form onSubmit={handleSubmit}>
                    <img src="./profil_base.webp" alt="Profile" />
                    <div>
                        <label htmlFor="name">Prénom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="height">
                            Taille <span>(en centimètres)</span>
                        </label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
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
                    <div>
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
                    <div>
                        <label htmlFor="objectiveWeight">
                            Poids objectif <span>(en kilogrammes)</span>
                        </label>
                        <input
                            type="number"
                            id="objectiveWeight"
                            name="objectiveWeight"
                            value={formData.objectiveWeight}
                            onChange={handleChange}
                        />
                    </div>
                    <Button text="Enregistrer" color={true} />
                </form>
            </main>
        </>
    )
}

export default Profil
