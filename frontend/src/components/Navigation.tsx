import { NavLink, useNavigate } from 'react-router-dom'
import useUserDataStore from '../stores/userDataStore'
import useUserProfilStore from '../stores/userProfilStore'
import buttonHeaderStore from '../stores/buttonHeaderStore'

const Navigation = () => {
    const navigate = useNavigate()
    const { removeDatas } = useUserDataStore()
    const { removeProfil } = useUserProfilStore()
    const { button, toggleButton } = buttonHeaderStore()

    return (
        <nav
            className={
                button === 'open' ? 'navigation__open' : 'navigation__close'
            }
        >
            <button onClick={toggleButton}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <ul>
                <li>
                    <NavLink
                        to="/dashboard"
                        onClick={toggleButton}
                        className={(nav) =>
                            nav.isActive ? 'navigation_li--active' : ''
                        }
                    >
                        <i className="fa-solid fa-house"></i>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profil"
                        onClick={toggleButton}
                        className={(nav) =>
                            nav.isActive ? 'navigation_li--active' : ''
                        }
                    >
                        <i className="fa-solid fa-user"></i>
                        Profil
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/"
                        className={(nav) =>
                            nav.isActive ? 'navigation_li--active' : ''
                        }
                        onClick={() => {
                            toggleButton(),
                                localStorage.removeItem('token'),
                                localStorage.removeItem('userId'),
                                removeDatas(),
                                removeProfil(),
                                navigate('/')
                        }}
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
