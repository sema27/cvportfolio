import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { CVBuilder } from './pages/CVBuilder'
import { Portfolio } from './pages/Portfolio'
import { PortfolioView } from './pages/PortfolioView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cv" element={<CVBuilder />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/view" element={<PortfolioView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
