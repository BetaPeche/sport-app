import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useEffect, useState } from 'react'

const root: HTMLElement | null = document.getElementById('root')
if (root) {
    root.className = 'columns-1'
}

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true)
        }
    }, [])

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
