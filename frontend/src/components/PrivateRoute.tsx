import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from './Loader'

interface PrivateRouteProps {
    redirectPath: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectPath }) => {
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
                } else {
                    localStorage.removeItem('token')
                    localStorage.removeItem('userId')
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.error('Error validating token:', error)
            } finally {
                setIsLoading(false)
            }
        }
        if (localStorage.getItem('token')) {
            validateToken()
        } else {
            setIsLoading(false)
            setIsAuthenticated(false)
        }
    }, [])

    if (isLoading) {
        return <Loader center={true} />
    }

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />
}

export default PrivateRoute
