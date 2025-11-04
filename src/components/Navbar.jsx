import { useState } from 'react';
import { Instagram, Mail, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Discover', href: '#discover' },
    { label: 'Stay & Dine', href: '#stay-dine' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/60 border-b border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-xl">DOT.BATAME</a>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-black/70 hover:text-black transition-colors">
                {item.label}
              </a>
            ))}
            <div className="h-5 w-px bg-black/10" />
            <a
              href="https://www.instagram.com/dot.batame/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-black/80 hover:text-black"
            >
              <Instagram className="h-4 w-4" />
              <span className="hidden lg:inline">@dot.batame</span>
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 text-black/80 hover:text-black">
              <Mail className="h-4 w-4" />
              <span className="hidden lg:inline">Collaborate</span>
            </a>
          </nav>

          <button
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-black/10"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-black/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 flex flex-col divide-y divide-black/10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-black/80 hover:text-black"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-4 py-3">
                <a
                  href="https://www.instagram.com/dot.batame/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-black/80 hover:text-black"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 text-black/80 hover:text-black">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
