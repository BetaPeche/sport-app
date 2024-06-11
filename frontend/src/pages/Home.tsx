import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useEffect, useState } from 'react'

const root: HTMLElement | null = document.getElementById('root')
if (root) {
    root.className = 'columns-1'
}

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_URL_API}/api/auth/token`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                )
                if (response.ok) {
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error('Error validating token:', error)
            } finally {
                setIsLoading(false)
            }
        }
        if (localStorage.getItem('token')) {
            validateToken()
        } else {
            setIsLoading(false)
            setIsAuthenticated(false)
        }
    }, [])

    if (isLoading) {
        return
    }

    return (
        <main className="home">
            <h1>Outil de suivi du poids et de la composition corporelle</h1>
            {isAuthenticated ? (
                <Link to="/dashboard">
                    <Button text="Mon Dashboard" color={true} />
                </Link>
            ) : (
                <div className="main__buttons">
                    <Link to="/signup">
                        <Button text="Inscription" color={false} />
                    </Link>
                    <Link to="/login">
                        <Button text="Connexion" color={true} />
                    </Link>
                </div>
            )}
        </main>
    )
}

export default Home
