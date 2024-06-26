import { useState } from 'react'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const Register = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const regexEmail = new RegExp('^[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}$')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let errorMessage = ''

        switch (true) {
            case email === '' || password === '' || passwordConfirm === '':
                errorMessage = 'Veuillez remplir tous les champs'
                break
            case !email.match(regexEmail):
                errorMessage = 'Email invalide'
                break
            case password.length < 8:
                errorMessage =
                    'Le mot de passe doit contenir au moins 8 caractères'
                break
            case password !== passwordConfirm:
                errorMessage = 'Les mots de passe ne correspondent pas'
                break
            default:
                break
        }

        setError(errorMessage)

        if (errorMessage === '') {
            try {
                setLoading(true)
                const response = await fetch(
                    `${import.meta.env.VITE_URL_API}/api/auth/signup`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    }
                )

                if (response.ok) {
                    const responseConnect = await fetch(
                        `${import.meta.env.VITE_URL_API}/api/auth/login`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email, password }),
                        }
                    )
                    if (responseConnect.ok) {
                        const data = await responseConnect.json()
                        localStorage.setItem('userId', data.userId)
                        localStorage.setItem('token', data.token)
                        navigate('/dashboard')
                    }
                    navigate('/dashboard')
                } else {
                    setError("Une erreur est survenue lors de l'inscription")
                }
                console.log(response)
            } catch (error) {
                setError('Une erreur réseau est survenue')
            }
            setLoading(false)
        }
    }

    return (
        <main className="register">
            <h1>Inscription</h1>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">
                    Mot de passe (8 caractères minimum)
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Confirmer le mot de passe</label>
                <input
                    type="password"
                    name="password-confirm"
                    id="password-confirm"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                {error && <span>{error}</span>}
                {loading ? (
                    <Loader />
                ) : (
                    <Button text="S'inscrire" color={true} />
                )}
            </form>
            <Link to={'/'}>Retour</Link>
        </main>
    )
}

export default Register
