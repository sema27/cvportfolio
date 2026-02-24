import type { Education } from '../../types'

interface EducationFormProps {
  items: Education[]
  onAdd: () => void
  onRemove: (id: string) => void
  onUpdate: (id: string, upd: Partial<Education>) => void
}

export function EducationForm({ items, onAdd, onRemove, onUpdate }: EducationFormProps) {
  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-semibold text-slate-200 flex items-center gap-2">
          <span className="w-1 h-5 bg-amber-500 rounded-full" />
          Eğitim
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
        {items.map((edu) => (
          <div
            key={edu.id}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 space-y-2"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs text-slate-500">Eğitim #{items.indexOf(edu) + 1}</span>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(edu.id)}
                  className="text-slate-400 hover:text-red-400 text-xs"
                >
                  Sil
                </button>
              )}
            </div>
            <input
              placeholder="Okul / Üniversite"
              value={edu.school}
              onChange={(e) => onUpdate(edu.id, { school: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500/40 outline-none"
            />
            <input
              placeholder="Derece (örn: Lisans)"
              value={edu.degree}
              onChange={(e) => onUpdate(edu.id, { degree: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500/40 outline-none"
            />
            <input
              placeholder="Bölüm / Alan"
              value={edu.field}
              onChange={(e) => onUpdate(edu.id, { field: e.target.value })}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500/40 outline-none"
            />
            <div className="flex gap-2">
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => onUpdate(edu.id, { startDate: e.target.value })}
                className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 focus:ring-1 focus:ring-amber-500/40 outline-none"
              />
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })}
                className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 focus:ring-1 focus:ring-amber-500/40 outline-none"
              />
            </div>
            <textarea
              placeholder="Notlar (isteğe bağlı)"
              value={edu.description}
              onChange={(e) => onUpdate(edu.id, { description: e.target.value })}
              rows={2}
              className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500/40 outline-none resize-none"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
