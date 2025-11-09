export default function Services() {
  const services = [
    {
      title: 'HVAC Design & Consultancy',
      desc: 'Load calculations, equipment selection, controls and automation.'
    },
    {
      title: 'Turnkey Installation',
      desc: 'End-to-end implementation for ductable, VRF/VRV, AHU/FCU systems.'
    },
    {
      title: 'Retrofits & Optimization',
      desc: 'Upgrade existing central plants for higher efficiency and better IAQ.'
    },
  ]
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Services</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
