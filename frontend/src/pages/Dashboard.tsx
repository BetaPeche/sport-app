import Header from '../components/Header'
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
} from 'recharts'
import Navigation from '../components/Navigation'
import InfoBar from '../components/InfoBar'

const data = [
    { date: '01/03/24', poids: 80 },
    { date: '01/03/24', poids: 78 },
    { date: '01/03/24', poids: 90.5 },
    { date: '01/03/24', poids: 75 },
    { date: '01/03/24', poids: 81 },
    { date: '01/03/24', poids: 78 },
    { date: '01/03/24', poids: 75 },
    { date: '01/03/24', poids: 80 },
    { date: '01/03/24', poids: 88 },
    { date: '01/03/24', poids: 83 },
    { date: '01/03/24', poids: 82 },
]

const minWeight = Math.min(...data.map((item) => item.poids))
const maxWeight = Math.max(...data.map((item) => item.poids))

function roundToNearestFiveUp(num: number) {
    return Math.ceil(num / 5) * 5
}

function roundToNearestFiveDown(num: number) {
    return Math.floor(num / 5) * 5
}

let roundedMinWeight = roundToNearestFiveDown(minWeight)
let roundedMaxWeight = roundToNearestFiveUp(maxWeight)

if (roundedMinWeight === minWeight) {
    roundedMinWeight -= 5
}
if (roundedMaxWeight === maxWeight) {
    roundedMaxWeight += 5
}

const renderLineChart = (
    <ResponsiveContainer width="100%" height={380}>
        <AreaChart
            data={data}
            margin={{ top: 20, right: 26, left: 0, bottom: 0 }}
        >
            <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#165DFF" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#165DFF" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis
                tickMargin={10}
                stroke={'#fff'}
                dataKey="date"
                axisLine={false}
                interval={1}
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
            <CartesianGrid stroke="#fff" strokeDasharray="5" vertical={false} />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'rgba(28, 28, 28, 0.9)',
                    borderRadius: '5px',
                    color: '#fff',
                }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => [`${value} Kg`, 'Poids']}
            />
            <Area
                type="monotone"
                dataKey="poids"
                stroke="#165DFF"
                strokeWidth="3"
                fill="url(#gradient)"
                animationDuration={1000}
            />
        </AreaChart>
    </ResponsiveContainer>
)
const Dashboard = () => {
    // console.log(import.meta.env.VITE_URL_API)
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
                    <div className="div2">test</div>
                    <div className="statistics__group">
                        <InfoBar
                            name="Graisse corporelle"
                            value="30"
                            color="purple"
                        />
                        <InfoBar
                            name="Masse musculaire"
                            value="70"
                            color="green"
                        />
                        <InfoBar name="Eau" value="50" color="blue" />
                        <InfoBar
                            name="Graise viscérale"
                            value="70"
                            color="red"
                        />
                        <InfoBar name="Protéine" value="17" color="orange" />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Dashboard
