import type { SkillCategory, SkillItem } from '../../types/portfolio'
import { emptySkillCategory } from '../../types/portfolio'

function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

interface Props {
  categories: SkillCategory[]
  onChange: (categories: SkillCategory[]) => void
}

export function PortfolioSkillsForm({ categories, onChange }: Props) {
  const addCategory = () => {
    onChange([...categories, emptySkillCategory(generateId())])
  }

  const removeCategory = (id: string) => {
    onChange(categories.filter((c) => c.id !== id))
  }

  const updateCategory = (id: string, upd: Partial<SkillCategory>) => {
    onChange(
      categories.map((c) => (c.id === id ? { ...c, ...upd } : c))
    )
  }

  const addSkill = (categoryId: string) => {
    onChange(
      categories.map((c) =>
        c.id === categoryId
          ? { ...c, items: [...c.items, { name: '', percent: 0 }] }
          : c
      )
    )
  }

  const updateSkill = (categoryId: string, index: number, upd: Partial<SkillItem>) => {
    onChange(
      categories.map((c) => {
        if (c.id !== categoryId) return c
        const next = [...c.items]
        next[index] = { ...next[index], ...upd }
        return { ...c, items: next }
      })
    )
  }

  const removeSkill = (categoryId: string, index: number) => {
    onChange(
      categories.map((c) => {
        if (c.id !== categoryId) return c
        return { ...c, items: c.items.filter((_, i) => i !== index) }
      })
    )
  }

  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-3 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-semibold text-slate-200 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full" />
          Yetenekler (kategoriler + yüzde)
        </h2>
        <button
          type="button"
          onClick={addCategory}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
        >
          + Kategori
        </button>
      </div>
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2"
          >
            <div className="flex justify-between items-center">
              <input
                placeholder="Kategori adı (örn. Backend Development)"
                value={cat.title}
                onChange={(e) => updateCategory(cat.id, { title: e.target.value })}
                className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none"
              />
              {categories.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCategory(cat.id)}
                  className="text-slate-400 hover:text-red-400 text-xs ml-2"
                >
                  Kaldır
                </button>
              )}
            </div>
            <div className="space-y-1.5">
              {cat.items.map((item, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    placeholder="Beceri adı"
                    value={item.name}
                    onChange={(e) => updateSkill(cat.id, i, { name: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none"
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={item.percent || ''}
                    onChange={(e) => updateSkill(cat.id, i, { percent: parseInt(e.target.value, 10) || 0 })}
                    placeholder="%"
                    className="w-14 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 focus:ring-1 focus:ring-indigo-500/40 outline-none"
                  />
                  <span className="text-slate-500 text-xs">%</span>
                  {cat.items.length > 0 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(cat.id, i)}
                      className="text-slate-400 hover:text-red-400 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSkill(cat.id)}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                + Beceri ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
