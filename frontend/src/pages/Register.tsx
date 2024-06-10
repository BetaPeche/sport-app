import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    // const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')

    const regexEmail = new RegExp('([A-Za-z]+)@([A-Za-z]+)\\.([A-Za-z]+)')
    const navigate = useNavigate()

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        let errorMessage = ''

        switch (true) {
            case email === '' || password === '':
                errorMessage = 'Veuillez remplir tous les champs'
                break
            case !email.match(regexEmail):
                errorMessage = 'Email invalide'
                break
            case password.length < 8:
                errorMessage =
                    'Le mot de passe doit contenir au moins 8 caractères'
                break
            default:
                break
        }

        setError(errorMessage)

        if (errorMessage === '') {
            navigate('/dashboard')
        }
    }

    return (
        <main className="register">
            <h1>Inscription</h1>
            <form autoComplete="off">
                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <span>{error}</span>}
                <Button text="S'inscrire" color={true} action={handleSubmit} />
            </form>
        </main>
    )
}

export default Register
