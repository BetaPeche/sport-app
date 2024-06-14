import { NavLink, useNavigate } from 'react-router-dom'

const Navigation = () => {
    const navigate = useNavigate()
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
                        to="/profil"
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
                            localStorage.removeItem('token'),
                                localStorage.removeItem('userId')
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
