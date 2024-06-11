import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Profil from './pages/Profil'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'

function RootClassManager() {
    const location = useLocation()

    useEffect(() => {
        const root = document.getElementById('root')
        if (root) {
            switch (location.pathname) {
                case '/':
                    root.className = 'columns-1'
                    break
                case '/signup':
                    root.className = 'columns-1'
                    break
                case '/login':
                    root.className = 'columns-1'
                    break
                default:
                    root.className = 'columns-2'
                    break
            }
        }
    }, [location])

    return null
}

function App() {
    return (
        <BrowserRouter>
            <RootClassManager />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute redirectPath="/login" />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
                {/* Autres routes ici */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
