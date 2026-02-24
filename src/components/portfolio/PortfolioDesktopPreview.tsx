import type { FC } from 'react'
import type { PortfolioData } from '../../types/portfolio'

interface Props {
  data: PortfolioData
}

const ProjectCard: FC<{ title?: string; desc?: string }> = ({ title, desc }) => (
  <div className="rounded-lg border border-slate-100 p-3 bg-white shadow-sm">
    <h5 className="font-medium text-slate-800 text-sm truncate">{title || 'Proje'}</h5>
    {desc ? <p className="text-xs text-slate-500 mt-1 line-clamp-2">{desc}</p> : <p className="text-xs text-slate-400 mt-1">Açıklama ekleyin.</p>}
  </div>
)

export const PortfolioDesktopPreview: FC<Props> = ({ data }) => {
  const { personal, about, skillCategories, projects, experience } = data

  return (
    <div className="flex-1 min-w-0 p-6 overflow-auto">
      <div className="max-w-[1000px] mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display font-bold text-xl text-slate-900 truncate">{personal.fullName || 'Adınız'}</h3>
              <p className="text-sm text-slate-600 truncate">{personal.title || 'Ünvanınız'}</p>
            </div>
            <div className="text-sm text-slate-500">{personal.location}</div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Hakkımda</h4>
                <p className="text-sm text-slate-600 mt-2 whitespace-pre-line">{about.bio || 'Kısa bir hakkında metni ekleyin.'}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Yetenekler</h4>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {skillCategories.flatMap((c) => c.items).slice(0, 8).map((it, i) => (
                    <div key={i} className="text-xs bg-slate-50 text-slate-700 px-2 py-1 rounded-md">{it.name}</div>
                  ))}
                  {skillCategories.flatMap((c) => c.items).length === 0 && (
                    <p className="text-sm text-slate-400">Yetenek ekleyin.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Projeler</h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.filter((p) => p.title || p.shortDescription).slice(0, 6).map((p) => (
                    <ProjectCard key={p.id} title={p.title} desc={p.shortDescription} />
                  ))}
                  {projects.filter((p) => p.title || p.shortDescription).length === 0 && (
                    <div className="col-span-full text-center text-slate-400 py-6 border border-dashed rounded-md">Proje ekleyin.</div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Deneyim</h4>
                <div className="mt-3 space-y-2">
                  {experience.filter((e) => e.company || e.role).slice(0, 3).map((e) => (
                    <div key={e.id} className="text-sm">
                      <div className="font-medium text-slate-800">{e.role || 'Pozisyon'}</div>
                      <div className="text-xs text-slate-500">{e.company}</div>
                    </div>
                  ))}
                  {experience.filter((e) => e.company || e.role).length === 0 && (
                    <div className="text-sm text-slate-400">Deneyim ekleyin.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioDesktopPreview
