import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { PortfolioData } from '../types/portfolio'
import { loadPortfolioFromStorage, savePortfolioToStorage } from '../types/portfolio'
import { parsePortfolioFromShareUrl } from '../utils/portfolioShare'

function formatDateRange(start: string, end: string, current: boolean): string {
  if (!start && !end) return ''
  const fmt = (s: string) => {
    if (!s) return ''
    const [y, m] = s.split('-')
    const months = 'Ocak Şubat Mart Nisan Mayıs Haziran Temmuz Ağustos Eylül Ekim Kasım Aralık'.split(' ')
    return m ? `${months[parseInt(m, 10) - 1]} ${y}` : y
  }
  const startStr = fmt(start)
  const endStr = current ? 'Şu an' : fmt(end)
  return [startStr, endStr].filter(Boolean).join(' - ')
}

const NAV_ITEMS = [
  { label: 'Ana Sayfa', id: 'hero' },
  { label: 'Hakkımda', id: 'about' },
  { label: 'Yetenekler', id: 'skills' },
  { label: 'Projeler', id: 'projects' },
  { label: 'Deneyim', id: 'experience' },
  { label: 'İletişim', id: 'contact' },
] as const

export function PortfolioView() {
  const { search } = useLocation()
  const [data, setData] = useState<PortfolioData | null>(null)
  const [navOpen, setNavOpen] = useState(false)
  const [loadedFromLink, setLoadedFromLink] = useState(false)

  useEffect(() => {
    const fromLink = parsePortfolioFromShareUrl(search)
    if (fromLink) {
      setData(fromLink)
      savePortfolioToStorage(fromLink)
      setLoadedFromLink(true)
      return
    }

    setLoadedFromLink(false)
    setData(loadPortfolioFromStorage())
  }, [search])

  const closeNav = () => setNavOpen(false)

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Portfolio verisi bulunamadı.</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
          >
            Portfolio oluştur
          </Link>
        </div>
      </div>
    )
  }

  const { personal, about, skillCategories, projects, experience } = data
  const initials = personal.avatarLetters || personal.fullName?.slice(0, 2).toUpperCase() || 'P'
  const filteredProjects = projects.filter((p) => p.title || p.shortDescription)

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased scroll-smooth">
      {/* ─── Nav: Geniş masaüstü + mobil menü ─── */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-slate-900/20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-6">
          <a href="#hero" onClick={closeNav} className="flex items-center gap-3 min-w-0 shrink-0">
            <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900 font-display font-bold text-sm sm:text-base flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
              {initials}
            </span>
            <span className="font-display font-semibold text-white text-base sm:text-lg hidden sm:inline truncate">
              {personal.fullName || 'Portfolio'}
            </span>
          </a>

          {/* Desktop: geniş yatay nav, daha ferah */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-2 flex-1 justify-end">
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={() => setNavOpen((o) => !o)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 text-white"
            aria-label="Menüyü aç"
            aria-expanded={navOpen}
          >
            <span className={`w-5 h-0.5 bg-current transition-transform ${navOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-opacity ${navOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-current transition-transform ${navOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile: slide-down menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            navOpen ? 'max-h-[320px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-white/10">
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeNav}
                className="py-3 px-4 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section id="hero" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-white to-white" />
        <div className="absolute top-0 right-0 w-[70%] sm:w-[50%] h-[60%] bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[40%] bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          {loadedFromLink && (
            <p className="inline-flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full mb-5">
              Paylaşım linkinden yüklendi
            </p>
          )}
          <p className="font-display text-amber-600 font-medium text-base sm:text-lg mb-3 sm:mb-4 tracking-wide">Merhaba!</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            {personal.fullName || 'Adınız'}
          </h1>
          <h2 className="font-display text-lg sm:text-xl md:text-2xl mt-2 sm:mt-3 portfolio-gradient-text">
            {personal.title || 'Ünvanınız'}
          </h2>
          {personal.tagline && (
            <p className="text-slate-600 mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
              {personal.tagline}
            </p>
          )}
          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            {personal.cvLink && (
              <a
                href={personal.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all"
              >
                CV İndir
              </a>
            )}
            <a
              href="#contact"
              onClick={closeNav}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </section>

      {/* ─── About: grid ─── */}
      <section id="about" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
        <div className="max-w-6xl mx-auto">
          <p className="font-display text-amber-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">Tanışalım</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">Hakkımda</h2>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 items-start">
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-display font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-xl shadow-amber-500/30">
                {initials}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              {about.bio ? (
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">{about.bio}</p>
              ) : (
                <p className="text-slate-400 italic">Hakkımda metni ekleyin.</p>
              )}
              {/* Stats grid: mobil 2 col, tablet 2 col, desktop 4 col ─── */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6 sm:mt-8">
                {(about.degree || about.school) && (
                  <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 border border-slate-200/80 shadow-sm min-w-0">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Eğitim</p>
                    <p className="font-display font-semibold text-slate-800 text-xs sm:text-sm truncate" title={about.degree || undefined}>{about.degree || '—'}</p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate" title={about.school}>{about.school || ''}</p>
                  </div>
                )}
                {about.gpa && (
                  <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 border border-slate-200/80 shadow-sm">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">GPA</p>
                    <p className="font-display font-bold text-amber-600 text-lg sm:text-xl">{about.gpa}</p>
                  </div>
                )}
                {about.expertise && (
                  <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 border border-slate-200/80 shadow-sm min-w-0 col-span-2 lg:col-span-1">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Uzmanlık</p>
                    <p className="font-display font-semibold text-slate-800 text-xs sm:text-sm line-clamp-2">{about.expertise}</p>
                  </div>
                )}
                <div className={`rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-3 sm:p-4 border border-amber-200/60 ${(about.degree || about.school) && about.gpa ? 'col-span-2' : ''}`}>
                  <p className="text-[10px] sm:text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Deneyim</p>
                  <p className="font-display font-semibold text-slate-800 text-xs sm:text-sm">
                    {[about.yearsExperience && `${about.yearsExperience} Yıl`, about.projectsCount && `${about.projectsCount} Proje`, about.technologiesCount && `${about.technologiesCount}+ Teknoloji`, about.clientsCount && `${about.clientsCount}+ Müşteri`].filter(Boolean).join(' · ') || '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Skills: grid ─── */}
      <section id="skills" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="font-display text-amber-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">Teknik</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-10">Yeteneklerim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.filter((c) => c.title || c.items.some((i) => i.name)).map((cat) => (
              <div key={cat.id} className="rounded-xl sm:rounded-2xl bg-slate-50 p-4 sm:p-6 border border-slate-200/80">
                <h3 className="font-display font-semibold text-slate-800 text-base sm:text-lg mb-4 sm:mb-5">{cat.title || 'Kategori'}</h3>
                <div className="space-y-3 sm:space-y-4">
                  {cat.items.filter((i) => i.name).map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-1.5">
                        <span className="font-medium text-slate-700 truncate mr-2">{item.name}</span>
                        <span className="font-semibold text-amber-600 tabular-nums flex-shrink-0">{item.percent}%</span>
                      </div>
                      <div className="h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700"
                          style={{ width: `${Math.min(100, Math.max(0, item.percent))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects: grid ─── */}
      <section id="projects" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
        <div className="max-w-6xl mx-auto">
          <p className="font-display text-amber-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">Çalışmalarım</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Son Projelerim</h2>
          <p className="text-slate-600 mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base">Modern teknolojiler ve en iyi pratiklerle geliştirdiğim projeler.</p>

          {/* Grid: mobil 1 col, tablet 2 col, desktop 3 col. Tüm kartlar eşit boyut. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {filteredProjects.map((proj) => (
              <article
                key={proj.id}
                className="group rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-200/60 transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-video min-h-[200px] sm:min-h-[220px]">
                    {proj.imageUrl ? (
                      <img src={proj.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-300/50 flex items-center justify-center text-slate-400">
                          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
                        </div>
                      </div>
                    )}
                    {proj.featured && (
                      <span className="absolute top-2 sm:top-3 right-2 sm:right-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-900 px-2 sm:px-2.5 py-1 rounded-lg shadow">
                        Öne Çıkan
                      </span>
                    )}
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h4 className="font-display font-semibold text-slate-900 text-base sm:text-lg">{proj.title || 'Proje'}</h4>
                    {proj.shortDescription && (
                      <p className="text-slate-600 text-sm mt-1 sm:mt-2 leading-relaxed line-clamp-2 sm:line-clamp-3">{proj.shortDescription}</p>
                    )}
                    {proj.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        {proj.tags.map((t) => (
                          <span key={t} className="text-[10px] sm:text-xs font-medium text-slate-500 bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 sm:mt-4 sm:mt-auto pt-2 text-sm font-semibold text-amber-600 hover:text-amber-700"
                      >
                        Siteyi Gör
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                  </div>
                </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Experience ─── */}
      <section id="experience" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="font-display text-amber-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">Kariyer</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-10">İş Deneyimim</h2>
          <div className="relative">
            <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-0.5 sm:w-px bg-gradient-to-b from-amber-200 via-amber-300 to-slate-200" />
            <div className="space-y-6 sm:space-y-8">
              {experience.filter((e) => e.company || e.role).map((exp) => (
                <div key={exp.id} className="relative pl-8 sm:pl-12">
                  <span className="absolute left-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-500 border-2 sm:border-4 border-white shadow shadow-amber-200" />
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </p>
                  <h4 className="font-display font-semibold text-slate-900 text-base sm:text-lg mt-0.5">{exp.role || 'Pozisyon'}</h4>
                  <p className="text-amber-600 font-medium text-sm sm:text-base">{exp.company}</p>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-slate-600 text-xs sm:text-sm">
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-amber-400 mt-1 flex-shrink-0">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
        <div className="max-w-6xl mx-auto">
          <p className="font-display text-amber-600 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">İletişim</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Konuşalım</h2>
          <p className="text-slate-600 mb-8 sm:mb-10 text-sm sm:text-base">
            Yeni bir proje, iş birliği veya sadece merhaba demek için benimle iletişime geçebilirsiniz.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all group text-left">
                <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</p>
                <p className="font-medium text-amber-600 group-hover:text-amber-700 break-all text-sm sm:text-base">{personal.email}</p>
              </a>
            )}
            {personal.phone && (
              <a href={`tel:${personal.phone}`} className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-200/60 transition-all group text-left">
                <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Telefon</p>
                <p className="font-medium text-slate-800 group-hover:text-amber-600 text-sm sm:text-base">{personal.phone}</p>
              </a>
            )}
            {personal.location && (
              <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-sm text-left">
                <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Konum</p>
                <p className="font-medium text-slate-800 text-sm sm:text-base">{personal.location}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
            <div>
              <p className="font-display font-semibold text-white text-base sm:text-lg">{personal.fullName || 'Portfolio'}</p>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{personal.title}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm">
              <a href="#about" onClick={closeNav} className="hover:text-white transition-colors">Hakkımda</a>
              <a href="#projects" onClick={closeNav} className="hover:text-white transition-colors">Projeler</a>
              <a href="#skills" onClick={closeNav} className="hover:text-white transition-colors">Yetenekler</a>
              <a href="#contact" onClick={closeNav} className="hover:text-white transition-colors">İletişim</a>
            </div>
            <div className="flex gap-4 sm:gap-6">
              {personal.linkedin && (
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">LinkedIn</a>
              )}
              {personal.github && (
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">GitHub</a>
              )}
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-700/80 text-center text-xs sm:text-sm text-slate-500">
            © {new Date().getFullYear()} {personal.fullName || 'Portfolio'}. Tüm hakları saklıdır.
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <Link to="/portfolio" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              Portfolio düzenleyiciye dön
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
