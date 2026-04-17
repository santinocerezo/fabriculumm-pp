import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import TemplateSelector from './pages/TemplateSelector.jsx'
import FormPage from './pages/FormPage.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/templates" element={<TemplateSelector />} />
        <Route path="/form/:template" element={<FormPage />} />
      </Routes>
    </div>
  )
}
