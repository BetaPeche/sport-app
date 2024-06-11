import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_URL_API}/api/auth/token`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                )
                if (response.ok) {
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error('Error validating token:', error)
            } finally {
                setIsLoading(false)
            }
        }

        validateToken()
    }, [])

    if (isLoading) {
        return
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
