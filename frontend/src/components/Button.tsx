type ButtonProps = {
    text: string
    color: boolean
    action?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({ text, color, action }) => {
    return (
        <button onClick={action ? action : undefined} className="button">
            {text}
            {color && (
                <div className="hoverEffect">
                    <div></div>
                </div>
            )}
        </button>
    )
}

export default Button
