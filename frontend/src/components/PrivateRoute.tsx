import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from './Loader'
import useUserDataStore from '../userDataStore'
import useUserProfilStore from '../userProfilStore'

interface PrivateRouteProps {
    redirectPath: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectPath }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { setData } = useUserDataStore()
    const { setProfil } = useUserProfilStore()
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoading(true)
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
                        fetchProfil()
                        fetchData()
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
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_URL_API}/user/data/${id}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    const data = await response.json()

                    if (data) {
                        setData(data)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            const fetchProfil = async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_URL_API}/user/profil/${id}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    const data = await response.json()
                    if (data) {
                        setProfil(data)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            validateToken()
        } else {
            setIsLoading(false)
            setIsAuthenticated(false)
        }
    }, [token, id, setData, setIsAuthenticated, setIsLoading, setProfil])

    if (isLoading) {
        return <Loader center={true} />
    }

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />
}

export default PrivateRoute
