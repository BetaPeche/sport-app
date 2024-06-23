type CardProps = {
    title: string
    content: string | number
    className: string
}

const Card: React.FC<CardProps> = ({ title, content, className }) => {
    return (
        <div className="dashboard__card">
            <i className={className}></i>
            <div className="card__info">
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Card
