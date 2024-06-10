import { Link } from 'react-router-dom'
import Button from '../components/Button'

const root: HTMLElement | null = document.getElementById('root')
if (root) {
    root.className = 'columns-1'
}

const Home = () => {
    return (
        <main className="home">
            <h1>Outil de suivi du poids et de la composition corporelle</h1>
            <div className="main__buttons">
                <Link to="/signup">
                    <Button text="Inscription" color={false} />
                </Link>
                <Link to="/dashboard">
                    <Button text="Connexion" color={true} />
                </Link>
            </div>
        </main>
    )
}

export default Home
