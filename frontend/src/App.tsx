import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Profil from './pages/Profil'

function RootClassManager() {
    const location = useLocation()

    useEffect(() => {
        const root = document.getElementById('root')
        if (root) {
            switch (location.pathname) {
                case '/':
                    root.className = 'columns-1'
                    break
                // case '/dashboard':
                //     root.className = 'columns-3'
                //     break
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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profil" element={<Profil />} />
                {/* Autres routes ici */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
