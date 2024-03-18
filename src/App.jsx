import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar.jsx'
import Landing from './pages/landing/index.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import './styles/output.css'
import { useAuthToken } from './utils/authservice.js'
import My from './pages/my/index.jsx'
import AI from './pages/ai/index.jsx'
import Talk from './pages/talk/index.jsx'

function App() {
    useAuthToken()

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Toaster />
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="ai" element={<AI />} />
                <Route path="my" element={<My />} />
                <Route path="talk" element={<Talk />} />
                {/* <Route path='login' element={<Login />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
