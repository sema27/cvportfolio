import type { FC } from 'react'
import type { PortfolioData } from '../../types/portfolio'

interface Props {
  data: PortfolioData
}

export const PortfolioPreview: FC<Props> = ({ data }) => {
  const { personal, about, skillCategories, projects } = data
  const initials = personal.avatarLetters || (personal.fullName || '').slice(0, 2).toUpperCase() || 'P'

  return (
    <div className="flex-1 min-w-0 p-6 overflow-auto flex items-start justify-center">
      {/* Mobil telefon çerçevesi */}
      <div className="relative">
        <div className="mx-auto rounded-3xl shadow-2xl bg-slate-900 p-4 sm:p-6" style={{ width: 390 }}>
          <div className="bg-black rounded-2xl overflow-hidden border border-slate-800" style={{ width: 360, height: 740 }}>
            <div className="bg-white h-full overflow-auto">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold flex items-center justify-center text-lg">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-slate-900 truncate">{personal.fullName || 'Adınız'}</h3>
                    <p className="text-sm text-slate-600 truncate">{personal.title || 'Ünvanınız'}</p>
                  </div>
                </div>
                {personal.tagline && <p className="text-sm text-slate-500 mt-2 line-clamp-2">{personal.tagline}</p>}

                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Hakkımda</h4>
                  <p className="text-sm text-slate-600 mt-2 whitespace-pre-line line-clamp-4">{about.bio || 'Kısa bir hakkında metni ekleyin.'}</p>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Projeler</h4>
                  <div className="mt-2 space-y-3">
                    {projects.filter((p) => p.title || p.shortDescription).slice(0, 4).map((p) => (
                      <div key={p.id} className="rounded-md border border-slate-100 p-3 bg-white shadow-sm">
                        <h5 className="font-medium text-slate-800 text-sm truncate">{p.title || 'Proje'}</h5>
                        {p.shortDescription ? <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.shortDescription}</p> : <p className="text-xs text-slate-400 mt-1">Açıklama ekleyin.</p>}
                      </div>
                    ))}
                    {projects.filter((p) => p.title || p.shortDescription).length === 0 && (
                      <div className="text-center text-slate-400 py-6 border border-dashed rounded-md">Proje ekleyerek burayı doldurun.</div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Yetenekler</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skillCategories.flatMap((c) => c.items).slice(0, 8).map((it, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md">{it.name}</span>
                    ))}
                    {skillCategories.flatMap((c) => c.items).length === 0 && (
                      <p className="text-sm text-slate-400">Yetenek ekleyin.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Küçük ekranlarda çerçeveyi daha uyumlu göstermek için ölçek */}
        <style>{`@media (max-width:420px){ .mobile-preview-scale { transform: scale(0.92); transform-origin: top center; } }`}</style>
      </div>
    </div>
  )
}

export default PortfolioPreview
