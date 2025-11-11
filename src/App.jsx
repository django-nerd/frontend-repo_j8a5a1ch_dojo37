import { useEffect, useState } from 'react'
import Navbar from './Navbar'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-2 max-w-3xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export default function App() {
  const [school, setSchool] = useState([])
  const [departments, setDepartments] = useState([])
  const [extracurriculars, setExtracurriculars] = useState([])
  const [osis, setOsis] = useState([])
  const [events, setEvents] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    try {
      const endpoints = ['school','departments','extracurriculars','osis','events','news']
      const [s, d, ex, o, ev, n] = await Promise.all(
        endpoints.map((e) => fetch(`${API}/${e}`).then(r => r.json()))
      )
      setSchool(s)
      setDepartments(d)
      setExtracurriculars(ex)
      setOsis(o)
      setEvents(ev)
      setNews(n)
    } catch (e) {
      // Try to seed then refetch
      try { await fetch(`${API}/seed`, { method: 'POST' }) } catch {}
      try {
        const [s, d, ex, o, ev, n] = await Promise.all([
          fetch(`${API}/school`).then(r => r.json()),
          fetch(`${API}/departments`).then(r => r.json()),
          fetch(`${API}/extracurriculars`).then(r => r.json()),
          fetch(`${API}/osis`).then(r => r.json()),
          fetch(`${API}/events`).then(r => r.json()),
          fetch(`${API}/news`).then(r => r.json()),
        ])
        setSchool(s); setDepartments(d); setExtracurriculars(ex); setOsis(o); setEvents(ev); setNews(n)
      } catch {}
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(99,102,241,0.12),transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                {school[0]?.name || 'SMA Negeri Nusantara'}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {school[0]?.tagline || 'Berkarakter, Berprestasi, Berbudaya'}
              </p>
              <p className="mt-4 text-gray-600 max-w-2xl">{school[0]?.description || 'Selamat datang di website sekolah.'}</p>
              <div className="mt-6 flex gap-3">
                <a href="#departemen" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">Jelajahi</a>
                <a href="#kontak" className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition">Hubungi Kami</a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-white">
                <img src={school[0]?.hero_image || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop'} alt="Hero" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <Section id="departemen" title="Departemen" subtitle="Struktur jurusan dan bidang studi di sekolah.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((d, i) => (
            <div key={i} className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-sm hover:shadow-md">
              <h3 className="font-semibold text-gray-900">{d.name}</h3>
              <p className="text-sm text-gray-600 mt-1">Kepala: {d.head || '-'}</p>
              <p className="text-sm text-gray-600 mt-2">{d.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Extracurricular */}
      <Section id="ekskul" title="Ekstrakurikuler" subtitle="Kegiatan siswa untuk mengembangkan minat dan bakat.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {extracurriculars.map((ex, i) => (
            <div key={i} className="p-5 rounded-xl border border-gray-200 hover:border-emerald-300 transition bg-white shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{ex.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{ex.schedule || 'Jadwal'}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{ex.description}</p>
              <p className="text-sm text-gray-500 mt-2">Pembina: {ex.mentor || '-'}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OSIS */}
      <Section id="osis" title="OSIS" subtitle="Struktur organisasi siswa intra sekolah.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {osis.map((m, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100" />
              <div className="p-4">
                <h4 className="font-semibold text-gray-900">{m.name}</h4>
                <p className="text-sm text-blue-700">{m.role}</p>
                <p className="text-xs text-gray-500 mt-1">{m.class_name}</p>
                {m.bio && <p className="text-sm text-gray-600 mt-2">{m.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Events */}
      <Section id="event" title="Event" subtitle="Agenda kegiatan sekolah dan OSIS.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <div key={i} className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{e.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{e.category || 'event'}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{e.date} • {e.location || 'Sekolah'}</p>
              <p className="text-sm text-gray-600 mt-2">{e.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* News */}
      <Section id="berita" title="Berita" subtitle="Informasi dan publikasi terbaru.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((n, i) => (
            <article key={i} className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
              {n.image ? (
                <img src={n.image} alt={n.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="h-40 bg-gradient-to-r from-gray-100 to-gray-200" />
              )}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{n.title}</h3>
                {n.summary && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{n.summary}</p>}
                <p className="text-xs text-gray-500 mt-2">{n.author || 'Humas Sekolah'}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="kontak" title="Kontak" subtitle="Kirim pesan Anda kepada kami.">
        <ContactForm />
      </Section>

      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-500">
          © {new Date().getFullYear()} SMA Negeri Nusantara. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus('')
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      if (res.ok) {
        setStatus('Pesan terkirim. Terima kasih!')
        setName(''); setEmail(''); setMessage('')
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus(`Gagal mengirim: ${data.detail || res.status}`)
      }
    } catch (e) {
      setStatus('Terjadi kesalahan jaringan.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 max-w-3xl">
      <input value={name} onChange={e=>setName(e.target.value)} required placeholder="Nama" className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Email" className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <textarea value={message} onChange={e=>setMessage(e.target.value)} required placeholder="Pesan" className="sm:col-span-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]" />
      <div className="sm:col-span-2 flex items-center gap-3">
        <button disabled={submitting} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50">{submitting ? 'Mengirim...' : 'Kirim Pesan'}</button>
        {status && <p className="text-sm text-gray-600">{status}</p>}
      </div>
    </form>
  )
}
