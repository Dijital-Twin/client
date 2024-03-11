import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/landing/index.jsx";
import ScrollToTop from './components/ScrollToTop.jsx'
import './styles/output.css'
import { useAuthToken } from './utils/authservice.js';
import My from './pages/my/index.jsx'

function App() {

    useAuthToken();

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Toaster />
            <Navbar />
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='my' element={<My />} />
          </Routes>
            {/*<Footer />*/}
        </BrowserRouter>
    )
}

export default App