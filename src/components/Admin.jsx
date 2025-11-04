import { useEffect, useMemo, useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const ADMIN_KEY = 'dot_admin_key'
const ADMIN_PASSWORD = 'dotbatame'

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-neutral-300">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-600"
      />
    </label>
  )
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-neutral-300">{label}</span>
      <textarea
        {...props}
        className="mt-1 w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-600"
      />
    </label>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="text-neutral-300">{label}</span>
    </label>
  )
}

function SectionCard({ title, children, action }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
        <h3 className="font-medium">{title}</h3>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function RecentList({ type }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${BASE_URL}/api/${type}`).then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [type])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((it) => (
        <div key={it._id} className="rounded-lg border border-neutral-800 p-3">
          <div className="font-medium">{it.title}</div>
          {it.summary && <div className="text-sm text-neutral-400 mt-1 line-clamp-2">{it.summary}</div>}
          {it.excerpt && <div className="text-sm text-neutral-400 mt-1 line-clamp-2">{it.excerpt}</div>}
        </div>
      ))}
      {items.length === 0 && <p className="text-neutral-400">No items yet.</p>}
    </div>
  )
}

function PostForm() {
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', coverImage: '', tags: '', area: '', published: true })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      coverImage: form.coverImage || undefined,
    }
    try {
      const res = await fetch(`${BASE_URL}/api/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error(await res.text())
      setMsg('Post created!')
      setForm({ title: '', slug: '', excerpt: '', content: '', coverImage: '', tags: '', area: '', published: true })
    } catch (e) {
      setMsg('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <Input label="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
      </div>
      <Input label="Cover Image URL" value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })} />
      <Input label="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
      <Input label="Area" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} />
      <Textarea label="Excerpt" rows={3} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
      <Textarea label="Content" rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
      <div className="flex items-center justify-between">
        <Toggle label="Published" checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
        <button disabled={loading} className="px-4 py-2 rounded-md bg-white text-neutral-900 font-medium disabled:opacity-60">{loading ? 'Saving...' : 'Create Post'}</button>
      </div>
      {msg && <p className="text-sm text-neutral-300">{msg}</p>}
    </form>
  )
}

function ProjectForm() {
  const [form, setForm] = useState({ title: '', slug: '', summary: '', images: '', client: '', year: '', category: '', featured: false })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    const payload = {
      ...form,
      images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [],
      year: form.year ? Number(form.year) : undefined,
    }
    try {
      const res = await fetch(`${BASE_URL}/api/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error(await res.text())
      setMsg('Project created!')
      setForm({ title: '', slug: '', summary: '', images: '', client: '', year: '', category: '', featured: false })
    } catch (e) {
      setMsg('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <Input label="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
      </div>
      <Input label="Images (comma separated URLs)" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input label="Client" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
        <Input label="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
        <Input label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
      </div>
      <Textarea label="Summary" rows={4} value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} />
      <div className="flex items-center justify-between">
        <Toggle label="Featured" checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} />
        <button disabled={loading} className="px-4 py-2 rounded-md bg-white text-neutral-900 font-medium disabled:opacity-60">{loading ? 'Saving...' : 'Create Project'}</button>
      </div>
      {msg && <p className="text-sm text-neutral-300">{msg}</p>}
    </form>
  )
}

export default function Admin() {
  const [key, setKey] = useState(localStorage.getItem(ADMIN_KEY) || '')
  const [input, setInput] = useState('')
  const authed = useMemo(() => key === ADMIN_PASSWORD, [key])
  useEffect(() => { if (authed) localStorage.setItem(ADMIN_KEY, key) }, [authed, key])

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-neutral-950 text-white">
        <div className="w-full max-w-sm rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
          <h2 className="text-lg font-semibold">Admin Login</h2>
          <p className="text-sm text-neutral-400 mt-1">Enter password to access CMS.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); setKey(input) }}
            className="mt-4 grid gap-3"
          >
            <Input label="Password" type="password" value={input} onChange={(e) => setInput(e.target.value)} required />
            <button className="px-4 py-2 rounded-md bg-white text-neutral-900 font-medium">Login</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
          <button onClick={() => { localStorage.removeItem(ADMIN_KEY); window.location.reload() }} className="text-sm text-neutral-300 hover:text-white">Logout</button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <SectionCard title="Create Post">
            <PostForm />
          </SectionCard>
          <SectionCard title="Create Project">
            <ProjectForm />
          </SectionCard>
        </div>

        <div className="grid gap-6 mt-6">
          <SectionCard title="Recent Posts">
            <RecentList type="posts" />
          </SectionCard>
          <SectionCard title="Recent Projects">
            <RecentList type="projects" />
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
