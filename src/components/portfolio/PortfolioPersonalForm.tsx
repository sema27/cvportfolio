import type { PortfolioPersonal } from '../../types/portfolio'

interface Props {
  value: PortfolioPersonal
  onChange: (p: Partial<PortfolioPersonal>) => void
}

export function PortfolioPersonalForm({ value, onChange }: Props) {
  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-3 backdrop-blur-sm">
      <h2 className="font-display font-semibold text-slate-200 mb-2 flex items-center gap-2">
        <span className="w-1 h-5 bg-indigo-500 rounded-full" />
        Kişisel Bilgiler & Hero
      </h2>
      <div className="space-y-2">
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Ad Soyad</span>
          <input
            type="text"
            value={value.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Örn: Ahmet Yılmaz"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Ünvan</span>
          <input
            type="text"
            value={value.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Örn: Frontend Geliştirici"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Kısa tanıtım (hero altı)</span>
          <input
            type="text"
            value={value.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            placeholder="Modern teknolojilerle ölçeklenebilir web çözümleri..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Avatar baş harfleri (örn. SNŞ)</span>
          <input
            type="text"
            value={value.avatarLetters}
            onChange={(e) => onChange({ avatarLetters: e.target.value.toUpperCase().slice(0, 4) })}
            placeholder="ÖRN"
            maxLength={4}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">E-posta</span>
          <input
            type="email"
            value={value.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="email@example.com"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Telefon</span>
          <input
            type="tel"
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="05XX XX XX XX"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Konum</span>
          <input
            type="text"
            value={value.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Sakarya, Türkiye"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">CV linki (indirilebilir PDF)</span>
          <input
            type="url"
            value={value.cvLink}
            onChange={(e) => onChange({ cvLink: e.target.value })}
            placeholder="https://..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">LinkedIn</span>
          <input
            type="url"
            value={value.linkedin}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">GitHub</span>
          <input
            type="url"
            value={value.github}
            onChange={(e) => onChange({ github: e.target.value })}
            placeholder="https://github.com/..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Web sitesi</span>
          <input
            type="url"
            value={value.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="https://..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
      </div>
    </section>
  )
}
