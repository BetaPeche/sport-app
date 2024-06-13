type LoaderProps = {
    center?: boolean
}
const Loader: React.FC<LoaderProps> = ({ center }) => {
    return (
        <div className={`spinner ${center && 'loader-center'}`}>
            <div className="spinner1"></div>
        </div>
    )
}

export default Loader
