import { Link } from 'react-router-dom'

const root: HTMLElement | null = document.getElementById('root')
if (root) {
    root.className = 'columns-1'
}

const Home = () => {
    return (
        <>
            <Link to={'/dashboard'}>Dashboard</Link>
        </>
    )
}

export default Home
