import { useEffect, useState } from 'react';
import { Camera, MapPin } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Sections() {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [pRes, prRes] = await Promise.all([
          fetch(`${API_BASE}/api/posts?limit=6`),
          fetch(`${API_BASE}/api/projects?limit=4`),
        ]);
        const pData = await pRes.json();
        const prData = await prRes.json();
        if (!cancelled) {
          setPosts(Array.isArray(pData) ? pData : []);
          setProjects(Array.isArray(prData) ? prData : []);
        }
      } catch (e) {
        console.error('Failed to load content', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative">
      <Featured posts={posts} loading={loading} />
      <Discover posts={posts} loading={loading} />
      <StayAndDine />
      <PortfolioTeaser projects={projects} loading={loading} />
      <About />
      <Contact />
    </div>
  );
}

function SectionTitle({ eyebrow, title, cta }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="uppercase tracking-[0.25em] text-xs text-black/60">{eyebrow}</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {cta}
    </div>
  );
}

function Featured({ posts, loading }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle
        eyebrow="Featured"
        title="Stories & Reviews"
        cta={<a href="#discover" className="text-sm underline underline-offset-4">See all</a>}
      />
      {loading ? (
        <div className="text-sm text-black/60">Loading…</div>
      ) : posts.length === 0 ? (
        <EmptyState message="No posts yet. Once you publish, they will appear here." />
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} ratio="16/10" />
          ))}
        </div>
      )}
    </section>
  );
}

function Discover({ posts, loading }) {
  return (
    <section id="discover" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle
        eyebrow="Discover"
        title="Curated Finds Around Batam"
        cta={<a href="#contact" className="text-sm underline underline-offset-4">Pitch a spot</a>}
      />
      {loading ? (
        <div className="text-sm text-black/60">Loading…</div>
      ) : posts.length === 0 ? (
        <EmptyState message="No discoveries yet. Add your first post to get started." />
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((p) => (
            <PostCard key={p.slug} post={p} ratio="4/5" compact />
          ))}
        </div>
      )}
    </section>
  );
}

function PostCard({ post, ratio = '16/10', compact = false }) {
  return (
    <article className="group">
      {post.cover_image && (
        <div className={`aspect-[${ratio}] w-full overflow-hidden rounded-xl border border-black/10 bg-white`}>
          <img
            src={post.cover_image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="mt-4">
        <div className="flex items-center gap-3 text-xs text-black/60">
          {post.tags?.[0] && (
            <span className="inline-flex items-center gap-1"><Camera className="h-3.5 w-3.5" /> {post.tags[0]}</span>
          )}
          {post.area && (
            <>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {post.area}</span>
            </>
          )}
        </div>
        <h3 className="mt-2 text-lg font-medium leading-snug">{post.title}</h3>
        {post.excerpt && <p className="text-sm text-black/60 mt-1 line-clamp-2">{post.excerpt}</p>}
      </div>
    </article>
  );
}

function StayAndDine() {
  // Static for now; can be backed by its own collection later
  const stays = [
    {
      title: 'Minimalist Stay near Waterfront City',
      image:
        'https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1600&auto=format&fit=crop',
    },
    {
      title: 'Boutique Rooms in the City Core',
      image:
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1600&auto=format&fit=crop',
    },
    {
      title: 'Calm Island Retreat for Weekenders',
      image:
        'https://images.unsplash.com/photo-1505691723518-36a5ac3b2f41?q=80&w=1600&auto=format&fit=crop',
    },
  ];

  return (
    <section id="stay-dine" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle
        eyebrow="Stay & Dine"
        title="Where to Sleep. Where to Eat."
        cta={<a href="#contact" className="text-sm underline underline-offset-4">Recommend a place</a>}
      />
      <div className="grid md:grid-cols-3 gap-6">
        {stays.map((s) => (
          <article key={s.title} className="group">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white">
              <img
                src={s.image}
                alt={s.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-3 text-base font-medium leading-snug">{s.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function PortfolioTeaser({ projects, loading }) {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle
        eyebrow="Portfolio / Curations"
        title="Brand Features & Creative Direction"
        cta={<a href="#contact" className="text-sm underline underline-offset-4">Work with us</a>}
      />
      {loading ? (
        <div className="text-sm text-black/60">Loading…</div>
      ) : projects.length === 0 ? (
        <EmptyState message="No projects yet. Add a project to showcase your work." />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((pr) => (
            <article key={pr.slug} className="group relative overflow-hidden rounded-2xl border border-black/10">
              {pr.images?.[0] && (
                <img
                  src={pr.images[0]}
                  alt={pr.title}
                  className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                {pr.category && (
                  <p className="text-xs uppercase tracking-[0.25em] opacity-80">{pr.category}</p>
                )}
                <h3 className="mt-2 text-xl font-medium">{pr.title}</h3>
                {pr.summary && <p className="text-sm opacity-90 mt-1 line-clamp-2">{pr.summary}</p>}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="uppercase tracking-[0.25em] text-xs text-black/60">About</p>
      <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">For explorers, not just tourists</h2>
      <p className="mt-4 text-black/70 leading-relaxed">
        We are a minimalist, editorial-first guide to Batam’s most compelling corners — cafes, locals, and hidden
        experiences — established by dot.creatif. Our lens is taste, detail, and locality. We curate what matters and
        leave out the noise.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-2xl border border-black/10 p-8 sm:p-10 bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-black/60">Contact</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">Collaborations, features, and inquiries</h3>
            <p className="mt-3 text-black/70">Email: hello@dotbatame.com</p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/dot.batame/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
              >
                Instagram @dot.batame
              </a>
              <a
                href="https://www.tiktok.com/@dot.batame"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
              >
                TikTok @dot.batame
              </a>
            </div>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-black text-white rounded-xl p-6 sm:p-8"
          >
            <h4 className="text-lg font-medium">Quick inquiry</h4>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <input
                className="w-full rounded-md bg-white text-black px-3 py-2 placeholder:text-black/50"
                placeholder="Name"
                required
              />
              <input
                className="w-full rounded-md bg-white text-black px-3 py-2 placeholder:text-black/50"
                placeholder="Email"
                type="email"
                required
              />
              <textarea
                className="w-full rounded-md bg-white text-black px-3 py-2 placeholder:text-black/50 min-h-[120px]"
                placeholder="Tell us about your idea or collaboration"
                required
              />
              <button className="inline-flex justify-center rounded-md bg-white text-black px-4 py-2 font-medium hover:bg-white/90">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-black/20 p-6 text-sm text-black/60">
      {message}
    </div>
  );
}
