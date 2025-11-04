export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-400 flex items-center justify-between">
        <p>© {new Date().getFullYear()} DOT.BATAME</p>
        <p className="text-neutral-500">Built with React + FastAPI</p>
      </div>
    </footer>
  )
}
