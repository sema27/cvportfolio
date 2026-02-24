import type { PortfolioExperience } from '../../types/portfolio'
import { emptyPortfolioExperience } from '../../types/portfolio'

function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

interface Props {
  experience: PortfolioExperience[]
  onChange: (experience: PortfolioExperience[]) => void
}

export function PortfolioExperienceForm({ experience, onChange }: Props) {
  const add = () => {
    onChange([...experience, emptyPortfolioExperience(generateId())])
  }

  const remove = (id: string) => {
    onChange(experience.filter((e) => e.id !== id))
  }

  const update = (id: string, upd: Partial<PortfolioExperience>) => {
    onChange(
      experience.map((e) => (e.id === id ? { ...e, ...upd } : e))
    )
  }

  const addBullet = (id: string) => {
    const exp = experience.find((e) => e.id === id)
    if (!exp) return
    update(id, { bullets: [...exp.bullets, ''] })
  }

  const updateBullet = (id: string, index: number, value: string) => {
    const exp = experience.find((e) => e.id === id)
    if (!exp) return
    const next = [...exp.bullets]
    next[index] = value
    update(id, { bullets: next })
  }

  const removeBullet = (id: string, index: number) => {
    const exp = experience.find((e) => e.id === id)
    if (!exp) return
    update(id, { bullets: exp.bullets.filter((_, i) => i !== index) })
  }

  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-3 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-semibold text-slate-200 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full" />
          İş Deneyimi
        </h2>
        <button
          type="button"
          onClick={add}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
        >
          + Ekle
        </button>
      </div>
      <div className="space-y-3">
        {experience.map((exp, idx) => (
          <div
            key={exp.id}
            className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Deneyim #{idx + 1}</span>
              {experience.length > 1 && (
                <button type="button" onClick={() => remove(exp.id)} className="text-slate-400 hover:text-red-400 text-xs">
                  Sil
                </button>
              )}
            </div>
            <input
              placeholder="Şirket"
              value={exp.company}
              onChange={(e) => update(exp.id, { company: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none"
            />
            <input
              placeholder="Pozisyon"
              value={exp.role}
              onChange={(e) => update(exp.id, { role: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none"
            />
            <div className="flex gap-2">
              <input
                type="month"
                placeholder="Başlangıç"
                value={exp.startDate}
                onChange={(e) => update(exp.id, { startDate: e.target.value })}
                className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 focus:ring-1 focus:ring-indigo-500/40 outline-none"
              />
              <input
                type="month"
                placeholder="Bitiş"
                value={exp.endDate}
                onChange={(e) => update(exp.id, { endDate: e.target.value })}
                disabled={exp.current}
                className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 focus:ring-1 focus:ring-indigo-500/40 outline-none disabled:opacity-50"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => update(exp.id, { current: e.target.checked })}
                className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/40"
              />
              <span className="text-xs text-slate-400">Şu an çalışıyorum</span>
            </label>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Madde maddeler</span>
                <button type="button" onClick={() => addBullet(exp.id)} className="text-xs text-indigo-400">
                  + Madde
                </button>
              </div>
              {exp.bullets.map((b, i) => (
                <div key={i} className="flex gap-1 mb-1">
                  <input
                    value={b}
                    onChange={(e) => updateBullet(exp.id, i, e.target.value)}
                    placeholder="• Görev veya başarı"
                    className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none"
                  />
                  <button type="button" onClick={() => removeBullet(exp.id, i)} className="text-slate-400 hover:text-red-400 text-xs">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
