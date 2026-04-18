import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import TemplateSelector from './pages/TemplateSelector.jsx'
import FormPage from './pages/FormPage.jsx'
import Navbar from './components/Navbar.jsx'
import AdSlot from './components/AdSlot.jsx'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex-1 w-full flex justify-center">
        <div className="flex-1 flex justify-center items-start gap-6 2xl:gap-10 w-full max-w-[1760px] px-0 xl:px-6 2xl:px-10">
          <AdSlot position="left" />
          <div key={location.pathname} className="page-fade flex-1 min-w-0 w-full">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/templates" element={<TemplateSelector />} />
              <Route path="/form/:template" element={<FormPage />} />
            </Routes>
          </div>
          <AdSlot position="right" />
        </div>
      </div>
    </div>
  )
}
