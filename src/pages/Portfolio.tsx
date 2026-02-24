import { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { PortfolioData } from '../types/portfolio'
import {
  getInitialPortfolioData,
  loadPortfolioFromStorage,
  savePortfolioToStorage,
} from '../types/portfolio'
import { PortfolioPersonalForm } from '../components/portfolio/PortfolioPersonalForm'
import { PortfolioAboutForm } from '../components/portfolio/PortfolioAboutForm'
import { PortfolioSkillsForm } from '../components/portfolio/PortfolioSkillsForm'
import { PortfolioProjectsForm } from '../components/portfolio/PortfolioProjectsForm'
import { PortfolioExperienceForm } from '../components/portfolio/PortfolioExperienceForm'

export function Portfolio() {
  const navigate = useNavigate()
  const [data, setData] = useState<PortfolioData>(() => loadPortfolioFromStorage() ?? getInitialPortfolioData())

  useEffect(() => {
    savePortfolioToStorage(data)
  }, [data])

  const updatePersonal = useCallback((p: Partial<PortfolioData['personal']>) => {
    setData((d) => ({ ...d, personal: { ...d.personal, ...p } }))
  }, [])

  const updateAbout = useCallback((a: Partial<PortfolioData['about']>) => {
    setData((d) => ({ ...d, about: { ...d.about, ...a } }))
  }, [])

  const updateSkillCategories = useCallback((skillCategories: PortfolioData['skillCategories']) => {
    setData((d) => ({ ...d, skillCategories }))
  }, [])

  const updateProjects = useCallback((projects: PortfolioData['projects']) => {
    setData((d) => ({ ...d, projects }))
  }, [])

  const updateExperience = useCallback((experience: PortfolioData['experience']) => {
    setData((d) => ({ ...d, experience }))
  }, [])

  const handleViewPortfolio = () => {
    savePortfolioToStorage(data)
    navigate('/portfolio/view')
  }

  const handleResetPortfolio = () => {
    // confirmation to avoid accidental erase
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Tüm kayıtlı portfolio verisini silmek istediğinize emin misiniz?')) return
    const initial = getInitialPortfolioData()
    setData(initial)
    savePortfolioToStorage(initial)
  }

  const SAMPLE_PORTFOLIO: PortfolioData = {
    personal: {
      fullName: 'Örnek Kullanıcı',
      title: 'Frontend Geliştirici',
      tagline: 'Erişilebilir ve performanslı web uygulamaları geliştiriyorum.',
      email: 'ornek.kullanici@example.com',
      phone: '',
      location: 'İstanbul, Türkiye',
      cvLink: '',
      linkedin: 'https://linkedin.com/in/ornekkullanici',
      github: 'https://github.com/ornekkullanici',
      website: 'https://ornekkullanici.com',
      avatarLetters: 'ÖK',
    },
    about: {
      bio: 'React ve TypeScript ile deneyimli, temiz kod ve kullanışlı arayüzler üreten bir geliştiriciyim.',
      degree: 'Lisans, Bilgisayar Mühendisliği',
      school: 'Örnek Üniversitesi',
      gpa: '3.7',
      expertise: 'React, TypeScript, Tailwind, Node.js',
      yearsExperience: '3',
      projectsCount: '8',
      technologiesCount: '12',
      clientsCount: '',
    },
    skillCategories: [
      { id: 'cat1', title: 'Ön Yüz', items: [{ name: 'React', percent: 90 }, { name: 'TypeScript', percent: 85 }] },
      { id: 'cat2', title: 'Arka Uç', items: [{ name: 'Node.js', percent: 70 }] },
    ],
    projects: [
      { id: 'p1', title: 'Kişisel Portfolyo', shortDescription: 'React ve Tailwind ile hazırlanmış kişisel portfolyo.', tags: ['React', 'Tailwind'], link: 'https://ornekkullanici.com', imageUrl: '', featured: true },
      { id: 'p2', title: 'Görev Yöneticisi', shortDescription: 'Çevrimdışı destekli basit bir görev uygulaması.', tags: ['PWA'], link: '', imageUrl: '', featured: false },
    ],
    experience: [
      { id: 'e1', company: 'Örnek Şirket', role: 'Frontend Geliştirici', startDate: '2021-06', endDate: '', current: true, bullets: ['UI bileşenleri geliştirme', 'Performansı %30 artırma'] },
    ],
  }

  const handleFillSample = () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Örnek veriler doldurulsun mu? (Mevcut veriler üzerine yazılacak)')) return
    setData(SAMPLE_PORTFOLIO)
    savePortfolioToStorage(SAMPLE_PORTFOLIO)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden">
      {/* Arka plan (ana sayfa ile uyumlu) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,191,36,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(99,102,241,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>

      <header className="relative z-10 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium"
              title="Ana sayfaya dön"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Ana Sayfa
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </div>
              <span className="font-display text-sm tracking-wide text-slate-200">
                Portfolio Oluşturucu
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetPortfolio}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium px-3 py-2 rounded-xl text-sm transition-colors border border-slate-600"
            >
              Temizle
            </button>
            <button
              type="button"
              onClick={handleFillSample}
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-3 py-2 rounded-xl text-sm transition-colors"
            >
              Örnek Doldur
            </button>
            <button
              type="button"
              onClick={handleViewPortfolio}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)]"
            >
              Portfolio&apos;yu Görüntüle
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-hidden pt-6 md:pt-8">
        <div className="max-w-[1400px] mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <PortfolioPersonalForm value={data.personal} onChange={updatePersonal} />
            </div>

            <div className="space-y-4">
              <PortfolioAboutForm value={data.about} onChange={updateAbout} />
              <PortfolioSkillsForm categories={data.skillCategories} onChange={updateSkillCategories} />
            </div>

            <div className="space-y-4">
              <PortfolioProjectsForm projects={data.projects} onChange={updateProjects} />
              <PortfolioExperienceForm experience={data.experience} onChange={updateExperience} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
