import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/:id" element={<Project />} />
                <Route path="*" element={<Home />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
