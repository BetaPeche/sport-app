import { useState } from 'react'
import Navigation from '../components/Navigation'
import useUserDataStore from '../userDataStore'
import Header from '../components/Header'
import InfoBar from '../components/InfoBar'
import DataModal from '../components/DataModal'
import Chart from '../components/Chart'
import Card from '../components/Card'
import useUserProfilStore from '../userProfilStore'

const Dashboard = () => {
    const { data } = useUserDataStore()
    const { profil } = useUserProfilStore()
    const [modalIsOpen, setIsOpen] = useState<boolean>(false)

    const lastData = data[data.length - 1]

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    let imc = 0

    if (lastData?.weight && profil?.height) {
        imc =
            lastData.weight / ((profil?.height / 100) * (profil?.height / 100))
    }

    let calory = 0

    if (
        lastData?.weight &&
        profil?.height &&
        profil?.age &&
        profil?.gender &&
        profil?.activity
    ) {
        if (profil.gender == 1) {
            calory =
                (10 * lastData.weight +
                    6.25 * profil.height -
                    5 * profil.age -
                    161) *
                profil.activity
        } else if (profil.gender == 2) {
            calory =
                (10 * lastData.weight + 6.25 * profil.height - 5 * profil.age) *
                profil.activity
        }
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
                                content={`${Math.round(calory)} kcal`}
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
                                content={imc.toFixed(1)}
                                className="fa-solid fa-leaf"
                            />
                        </div>
                    </div>
                    {data[0] && <Chart data={data} />}
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
