import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import useUserDataStore from '../userDataStore'
import Header from '../components/Header'
import InfoBar from '../components/InfoBar'
import DataModal from '../components/DataModal'
import Chart from '../components/Chart'
import Card from '../components/Card'
import useUserProfilStore from '../userProfilStore'

const Dashboard = () => {
    const { data, setData } = useUserDataStore()
    const { profil } = useUserProfilStore()
    const [modalIsOpen, setIsOpen] = useState<boolean>(false)
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')

    useEffect(() => {
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
        fetchData()
    }, [setData, token, id])

    const lastData = data[data.length - 1]

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Header />
            <Navigation />
            <main className="dashboard">
                <section className="dashboard__main">
                    <h2>Dashboard</h2>
                    <div className="dashboard__cards">
                        <div className="dashboard__cards-group">
                            <Card
                                title="Besoin calorique :"
                                content="2700 Kcal"
                                className="fa-solid fa-fire"
                            />
                            <Card
                                title="Age :"
                                content={`${profil?.age || 0} ans`}
                                className="fa-regular fa-address-card"
                            />
                        </div>
                        <div className="dashboard__cards-group">
                            <Card
                                title="Taille :"
                                content={`${profil?.height || 0} cm`}
                                className="fa-solid fa-ruler"
                            />
                            <Card
                                title="IMC :"
                                content="21.5"
                                className="fa-solid fa-leaf"
                            />
                        </div>
                    </div>
                    <Chart data={data} />
                </section>
                <section className="dashboard__statistics">
                    <button
                        onClick={openModal}
                        className="dashboard__add-data-button"
                    >
                        <i className="fa-solid fa-plus"></i>
                        Ajouter des données
                    </button>
                    <div className="statistics__group">
                        <InfoBar
                            name="Masse musculaire"
                            value={(lastData && lastData.visceralFat) || 0}
                            color="green"
                        />
                        <InfoBar
                            name="Eau"
                            value={(lastData && lastData.water) || 0}
                            color="blue"
                        />
                        <InfoBar
                            name="Graise viscérale"
                            value={(lastData && lastData.visceralFat) || 0}
                            color="red"
                        />
                        <InfoBar
                            name="Protéine"
                            value={(lastData && lastData.protein) || 0}
                            color="orange"
                        />
                    </div>
                </section>
                <DataModal isOpen={modalIsOpen} onRequestClose={closeModal} />
            </main>
        </>
    )
}

export default Dashboard
