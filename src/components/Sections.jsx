import { Camera, MapPin } from 'lucide-react';

const posts = [
  {
    title: 'Slow Mornings at Harbourfront Cafe',
    tag: 'Cafe Review',
    area: 'Batu Ampar',
    image:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'An Artisan Noodle Spot Loved by Locals',
    tag: 'Hidden Gem',
    area: 'Lubuk Baja',
    image:
      'https://images.unsplash.com/photo-1526312426976-593c2b99967a?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Sunset Vantage Points Around Barelang',
    tag: 'Guide',
    area: 'Barelang',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
  },
];

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

export default function Sections() {
  return (
    <div className="relative">
      <Featured />
      <Discover />
      <StayAndDine />
      <PortfolioTeaser />
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

function Featured() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle
        eyebrow="Featured"
        title="Stories & Reviews"
        cta={<a href="#discover" className="text-sm underline underline-offset-4">See all</a>}
      />
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.title} className="group">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-3 text-xs text-black/60">
                <span className="inline-flex items-center gap-1"><Camera className="h-3.5 w-3.5" /> {p.tag}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {p.area}</span>
              </div>
              <h3 className="mt-2 text-lg font-medium leading-snug">{p.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Discover() {
  return (
    <section id="discover" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle
        eyebrow="Discover"
        title="Curated Finds Around Batam"
        cta={<a href="#contact" className="text-sm underline underline-offset-4">Pitch a spot</a>}
      />
      <div className="grid md:grid-cols-3 gap-6">
        {posts.concat(posts).slice(0, 6).map((p, i) => (
          <article key={p.title + i} className="group">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border border-black/10 bg-white">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-3 text-base font-medium leading-snug">{p.title}</h3>
            <p className="text-sm text-black/60">{p.area} • {p.tag}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StayAndDine() {
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

function PortfolioTeaser() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitle
        eyebrow="Portfolio / Curations"
        title="Brand Features & Creative Direction"
        cta={<a href="#contact" className="text-sm underline underline-offset-4">Work with us</a>}
      />
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map((n) => (
          <article key={n} className="group relative overflow-hidden rounded-2xl border border-black/10">
            <img
              src={`https://images.unsplash.com/photo-1526178617633-1a30512cf9b9?q=80&w=2000&auto=format&fit=crop`}
              alt="Editorial shoot"
              className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.25em] opacity-80">Curation {n}</p>
              <h3 className="mt-2 text-xl font-medium">Visual storytelling for local brands</h3>
            </div>
          </article>
        ))}
      </div>
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
                href="https://instagram.com/dot.batame"
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
