import type { Experience } from '../../types'

interface ExperienceFormProps {
  items: Experience[]
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, upd: Partial<Experience>) => void
}

export function ExperienceForm({ items, onAdd, onRemove, onUpdate }: ExperienceFormProps) {
  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-semibold text-slate-200 flex items-center gap-2">
          <span className="w-1 h-5 bg-amber-500 rounded-full" />
          İş Deneyimi
        </h2>
        <button
          type="button"
          onClick={onAdd}
          className="text-xs text-amber-400 hover:text-amber-300 font-medium"
        >
          + Ekle
        </button>
      </div>
      <div className="space-y-4">
        {items.map((exp) => (
          <div
            key={exp.id}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 space-y-2"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs text-slate-500">Deneyim #{items.indexOf(exp) + 1}</span>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(exp.id)}
                  className="text-slate-400 hover:text-red-400 text-xs"
                >
                  Sil
                </button>
              )}
            </div>
            <input
              placeholder="Şirket"
              value={exp.company}
              onChange={(e) => onUpdate(exp.id, { company: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500/40 outline-none"
            />
            <input
              placeholder="Pozisyon"
              value={exp.role}
              onChange={(e) => onUpdate(exp.id, { role: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500/40 outline-none"
            />
            <input
              placeholder="Konum"
              value={exp.location}
              onChange={(e) => onUpdate(exp.id, { location: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500/40 outline-none"
            />
            <div className="flex gap-2">
              <input
                type="month"
                placeholder="Başlangıç"
                value={exp.startDate}
                onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })}
                className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 focus:ring-1 focus:ring-amber-500/40 outline-none"
              />
              <input
                type="month"
                placeholder="Bitiş"
                value={exp.endDate}
                onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })}
                disabled={exp.current}
                className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 focus:ring-1 focus:ring-amber-500/40 outline-none disabled:opacity-50"
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-400">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => onUpdate(exp.id, { current: e.target.checked })}
                className="rounded border-slate-600 text-amber-500 focus:ring-amber-500/40"
              />
              Hâlâ burada çalışıyorum
            </label>
            <textarea
              placeholder="Sorumluluklar ve başarılar..."
              value={exp.description}
              onChange={(e) => onUpdate(exp.id, { description: e.target.value })}
              rows={3}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500/40 outline-none resize-none"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
