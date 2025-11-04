export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-black/60">DOT.BATAME</p>
            <p className="mt-2 text-sm text-black/70 max-w-xl">
              Your curated guide to Batam's spots – cafes, locals & hidden gems. For explorers, not just tourists.
            </p>
          </div>
          <div className="text-sm text-black/60">
            <p>Established by dot.creatif</p>
            <p className="mt-1">Instagram: @dot.batame • TikTok: @dot.batame</p>
          </div>
        </div>
        <div className="mt-8 text-xs text-black/50">© {new Date().getFullYear()} DOT.BATAME. All rights reserved.</div>
      </div>
    </footer>
  );
}
