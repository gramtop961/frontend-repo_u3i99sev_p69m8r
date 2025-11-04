import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const ADMIN_PASS_KEY = 'dot_admin_key';
const ADMIN_DEFAULT_PASSWORD = 'dotbatame';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [tab, setTab] = useState('posts');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(ADMIN_PASS_KEY);
    if (saved === ADMIN_DEFAULT_PASSWORD) setAuthed(true);
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (pass === ADMIN_DEFAULT_PASSWORD) {
      localStorage.setItem(ADMIN_PASS_KEY, pass);
      setAuthed(true);
    } else {
      setStatus({ type: 'error', message: 'Incorrect password' });
    }
  }

  function handleLogout() {
    localStorage.removeItem(ADMIN_PASS_KEY);
    setAuthed(false);
    setPass('');
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm border border-black/10 rounded-2xl p-6">
          <h1 className="text-xl font-semibold">Admin Access</h1>
          <p className="mt-2 text-sm text-black/60">Enter the admin password to manage posts and projects.</p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md border border-black/20 px-3 py-2"
              required
            />
            <button className="w-full rounded-md bg-black text-white px-4 py-2">Enter</button>
          </form>
          {status?.type === 'error' && (
            <p className="mt-3 text-sm text-red-600">{status.message}</p>
          )}
          <p className="mt-6 text-xs text-black/50">Hint for sandbox: {ADMIN_DEFAULT_PASSWORD}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="font-semibold">DOT.BATAME</a>
            <span className="text-black/40">/</span>
            <span className="text-black/70">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="text-sm underline underline-offset-4">View site</a>
            <button onClick={handleLogout} className="text-sm rounded-md border border-black/20 px-3 py-1.5 hover:bg-black hover:text-white">Logout</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center gap-2">
          <TabButton active={tab === 'posts'} onClick={() => setTab('posts')}>Posts</TabButton>
          <TabButton active={tab === 'projects'} onClick={() => setTab('projects')}>Projects</TabButton>
        </div>

        {tab === 'posts' ? <PostForm setStatus={setStatus} /> : <ProjectForm setStatus={setStatus} />}

        {status && (
          <div className={`mt-6 rounded-md border px-4 py-3 text-sm ${status.type === 'error' ? 'border-red-300 text-red-700 bg-red-50' : 'border-emerald-300 text-emerald-700 bg-emerald-50'}`}>
            {status.message}
          </div>
        )}

        <RecentLists />
      </main>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm border ${active ? 'bg-black text-white border-black' : 'border-black/20 hover:bg-black/5'}`}
    >
      {children}
    </button>
  );
}

function PostForm({ setStatus }) {
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', cover_image: '', tags: '', area: '', published: true,
  });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      };
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      const data = await res.json();
      setStatus({ type: 'success', message: `Post created: ${data?.slug || form.slug}` });
      setForm({ title: '', slug: '', excerpt: '', content: '', cover_image: '', tags: '', area: '', published: true });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to create post' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-2xl border border-black/10 p-6 bg-white">
      <h2 className="text-lg font-semibold">Create Post</h2>
      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <Input label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required helper="letters-numbers-dashes" />
        <Input label="Excerpt" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} className="md:col-span-2" />
        <Textarea label="Content" value={form.content} onChange={(v) => setForm({ ...form, content: v })} className="md:col-span-2" />
        <Input label="Cover Image URL" value={form.cover_image} onChange={(v) => setForm({ ...form, cover_image: v })} className="md:col-span-2" />
        <Input label="Tags (comma-separated)" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
        <Input label="Area" value={form.area} onChange={(v) => setForm({ ...form, area: v })} />
        <Switch label="Published" checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
        <div className="md:col-span-2 flex justify-end">
          <button disabled={submitting} className="rounded-md bg-black text-white px-4 py-2 disabled:opacity-50">
            {submitting ? 'Saving…' : 'Publish Post'}
          </button>
        </div>
      </form>
    </section>
  );
}

function ProjectForm({ setStatus }) {
  const [form, setForm] = useState({
    title: '', slug: '', summary: '', images: '', client: '', year: '', category: '', featured: false,
  });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const payload = {
        ...form,
        images: form.images ? form.images.split(',').map(t => t.trim()).filter(Boolean) : [],
        year: form.year ? Number(form.year) : undefined,
      };
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      const data = await res.json();
      setStatus({ type: 'success', message: `Project created: ${data?.slug || form.slug}` });
      setForm({ title: '', slug: '', summary: '', images: '', client: '', year: '', category: '', featured: false });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to create project' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-2xl border border-black/10 p-6 bg-white">
      <h2 className="text-lg font-semibold">Create Project</h2>
      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <Input label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required helper="letters-numbers-dashes" />
        <Input label="Summary" value={form.summary} onChange={(v) => setForm({ ...form, summary: v })} className="md:col-span-2" />
        <Input label="Image URLs (comma-separated)" value={form.images} onChange={(v) => setForm({ ...form, images: v })} className="md:col-span-2" />
        <Input label="Client" value={form.client} onChange={(v) => setForm({ ...form, client: v })} />
        <Input label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} type="number" />
        <Input label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
        <Switch label="Featured" checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} />
        <div className="md:col-span-2 flex justify-end">
          <button disabled={submitting} className="rounded-md bg-black text-white px-4 py-2 disabled:opacity-50">
            {submitting ? 'Saving…' : 'Publish Project'}
          </button>
        </div>
      </form>
    </section>
  );
}

function RecentLists() {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [pRes, prRes] = await Promise.all([
          fetch(`${API_BASE}/api/posts?limit=6`),
          fetch(`${API_BASE}/api/projects?limit=6`),
        ]);
        const [p, pr] = await Promise.all([pRes.json(), prRes.json()]);
        if (!cancelled) {
          setPosts(Array.isArray(p) ? p : []);
          setProjects(Array.isArray(pr) ? pr : []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="mt-8 grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-black/10 p-6 bg-white">
        <h3 className="font-medium">Recent Posts</h3>
        {loading ? (
          <p className="mt-3 text-sm text-black/60">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="mt-3 text-sm text-black/60">No posts yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {posts.map((p) => (
              <li key={p.slug} className="flex items-center justify-between text-sm">
                <span className="truncate mr-2">{p.title}</span>
                <span className="text-black/50">{p.slug}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="rounded-2xl border border-black/10 p-6 bg-white">
        <h3 className="font-medium">Recent Projects</h3>
        {loading ? (
          <p className="mt-3 text-sm text-black/60">Loading…</p>
        ) : projects.length === 0 ? (
          <p className="mt-3 text-sm text-black/60">No projects yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {projects.map((p) => (
              <li key={p.slug} className="flex items-center justify-between text-sm">
                <span className="truncate mr-2">{p.title}</span>
                <span className="text-black/50">{p.slug}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Input({ label, value, onChange, className = '', type = 'text', required = false, helper }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-sm font-medium">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
      />
      {helper && <p className="mt-1 text-xs text-black/50">{helper}</p>}
    </label>
  );
}

function Textarea({ label, value, onChange, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-sm font-medium">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-black/20 px-3 py-2 min-h-[140px]"
      />
    </label>
  );
}

function Switch({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 select-none">
      <span className="text-sm font-medium">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-black' : 'bg-black/20'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </label>
  );
}
