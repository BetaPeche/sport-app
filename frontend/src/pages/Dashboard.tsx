import Header from '../components/Header'
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
    ReferenceLine,
    Label,
} from 'recharts'
import Navigation from '../components/Navigation'
import InfoBar from '../components/InfoBar'
import DataModal from '../components/DataModal'
import { useEffect, useState } from 'react'
import useUserDataStore from '../userStore'

type DataItem = {
    date: Date
    weight: number | null
    muscularMass: number | null
    water: number | null
    visceralFat: number | null
    protein: number | null
}

const Dashboard = () => {
    const { data, setData } = useUserDataStore()
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

    const processParsedData = (data: DataItem[]) => {
        return data.map((item) => ({
            ...item,
            date: new Date(item.date).getTime(),
        }))
    }

    const parsedData = processParsedData(data)
    const validWeights = data
        .filter((item) => item.weight !== null)
        .map((item) => item.weight || 0)
    const minWeight = Math.min(...validWeights)
    const maxWeight = Math.max(...validWeights)

    function roundToNearestFiveUp(num: number): number {
        return Math.ceil(num / 5) * 5
    }

    function roundToNearestFiveDown(num: number): number {
        return Math.floor(num / 5) * 5
    }

    let roundedMinWeight = roundToNearestFiveDown(minWeight)
    let roundedMaxWeight = roundToNearestFiveUp(maxWeight)

    if (roundedMinWeight - minWeight > -2.5) {
        roundedMinWeight -= 5
    }
    if (roundedMaxWeight - maxWeight < 2.5) {
        roundedMaxWeight += 5
    }

    const renderLineChart = (
        <ResponsiveContainer width="100%" height={380}>
            <AreaChart
                data={parsedData}
                margin={{ top: 20, right: 26, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#165DFF"
                            stopOpacity={0.5}
                        />
                        <stop
                            offset="95%"
                            stopColor="#165DFF"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis
                    tickMargin={10}
                    stroke={'#fff'}
                    dataKey="date"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(tick) =>
                        new Date(tick).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                        })
                    }
                    scale="time"
                    axisLine={false}
                    interval="preserveStartEnd"
                    fontSize={12}
                />
                <YAxis
                    unit=" Kg"
                    tickMargin={5}
                    axisLine={false}
                    stroke={'#fff'}
                    domain={[roundedMinWeight, roundedMaxWeight]}
                    tickLine={false}
                    fontSize={12}
                    tickCount={(roundedMaxWeight - roundedMinWeight) / 5 + 1}
                />
                <CartesianGrid
                    stroke="#fff"
                    strokeDasharray="5"
                    vertical={false}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(28, 28, 28, 0.9)',
                        borderRadius: '5px',
                        color: '#fff',
                    }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`${value} Kg`, 'Poids']}
                    labelFormatter={(label) =>
                        new Date(label).toLocaleDateString()
                    }
                />
                <Area
                    type="monotone"
                    dataKey="weight"
                    stroke="#165DFF"
                    strokeWidth="3"
                    fill="url(#gradient)"
                    animationDuration={1000}
                />
                <ReferenceLine
                    y={78}
                    ifOverflow="hidden"
                    stroke="red"
                    strokeWidth={2}
                >
                    <Label
                        value="Objectif"
                        position="insideBottomLeft"
                        fill="white"
                        fontSize={14}
                        offset={10}
                        style={{
                            textShadow: '1px 1px 3px #000',
                            fontWeight: 500,
                        }}
                    />
                </ReferenceLine>
            </AreaChart>
        </ResponsiveContainer>
    )

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
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
                            <div className="dashboard__card">
                                <i className="fa-solid fa-fire"></i>
                                <div className="card__info">
                                    <h3>Besoin calorique :</h3>
                                    <p>2700 Kcal</p>
                                </div>
                            </div>
                            <div className="dashboard__card">
                                <i className="fa-regular fa-address-card"></i>
                                <div className="card__info">
                                    <h3>Age :</h3>
                                    <p>33 ans</p>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard__cards-group">
                            <div className="dashboard__card">
                                <i className="fa-solid fa-ruler"></i>
                                <div className="card__info">
                                    <h3>Taille :</h3>
                                    <p>183 cm</p>
                                </div>
                            </div>
                            <div className="dashboard__card">
                                <i className="fa-solid fa-leaf"></i>
                                <div className="card__info">
                                    <h3>IMC :</h3>
                                    <p>21.5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {renderLineChart}
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
                            name="Graisse corporelle"
                            value={30}
                            color="purple"
                        />
                        <InfoBar
                            name="Masse musculaire"
                            value={70}
                            color="green"
                        />
                        <InfoBar name="Eau" value={50} color="blue" />
                        <InfoBar
                            name="Graise viscérale"
                            value={70}
                            color="red"
                        />
                        <InfoBar name="Protéine" value={17} color="orange" />
                    </div>
                </section>
                <DataModal isOpen={modalIsOpen} onRequestClose={closeModal} />
            </main>
        </>
    )
}

export default Dashboard
