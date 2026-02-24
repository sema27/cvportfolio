import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { CVData, PersonalInfo, Experience, Education } from '../types'
import { emptyPersonal, emptyExperience, emptyEducation } from '../types'
import { FormPanel } from '../components/FormPanel'
import { PreviewPanel, type TemplateId } from '../components/PreviewPanel'
import { ATSScoreCard } from '../components/ATSScoreCard'
import { exportToPdf } from '../utils/pdf'

const initialData: CVData = {
  personal: { ...emptyPersonal },
  experience: [emptyExperience()],
  education: [emptyEducation()],
  skills: [],
}

const TEMPLATE_OPTIONS: { value: TemplateId; label: string }[] = [
  { value: 'modern', label: 'Modern' },
  { value: 'classic', label: 'Klasik' },
  { value: 'professional', label: 'Profesyonel' },
  { value: 'minimal', label: 'Minimal' },
]

export function CVBuilder() {
  const [data, setData] = useState<CVData>(initialData)
  const [template, setTemplate] = useState<TemplateId>('modern')

  const updatePersonal = useCallback((personal: Partial<PersonalInfo>) => {
    setData((d) => ({ ...d, personal: { ...d.personal, ...personal } }))
  }, [])

  const updateExperience = useCallback((list: Experience[]) => {
    setData((d) => ({ ...d, experience: list }))
  }, [])

  const updateEducation = useCallback((list: Education[]) => {
    setData((d) => ({ ...d, education: list }))
  }, [])

  const updateSkills = useCallback((skills: string[]) => {
    setData((d) => ({ ...d, skills }))
  }, [])

  const handleExportPdf = useCallback(() => {
    exportToPdf(data)
  }, [data])

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden">
      {/* Aynı arka plan: gradient + grid (ana sayfa ile uyumlu) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,191,36,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(99,102,241,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
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
              <div className="w-8 h-8 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <span className="font-display text-sm">CV</span>
              </div>
              <span className="font-display text-sm tracking-wide text-slate-200">
                CV Oluşturucu
              </span>
            </div>
            <h1 className="font-display font-semibold text-lg text-slate-100 sm:hidden">
              CV Oluşturucu
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 text-xs text-emerald-300/90 bg-emerald-500/10 border border-emerald-400/30 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ATS uyumlu
            </span>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value as TemplateId)}
              className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none"
            >
              {TEMPLATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleExportPdf}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium px-4 py-2 rounded-xl text-sm transition-colors shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)]"
            >
              PDF İndir
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <div className="max-w-[1600px] mx-auto flex min-h-0">
          <FormPanel
            data={data}
            onPersonalChange={updatePersonal}
            onExperienceChange={updateExperience}
            onEducationChange={updateEducation}
            onSkillsChange={updateSkills}
          />
          <div className="flex-1 min-w-0 flex items-start justify-center p-6 overflow-auto">
            <PreviewPanel data={data} template={template} id="cv-preview" />
          </div>
          <aside className="w-[320px] shrink-0 pl-4 pr-4 py-6 overflow-y-auto">
            <ATSScoreCard data={data} />
          </aside>
        </div>
      </main>
    </div>
  )
}
