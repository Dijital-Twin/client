import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/landing/index.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from './components/ScrollToTop.jsx'
import './styles/output.css'
import Login from './pages/login/index.jsx'

function App() {
  return (
      <BrowserRouter>
          <ScrollToTop />
          <Toaster />
          <Navbar />
          <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='login' element={<Login />} />
          </Routes>
          {/*<Footer />*/}
      </BrowserRouter>
  )
}

export default App