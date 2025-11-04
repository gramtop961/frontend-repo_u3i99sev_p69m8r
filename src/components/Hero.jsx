import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[70vh] grid place-items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/f9XbW9mE7mQj5hY3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/30 to-neutral-950" />
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Design. Code. Ship.</h1>
        <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
          A minimal portfolio and blog by DOT.BATAME — exploring visuals, interactions, and thoughtful content.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="#work" className="px-4 py-2 rounded-md bg-white text-neutral-900 font-medium">View Work</a>
          <a href="#blog" className="px-4 py-2 rounded-md border border-neutral-700">Read Blog</a>
        </div>
      </div>
    </section>
  )
}
