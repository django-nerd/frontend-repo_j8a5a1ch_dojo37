import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, School, Layers, Swords, Users, Calendar, Newspaper, Mail } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Beranda' },
    { to: '/departemen', label: 'Departemen' },
    { to: '/ekskul', label: 'Ekstrakurikuler' },
    { to: '/osis', label: 'OSIS' },
    { to: '/event', label: 'Event' },
    { to: '/berita', label: 'Berita' },
    { to: '/kontak', label: 'Kontak' },
  ]

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white grid place-items-center shadow-sm">
              <School size={20} />
            </div>
            <div className="">
              <p className="text-sm text-gray-500 leading-none">SMA Negeri</p>
              <p className="-mt-0.5 font-bold text-gray-900 leading-none">Nusantara</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink key={to} end to={to} className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'}`}>
                {label}
              </NavLink>
            ))}
          </nav>

          <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 grid gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink key={to} end to={to} onClick={() => setOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'}`}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
