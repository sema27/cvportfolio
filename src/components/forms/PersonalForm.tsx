import type { PersonalInfo } from '../../types'

interface PersonalFormProps {
  value: PersonalInfo
  onChange: (p: Partial<PersonalInfo>) => void
}

const field = (label: string, name: keyof PersonalInfo, type = 'text', placeholder = '') => ({
  label,
  name,
  type,
  placeholder,
})

const fields = [
  field('Ad Soyad', 'fullName', 'text', 'Örn: Ahmet Yılmaz'),
  field('Ünvan', 'title', 'text', 'Örn: Frontend Developer'),
  field('E-posta', 'email', 'email', 'email@example.com'),
  field('Telefon', 'phone', 'tel', '+90 5XX XXX XX XX'),
  field('Konum', 'location', 'text', 'İstanbul, Türkiye'),
  field('LinkedIn', 'linkedin', 'url', 'https://linkedin.com/in/...'),
  field('Web sitesi', 'website', 'url', 'https://...'),
]

export function PersonalForm({ value, onChange }: PersonalFormProps) {
  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 backdrop-blur-sm">
      <h2 className="font-display font-semibold text-slate-200 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-amber-500 rounded-full" />
        Kişisel Bilgiler
      </h2>
      <div className="space-y-3">
        {fields.map(({ label, name, type, placeholder }) => (
          <label key={name} className="block">
            <span className="text-xs text-slate-400 block mb-1">{label}</span>
            <input
              type={type}
              value={value[name] as string}
              onChange={(e) => onChange({ [name]: e.target.value })}
              placeholder={placeholder}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none"
            />
          </label>
        ))}
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Özet</span>
          <textarea
            value={value.summary}
            onChange={(e) => onChange({ summary: e.target.value })}
            placeholder="Kısa profesyonel özetiniz..."
            rows={4}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none resize-none"
          />
        </label>
      </div>
    </section>
  )
}
