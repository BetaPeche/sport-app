import { useState } from 'react'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        let errorMessage = ''

        switch (true) {
            case email === '' || password === '':
                errorMessage = 'Veuillez remplir tous les champs'
                break
            default:
                break
        }

        setError(errorMessage)

        if (errorMessage === '') {
            try {
                setLoading(true)
                const response = await fetch(
                    `${import.meta.env.VITE_URL_API}/api/auth/login`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    localStorage.setItem('userId', data.userId)
                    localStorage.setItem('token', data.token)
                    navigate('/dashboard')
                } else {
                    setError("Informations d'identification incorrectes")
                }
            } catch (error) {
                setError('Une erreur réseau est survenue')
            }
            setLoading(false)
        }
    }

    return (
        <main className="login">
            <h1>Connexion</h1>
            <form autoComplete="off">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <span>{error}</span>}
                {loading ? (
                    <Loader />
                ) : (
                    <Button
                        text="Connexion"
                        color={true}
                        action={handleSubmit}
                    />
                )}
            </form>
            <Link to={'/'}>Retour</Link>
        </main>
    )
}

export default Login
