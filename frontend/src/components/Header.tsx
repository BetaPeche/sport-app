import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <h1>
                <Link to={'/'}>My SPORT APP</Link>
            </h1>
            <div className="header_user">
                Loïc <i className="fa-regular fa-face-smile"></i>
            </div>
        </header>
    )
}

export default Header
