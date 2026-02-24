import { useState, KeyboardEvent } from 'react'
import type { PortfolioProject } from '../../types/portfolio'
import { emptyPortfolioProject } from '../../types/portfolio'

function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

interface Props {
  projects: PortfolioProject[]
  onChange: (projects: PortfolioProject[]) => void
}

export function PortfolioProjectsForm({ projects, onChange }: Props) {
  const addProject = () => {
    onChange([...projects, emptyPortfolioProject(generateId())])
  }

  const removeProject = (id: string) => {
    onChange(projects.filter((p) => p.id !== id))
  }

  const updateProject = (id: string, upd: Partial<PortfolioProject>) => {
    onChange(
      projects.map((p) => (p.id === id ? { ...p, ...upd } : p))
    )
  }

  const addTag = (id: string, tag: string) => {
    if (!tag.trim()) return
    const proj = projects.find((p) => p.id === id)
    if (!proj || proj.tags.includes(tag.trim())) return
    updateProject(id, { tags: [...proj.tags, tag.trim()] })
  }

  const removeTag = (id: string, tag: string) => {
    const proj = projects.find((p) => p.id === id)
    if (!proj) return
    updateProject(id, { tags: proj.tags.filter((t) => t !== tag) })
  }

  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-3 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-semibold text-slate-200 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full" />
          Projeler
        </h2>
        <button
          type="button"
          onClick={addProject}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
        >
          + Proje
        </button>
      </div>
      <div className="space-y-3">
        {projects.map((proj, idx) => (
          <ProjectRow
            key={proj.id}
            proj={proj}
            index={idx}
            onUpdate={(upd) => updateProject(proj.id, upd)}
            onRemove={() => removeProject(proj.id)}
            onAddTag={(tag) => addTag(proj.id, tag)}
            onRemoveTag={(tag) => removeTag(proj.id, tag)}
            canRemove={projects.length > 1}
          />
        ))}
      </div>
    </section>
  )
}

interface ProjectRowProps {
  proj: PortfolioProject
  index: number
  onUpdate: (upd: Partial<PortfolioProject>) => void
  onRemove: () => void
  onAddTag: (tag: string) => void
  onRemoveTag: (tag: string) => void
  canRemove: boolean
}

function ProjectRow({ proj, index, onUpdate, onRemove, onAddTag, onRemoveTag, canRemove }: ProjectRowProps) {
  const [tagInput, setTagInput] = useState('')

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      onAddTag(tagInput)
      setTagInput('')
    }
  }

  return (
    <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500">Proje #{index + 1}</span>
        {canRemove && (
          <button type="button" onClick={onRemove} className="text-slate-400 hover:text-red-400 text-xs">
            Sil
          </button>
        )}
      </div>
      <label className="block">
        <span className="text-xs text-slate-400">Başlık</span>
        <input
          value={proj.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Proje adı"
          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none mt-0.5"
        />
      </label>
      <label className="block">
        <span className="text-xs text-slate-400">Kısa açıklama</span>
        <textarea
          value={proj.shortDescription}
          onChange={(e) => onUpdate({ shortDescription: e.target.value })}
          placeholder="1–2 cümle"
          rows={2}
          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none resize-none mt-0.5"
        />
      </label>
      <label className="block">
        <span className="text-xs text-slate-400">Görsel URL (opsiyonel)</span>
        <input
          type="url"
          value={proj.imageUrl}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          placeholder="https://..."
          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none mt-0.5"
        />
      </label>
      <label className="block">
        <span className="text-xs text-slate-400">Proje linki</span>
        <input
          type="url"
          value={proj.link}
          onChange={(e) => onUpdate({ link: e.target.value })}
          placeholder="https://..."
          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none mt-0.5"
        />
      </label>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`featured-${proj.id}`}
          checked={proj.featured}
          onChange={(e) => onUpdate({ featured: e.target.checked })}
          className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/40"
        />
        <label htmlFor={`featured-${proj.id}`} className="text-xs text-slate-400">
          Öne çıkan
        </label>
      </div>
      <div>
        <span className="text-xs text-slate-400 block mb-1">Etiketler (Enter veya virgül ile ekleyin)</span>
        <div className="flex flex-wrap gap-1 mb-1">
          {proj.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 bg-slate-700 text-slate-200 text-xs px-2 py-0.5 rounded-full"
            >
              {t}
              <button type="button" onClick={() => onRemoveTag(t)} className="text-slate-400 hover:text-red-400 leading-none">
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="React, Tailwind..."
          className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500/40 outline-none"
        />
      </div>
    </div>
  )
}
