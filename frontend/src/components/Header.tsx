import { Link } from 'react-router-dom'
import buttonHeaderStore from '../stores/buttonHeaderStore'
import useUserProfilStore from '../stores/userProfilStore'

const Header = () => {
    const { toggleButton } = buttonHeaderStore()
    const { profil } = useUserProfilStore()
    return (
        <header>
            <button onClick={toggleButton}>
                <i className="fa-solid fa-bars"></i>
            </button>
            <h1>
                <Link to={'/'}>Follw</Link>
            </h1>
            <div className="header__user">
                <span>Loïc</span>
                <img
                    src={
                        profil?.imageUrl
                            ? profil?.imageUrl
                            : './profil_base.webp'
                    }
                    alt="Image de profil"
                />
            </div>
        </header>
    )
}

export default Header
