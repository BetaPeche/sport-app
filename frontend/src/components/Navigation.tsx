import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/dashboard"
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
                        to="/"
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
                        to="/settings"
                        className={(nav) =>
                            nav.isActive ? 'navigation_li--active' : ''
                        }
                    >
                        <i className="fa-solid fa-gear"></i>
                        Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
