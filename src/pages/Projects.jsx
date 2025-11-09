export default function Projects() {
  const projects = [
    'Central HVAC automation for embassy, New Delhi',
    'VRF implementation for hotel, Mumbai',
    'Lift lobby pressurization, Chennai',
    'Chiller plant and ductwork for mall, Ghaziabad',
    'AHU room automation for IT park, Kolkata',
    'Ventilation and air scrubbers for hospital, Hyderabad/Faridabad',
  ]
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
      <p className="mt-2 text-slate-600">A snapshot of our experience across industries and cities.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p} className="rounded-xl border bg-white p-5 text-sm text-slate-700 shadow-sm">{p}</li>
        ))}
      </ul>
    </div>
  )
}
