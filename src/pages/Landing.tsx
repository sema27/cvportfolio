import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 relative">
      {/* Background: gradient mesh + grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,191,36,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(99,102,241,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="relative z-10 min-h-screen flex flex-col px-6 py-8">
        <nav className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <span className="font-display text-sm">CV</span>
            </div>
            <span className="font-display text-sm tracking-wide text-slate-200">
              CV & Portfolio Studio
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 text-xs text-emerald-300/90 bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ATS uyumlu CV oluşturucu
          </span>
        </nav>

        <main className="flex-1 flex flex-col items-center justify-center pt-6 pb-10">
          <header className="text-center mb-14 md:mb-16">
            <p className="font-display text-amber-400/90 text-sm uppercase tracking-[0.3em] mb-4">
              Kariyer Aracı Kutunuz
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 tracking-tight max-w-4xl mx-auto leading-[1.1]">
              Kariyerinizi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                parlatalım
              </span>
            </h1>
            <p className="mt-6 text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-sans">
              Özgeçmişinizi ve portfolio sitenizi tek yerden, modern ve şık tasarımlarla oluşturun.
            </p>
          </header>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-3xl">
          <Link
            to="/cv"
            className="group relative block rounded-2xl border border-slate-700/80 bg-slate-900/60 backdrop-blur-xl p-8 md:p-10 text-left transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.25)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-slate-100 mb-2">
              CV Oluştur
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
              ATS uyumlu, profesyonel şablonlarla özgeçmişinizi hazırlayın ve PDF olarak indirin.
            </p>
            <span className="inline-flex items-center gap-2 text-amber-400 font-medium text-sm group-hover:gap-3 transition-all">
              Başla
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>

          <Link
            to="/portfolio"
            className="group relative block rounded-2xl border border-slate-700/80 bg-slate-900/60 backdrop-blur-xl p-8 md:p-10 text-left transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.25)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-slate-100 mb-2">
              Portfolio Sitesi
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
              Projelerinizi sergileyen kişisel portfolio web sitenizi kolayca oluşturun.
            </p>
            <span className="inline-flex items-center gap-2 text-indigo-400 font-medium text-sm group-hover:gap-3 transition-all">
              Başla
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>

          <section className="mt-14 w-full max-w-4xl">
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 px-4 py-3 text-left">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  ATS puanlama
                </p>
                <p className="text-slate-200 font-display">
                  CV&apos;niz otomatik sistemlere hazır.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 px-4 py-3 text-left">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  Hazır şablonlar
                </p>
                <p className="text-slate-200 font-display">
                  Modern, klasik ve yaratıcı tasarımlar.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 px-4 py-3 text-left">
                <p className="text-xs font-medium text-slate-400 mb-1">
                  Ücretsiz kullanım
                </p>
                <p className="text-slate-200 font-display">
                  Kayıt gerekmez, direkt başlayın.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
