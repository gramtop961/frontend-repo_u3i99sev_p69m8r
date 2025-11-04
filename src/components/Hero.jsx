import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="home" className="relative h-[90vh] w-full">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <p className="uppercase tracking-[0.3em] text-xs text-black/70">Established by dot.creatif</p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">DOT.BATAME</h1>
          <p className="mt-4 text-lg sm:text-xl text-black/70">Discover, Stay, Dine</p>
          <p className="mt-6 text-black/70 leading-relaxed">
            Your curated guide to Batam's spots – cafes, locals & hidden gems. For explorers, not just tourists.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#discover" className="px-5 py-3 rounded-full bg-black text-white text-sm hover:bg-black/90 transition-colors">Explore Discoveries</a>
            <a href="#portfolio" className="px-5 py-3 rounded-full border border-black text-sm hover:bg-black hover:text-white transition-colors">View Portfolio</a>
          </div>
        </div>
      </div>
    </section>
  );
}
