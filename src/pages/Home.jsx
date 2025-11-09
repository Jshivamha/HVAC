import { Link } from 'react-router-dom'
import { ShieldCheck, Wrench, Sparkles, Clock, Phone } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:gap-12 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              One stop solution for all things HVAC
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Design-centric, energy-efficient HVAC for malls, hospitals, offices, warehouses and more.
              We reduce both CAPEX and OPEX with precise load calculations, controls and automation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-3 text-white shadow hover:bg-primary-700">
                <Phone className="h-5 w-5" /> Talk to our design engineer
              </Link>
              <Link to="/projects" className="inline-flex items-center rounded-md px-5 py-3 text-primary-700 ring-1 ring-primary-200 hover:bg-primary-50">
                View Projects
              </Link>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:flex-1">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-sky-200/60 to-sky-100/40 shadow-inner" />
          </div>
        </div>
      </section>

      {/* 4I Process */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">Our 4I process</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Interact', icon: ShieldCheck, desc: 'We listen and study drawings to tailor your HVAC requirements.' },
            { title: 'Innovate & Design', icon: Sparkles, desc: 'Energy-efficient design to reduce CAPEX and OPEX.' },
            { title: 'Install', icon: Wrench, desc: 'Certified teams install under design engineer supervision.' },
            { title: 'Impress', icon: Clock, desc: 'Stringent QA before handover, on-time delivery.' },
          ].map(({ title, icon: Icon, desc }) => (
            <div key={title} className="rounded-xl border bg-white p-6 shadow-sm">
              <Icon className="h-6 w-6 text-primary-600" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">Why choose us</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Energy-efficient HVAC design',
              'Lowest price guaranteed',
              'Seamless communication',
              '1-year default warranty',
            ].map((item) => (
              <div key={item} className="rounded-xl border bg-white p-6 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-primary-600" />
                <p className="mt-3 text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid (sample) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Products & categories</h2>
          <Link to="/products" className="text-sm font-medium text-primary-700">Browse all</Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {['VRF / VRV Systems', 'Ductable AC', 'AHU / FCU', 'Valves & Accessories'].map((c) => (
            <div key={c} className="rounded-xl border p-6 shadow-sm hover:shadow">
              <h3 className="text-lg font-semibold text-slate-900">{c}</h3>
              <p className="mt-2 text-sm text-slate-600">High efficiency, trusted brands, expert selection.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects teaser */}
      <section className="bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border bg-white p-8 shadow-sm lg:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">A preview of our projects</h3>
                <p className="mt-2 text-slate-600">
                  Embassy retrofits, malls, hotels, hospitals, IT parks and more across major cities.
                </p>
              </div>
              <Link to="/projects" className="inline-flex items-center rounded-md bg-primary-600 px-5 py-3 text-white hover:bg-primary-700">
                Explore Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-sky-600 p-8 text-white shadow-sm lg:p-12">
          <h3 className="text-2xl font-semibold">Ready to lower your HVAC costs?</h3>
          <p className="mt-2 opacity-90">Talk to our design engineers and get a tailored plan.</p>
          <Link to="/contact" className="mt-6 inline-block rounded-md bg-white px-5 py-3 font-medium text-sky-700 hover:bg-slate-100">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
