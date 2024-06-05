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

const data = [
    { date: '01/03/24', poids: 80 },
    { date: '01/03/24', poids: 78 },
    { date: '01/03/24', poids: 90 },
    { date: '01/03/24', poids: 75 },
    { date: '01/03/24', poids: 81 },
    { date: '01/03/24', poids: 78 },
    { date: '01/03/24', poids: 75 },
    { date: '01/03/24', poids: 80 },
    { date: '01/03/24', poids: 88 },
    { date: '01/03/24', poids: 83 },
    { date: '01/03/24', poids: 82 },
]

const minWeight =
    Math.floor(Math.min(...data.map((item) => item.poids)) / 10) * 10
const maxWeight =
    Math.ceil(Math.max(...data.map((item) => item.poids)) / 10) * 10

const renderLineChart = (
    <ResponsiveContainer width="100%" height={350}>
        <AreaChart
            data={data}
            margin={{ top: 0, right: 26, left: 0, bottom: 0 }}
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
                domain={[minWeight, maxWeight]}
                tickLine={false}
                fontSize={12}
            />
            <CartesianGrid stroke="#fff" strokeDasharray="5" vertical={false} />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'rgba(28, 28, 28, 0.9)',
                    borderRadius: '5px',
                    color: '#fff',
                }}
                itemStyle={{ color: '#fff' }}
            />
            <Area
                type="monotone"
                dataKey="poids"
                stroke="#165DFF"
                strokeWidth="3"
                fill="url(#gradient)"
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
                    <div className="statistics__group">
                        <div className="statistics__item">
                            <div className="statistics__label">
                                Graisse corporelle
                            </div>
                            <div className="statistics__progress">
                                <div className="statistics__progress-bar statistics__progress-bar--fat"></div>
                                <div className="statistics__progress-value">
                                    30%
                                </div>
                            </div>
                        </div>
                        <div className="statistics__item">
                            <div className="statistics__label">
                                Masse musculaire
                            </div>
                            <div className="statistics__progress">
                                <div className="statistics__progress-bar statistics__progress-bar--muscle"></div>
                                <div className="statistics__progress-value">
                                    70%
                                </div>
                            </div>
                        </div>
                        <div className="statistics__item">
                            <div className="statistics__label">Eau</div>
                            <div className="statistics__progress">
                                <div className="statistics__progress-bar statistics__progress-bar--water"></div>
                                <div className="statistics__progress-value">
                                    50%
                                </div>
                            </div>
                        </div>
                        <div className="statistics__item">
                            <div className="statistics__label">
                                Graisse viscérale
                            </div>
                            <div className="statistics__progress">
                                <div className="statistics__progress-bar statistics__progress-bar--visceral-fat"></div>
                                <div className="statistics__progress-value">
                                    80%
                                </div>
                            </div>
                        </div>
                        <div className="statistics__item">
                            <div className="statistics__label">Protéine</div>
                            <div className="statistics__progress">
                                <div className="statistics__progress-bar statistics__progress-bar--protein"></div>
                                <div className="statistics__progress-value">
                                    17%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="div2">test</div>
                </section>
            </main>
        </>
    )
}

export default Dashboard
