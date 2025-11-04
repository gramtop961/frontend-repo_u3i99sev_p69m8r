import { useEffect, useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Card({ title, subtitle, meta }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 hover:bg-neutral-900 transition-colors">
      <h3 className="font-semibold tracking-tight">{title}</h3>
      {subtitle && <p className="text-sm text-neutral-300 mt-1 line-clamp-2">{subtitle}</p>}
      {meta && <p className="text-xs text-neutral-400 mt-2">{meta}</p>}
    </div>
  )
}

export default function Sections() {
  const [posts, setPosts] = useState([])
  const [projects, setProjects] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p1, p2] = await Promise.all([
          fetch(`${BASE_URL}/api/posts`).then(r => r.json()),
          fetch(`${BASE_URL}/api/projects`).then(r => r.json()),
        ])
        setPosts(Array.isArray(p1) ? p1 : [])
        setProjects(Array.isArray(p2) ? p2 : [])
      } catch (e) {
        setError('Unable to load latest content.')
      }
    }
    fetchAll()
  }, [])

  return (
    <main className="mx-auto max-w-6xl px-4">
      <section id="work" className="py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Latest Projects</h2>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <Card key={p._id} title={p.title} subtitle={p.summary} meta={p.category || p.client} />
          ))}
          {projects.length === 0 && (
            <p className="text-neutral-400">No projects yet. Add some in the admin panel.</p>
          )}
        </div>
      </section>

      <section id="blog" className="py-12 border-t border-neutral-900">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Recent Posts</h2>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <Card key={p._id} title={p.title} subtitle={p.excerpt} meta={Array.isArray(p.tags) ? p.tags.join(', ') : ''} />
          ))}
          {posts.length === 0 && (
            <p className="text-neutral-400">No posts yet. Create one in the admin panel.</p>
          )}
        </div>
        {error && <p className="text-rose-400 text-sm mt-3">{error}</p>}
      </section>

      <section id="contact" className="py-16 border-t border-neutral-900">
        <h2 className="text-2xl font-semibold">Let’s build something</h2>
        <p className="text-neutral-300 mt-2 max-w-2xl">
          Interested in collaborating or have a project in mind? Reach out and let’s turn ideas into polished experiences.
        </p>
        <a href="mailto:hello@example.com" className="mt-6 inline-block px-4 py-2 rounded-md bg-white text-neutral-900 font-medium">Contact</a>
      </section>
    </main>
  )
}
