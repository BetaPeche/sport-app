import { Link } from 'react-router-dom'
import buttonHeaderStore from '../stores/buttonHeaderStore'

const Header = () => {
    const { toggleButton } = buttonHeaderStore()
    return (
        <header>
            <button onClick={toggleButton}>
                <i className="fa-solid fa-bars"></i>
            </button>
            <h1>
                <Link to={'/'}>My SPORT APP</Link>
            </h1>
            <div className="header__user">
                <span>Loïc</span>
                <img src="./profil_base.webp" alt="Image de profil" />
            </div>
        </header>
    )
}

export default Header
