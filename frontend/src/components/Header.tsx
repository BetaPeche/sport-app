import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
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
