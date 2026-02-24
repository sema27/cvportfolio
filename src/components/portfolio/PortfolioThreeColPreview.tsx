import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { PortfolioData } from '../../types/portfolio'

interface Props {
  data: PortfolioData
}

export const PortfolioThreeColPreview: FC<Props> = ({ data }) => {
  const { personal, about, skillCategories, projects, experience } = data
  const initials = personal.avatarLetters || (personal.fullName || '').slice(0, 2).toUpperCase() || 'P'

  return (
    <div className="flex-1 min-w-0 p-6 overflow-auto">
      <div className="max-w-[1200px] mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-slate-900">Önizleme</h3>
          <div className="flex items-center gap-2">
            <Link to="/portfolio/view" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium">Tam Önizleme</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Personal + Experience */}
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold flex items-center justify-center text-lg">{initials}</div>
                <div className="min-w-0">
                  <div className="font-display font-semibold text-slate-900 truncate">{personal.fullName || 'Adınız'}</div>
                  <div className="text-sm text-slate-600 truncate">{personal.title}</div>
                </div>
              </div>
              {personal.tagline && <p className="text-sm text-slate-500 mt-3">{personal.tagline}</p>}
              <div className="mt-3 text-sm space-y-1">
                {personal.email && <div><strong className="text-slate-500">Email:</strong> <span className="text-slate-700">{personal.email}</span></div>}
                {personal.phone && <div><strong className="text-slate-500">Telefon:</strong> <span className="text-slate-700">{personal.phone}</span></div>}
                {personal.location && <div><strong className="text-slate-500">Konum:</strong> <span className="text-slate-700">{personal.location}</span></div>}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Deneyim</h4>
              <div className="space-y-3">
                {experience.filter((e) => e.company || e.role).length > 0 ? (
                  experience.filter((e) => e.company || e.role).slice(0, 6).map((e) => (
                    <div key={e.id} className="p-3 bg-white rounded-md border border-slate-100 shadow-sm">
                      <div className="font-medium text-slate-800">{e.role || 'Pozisyon'}</div>
                      <div className="text-sm text-slate-500">{e.company}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400">Deneyim ekleyin.</div>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Skills + Projects */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Yetenekler</h4>
              <div className="grid grid-cols-2 gap-2">
                {skillCategories.flatMap((c) => c.items).length > 0 ? (
                  skillCategories.flatMap((c) => c.items).slice(0, 12).map((it, i) => (
                    <div key={i} className="text-xs bg-slate-50 text-slate-700 px-2 py-1 rounded-md">{it.name}</div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400">Yetenek ekleyin.</div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Projeler</h4>
              <div className="grid grid-cols-1 gap-2">
                {projects.filter((p) => p.title || p.shortDescription).length > 0 ? (
                  projects.filter((p) => p.title || p.shortDescription).slice(0, 6).map((p) => (
                    <div key={p.id} className="p-3 bg-white rounded-md border border-slate-100 shadow-sm">
                      <div className="font-medium text-slate-800 truncate">{p.title || 'Proje'}</div>
                      {p.shortDescription && <div className="text-xs text-slate-500">{p.shortDescription}</div>}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400">Proje ekleyin.</div>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: About / Contact / Links */}
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Hakkımda</h4>
              <p className="text-sm text-slate-600 mt-2 whitespace-pre-line">{about.bio || 'Kısa hakkında metni ekleyin.'}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Bağlantılar</h4>
              <div className="flex flex-col gap-2 text-sm">
                {personal.linkedin ? <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-amber-600">LinkedIn</a> : <span className="text-slate-400">LinkedIn yok</span>}
                {personal.github ? <a href={personal.github} target="_blank" rel="noreferrer" className="text-amber-600">GitHub</a> : <span className="text-slate-400">GitHub yok</span>}
                {personal.cvLink ? <a href={personal.cvLink} target="_blank" rel="noreferrer" className="text-amber-600">CV</a> : <span className="text-slate-400">CV linki yok</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioThreeColPreview
