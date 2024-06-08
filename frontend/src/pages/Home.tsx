import { Link } from 'react-router-dom'

const root: HTMLElement | null = document.getElementById('root')
if (root) {
    root.className = 'columns-1'
}

const Home = () => {
    return (
        <main className="home">
            <h1>Outil de suivi du poids et de la composition corporelle</h1>
            <div className="main__buttons">
                <Link to="/dashboard">
                    <button className="button">Inscription</button>
                </Link>
                <Link to="/dashboard">
                    <button className="button">
                        Connexion
                        <div className="hoverEffect">
                            <div></div>
                        </div>
                    </button>
                </Link>
            </div>
        </main>
    )
}

export default Home
