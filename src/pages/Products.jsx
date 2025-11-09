export default function Products() {
  const categories = [
    'Daikin VRV / LG VRF',
    'Ductable AC (Hitachi, Blue Star, Voltas)',
    'AHU / FCU (Zeco, Edgetech, Waves)',
    'Valves (Ball, Butterfly, Y Strainer)',
    'Insulations (Aeroflex, Aerolam, Twiga)',
    'Copper pipes & accessories',
  ]
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Products & Categories</h1>
      <p className="mt-2 text-slate-600">Curated HVAC equipment from leading brands.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c} className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{c}</h3>
            <p className="mt-2 text-sm text-slate-600">Learn more about specifications and best-fit use cases.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
