export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Contact us</h1>
      <p className="mt-2 text-slate-600">Call us at <a className="font-semibold text-primary-700" href="tel:+919650110202">+91 9650110202</a> or leave a message.</p>
      <form className="mt-6 grid gap-4">
        <input className="w-full rounded-md border px-4 py-2" placeholder="Name" />
        <input className="w-full rounded-md border px-4 py-2" type="email" placeholder="Email" />
        <textarea className="w-full rounded-md border px-4 py-2" rows="5" placeholder="Message" />
        <button type="button" className="inline-flex w-fit items-center rounded-md bg-primary-600 px-5 py-2.5 font-medium text-white hover:bg-primary-700">Send</button>
      </form>
    </div>
  )
}
