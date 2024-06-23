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

type DataItem = {
    date: Date
    weight: number | null
    muscularMass: number | null
    water: number | null
    visceralFat: number | null
    protein: number | null
}
type ChartProps = {
    data: DataItem[]
}

const Chart: React.FC<ChartProps> = ({ data }) => {
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

    return (
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
}

export default Chart
