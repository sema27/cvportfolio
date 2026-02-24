import { useState, KeyboardEvent } from 'react'

interface SkillsFormProps {
  value: string[]
  onChange: (skills: string[]) => void
}

export function SkillsForm({ value, onChange }: SkillsFormProps) {
  const [input, setInput] = useState('')

  const addSkill = () => {
    const s = input.trim()
    if (s && !value.includes(s)) {
      onChange([...value, s])
      setInput('')
    }
  }

  const removeSkill = (skill: string) => {
    onChange(value.filter((x) => x !== skill))
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 backdrop-blur-sm">
      <h2 className="font-display font-semibold text-slate-200 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-amber-500 rounded-full" />
        Beceriler
      </h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 bg-slate-700 text-slate-200 text-sm px-2.5 py-1 rounded-full"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-slate-400 hover:text-red-400 leading-none"
              aria-label="Kaldır"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={addSkill}
          placeholder="Beceri ekle (Enter veya virgül)"
          className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none"
        />
        <button
          type="button"
          onClick={addSkill}
          className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Ekle
        </button>
      </div>
    </section>
  )
}
