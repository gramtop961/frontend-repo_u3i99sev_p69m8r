import { Settings } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 bg-neutral-950/80 border-b border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold tracking-tight">DOT.BATAME</a>
        <nav className="flex items-center gap-4">
          <a href="#work" className="text-sm text-neutral-300 hover:text-white">Work</a>
          <a href="#blog" className="text-sm text-neutral-300 hover:text-white">Blog</a>
          <a href="#contact" className="text-sm text-neutral-300 hover:text-white">Contact</a>
          <a
            href="#admin"
            className="inline-flex items-center gap-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm px-3 py-1.5 border border-neutral-700"
            title="Admin"
          >
            <Settings size={16} /> Admin
          </a>
        </nav>
      </div>
    </header>
  )
}
