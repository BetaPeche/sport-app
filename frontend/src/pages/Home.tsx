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

const minPoids =
    Math.floor(Math.min(...data.map((item) => item.poids)) / 10) * 10
const maxPoids =
    Math.ceil(Math.max(...data.map((item) => item.poids)) / 10) * 10

const renderLineChart = (
    <ResponsiveContainer width="100%" height={320}>
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
                domain={[minPoids, maxPoids]}
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
const Home = () => {
    return (
        <>
            <Header />
            <nav>test</nav>
            <main>{renderLineChart}</main>
            <div className="left-menu">test</div>
        </>
    )
}

export default Home
