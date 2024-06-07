import { useEffect, useState } from 'react'

type InfoBarProps = {
    name: string
    value: string | number
    color: string
}

const InfoBar: React.FC<InfoBarProps> = ({ name, value, color }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const handleLoad = () => {
            setIsLoaded(true)
        }
        window.addEventListener('load', handleLoad)

        return () => {
            window.removeEventListener('load', handleLoad)
        }
    }, [])

    const progressBarStyle = {
        '--progress-width': isLoaded ? `${value}%` : '0%',
    } as React.CSSProperties

    return (
        <div className="statistics__item">
            <div className="statistics__label">{name}</div>
            <div className="statistics__progress">
                <div
                    className={`statistics__progress-bar statistics__progress-bar--${color}`}
                    style={progressBarStyle}
                ></div>
                <div className="statistics__progress-value">{value}%</div>
            </div>
        </div>
    )
}

export default InfoBar
