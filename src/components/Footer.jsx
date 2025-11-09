import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link to="/about" className="hover:text-slate-900">About us</Link></li>
              <li><Link to="/projects" className="hover:text-slate-900">Projects</Link></li>
              <li><Link to="/services" className="hover:text-slate-900">Services</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Products</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link to="/products" className="hover:text-slate-900">VRF / VRV Systems</Link></li>
              <li><Link to="/products" className="hover:text-slate-900">Ductable ACs</Link></li>
              <li><Link to="/products" className="hover:text-slate-900">AHU / FCU / Valves</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link to="/contact" className="hover:text-slate-900">Contact</Link></li>
              <li><a href="#" className="hover:text-slate-900">Privacy</a></li>
              <li><a href="#" className="hover:text-slate-900">Terms</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Get in touch</h3>
            <p className="mt-3 text-sm text-slate-600">Call us for a free consultation.</p>
            <a href="tel:+919650110202" className="mt-2 inline-block font-semibold text-slate-900 hover:text-primary-700">+91 9650110202</a>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-xs text-slate-500">© {new Date().getFullYear()} TheSmartHVAC. All rights reserved.</div>
      </div>
    </footer>
  )
}

