import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import TemplateSelector from './pages/TemplateSelector.jsx'
import FormPage from './pages/FormPage.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen text-slate-100 flex flex-col">
      <Navbar />
      <div key={location.pathname} className="page-fade flex-1 w-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/templates" element={<TemplateSelector />} />
          <Route path="/form/:template" element={<FormPage />} />
        </Routes>
      </div>
    </div>
  )
}
