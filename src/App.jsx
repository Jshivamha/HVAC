import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import MobileNav from './components/MobileNav'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import './index.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      <Navbar />
      <MobileNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
