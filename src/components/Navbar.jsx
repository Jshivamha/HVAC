import { Link, NavLink } from 'react-router-dom';
import { Fan, Phone } from 'lucide-react';

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'text-primary-700' : 'text-slate-600 hover:text-slate-900'
    }`;

  return (
    <>
      {/* Desktop Navigation */}
      <header className="hidden lg:block sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <Fan className="h-6 w-6 text-primary-600" />
                <span className="text-lg font-semibold text-slate-900">TheSmartHVAC</span>
              </Link>
            </div>
            <nav className="flex items-center gap-1">
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
              <NavLink 
                to="/contact" 
                className="ml-2 inline-flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors"
              >
                <Phone className="h-4 w-4" /> Contact
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
