import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Fan, Phone } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'text-primary-700' : 'text-slate-600 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <Fan className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-semibold text-slate-900">TheSmartHVAC</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/projects" className={navLinkClass}>
              Projects
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className="ml-2 inline-flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
              <Phone className="h-4 w-4" /> Contact
            </NavLink>
          </nav>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="space-y-1 px-4 py-3">
            <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass} end>
              Home
            </NavLink>
            <div className="flex gap-2 flex-wrap">
              <NavLink to="/products" onClick={() => setOpen(false)} className={navLinkClass}>
                Products
              </NavLink>
              <NavLink to="/services" onClick={() => setOpen(false)} className={navLinkClass}>
                Services
              </NavLink>
              <NavLink to="/projects" onClick={() => setOpen(false)} className={navLinkClass}>
                Projects
              </NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
                <Phone className="h-4 w-4" /> Contact
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

