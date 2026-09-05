import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 select-none relative z-10 overflow-hidden">
      
      {/* Ambient crimson glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* CTA Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-16 border-b border-white/10">
          <div className="text-center md:text-left">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-red-500 mb-3">// Now Streaming</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Let&apos;s Build Something <span className="text-red-600 drop-shadow-[0_2px_15px_rgba(220,38,38,0.6)]">Cinematic</span>
            </h3>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-8 py-4 rounded bg-red-600 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-red-700 transition-all duration-300 group whitespace-nowrap shadow-[0_0_25px_rgba(229,9,20,0.5)] hover:scale-105"
          >
            Start a Project
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(220,38,38,0.9)]">
              ADARSH<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            </div>
            <p className="text-sm text-white/50 font-light leading-relaxed max-w-sm">
              AI Engineer &amp; Full-Stack Developer crafting intelligent systems and immersive web experiences, one release at a time.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Adarshh18"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-red-500 hover:border-red-600/70 hover:bg-red-600/10 hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/adarshhtiwari/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-11 h-11 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-red-500 hover:border-red-600/70 hover:bg-red-600/10 hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:adarshkumart88@gmail.com"
                aria-label="Send an Email"
                className="w-11 h-11 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-red-500 hover:border-red-600/70 hover:bg-red-600/10 hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-5">
            <h5 className="text-xs font-mono uppercase tracking-[0.3em] text-red-500">Navigate</h5>
            <nav className="flex flex-col gap-3 text-sm text-white/60 font-light">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-red-500 hover:translate-x-1 transition-all duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 space-y-5">
            <h5 className="text-xs font-mono uppercase tracking-[0.3em] text-red-500">Get In Touch</h5>
            <div className="flex flex-col gap-3 text-sm text-white/60 font-light">
              <a
                href="mailto:adarshkumart88@gmail.com"
                className="hover:text-red-500 transition-colors w-fit"
              >
                adarshkumart88@gmail.com
              </a>
              <p className="text-white/40 leading-relaxed max-w-xs">
                Available for freelance projects, collaborations, and full-time opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8 text-[11px] font-mono text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Adarsh Kumar Tiwari. All Rights Reserved.</p>
          <p className="text-red-500/80">Built with React, GSAP &amp; Framer Motion</p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-red-500 hover:border-red-600/70 hover:bg-red-600/10 hover:-translate-y-1 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;