import type { PortfolioAbout } from '../../types/portfolio'

interface Props {
  value: PortfolioAbout
  onChange: (a: Partial<PortfolioAbout>) => void
}

export function PortfolioAboutForm({ value, onChange }: Props) {
  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-3 backdrop-blur-sm">
      <h2 className="font-display font-semibold text-slate-200 mb-2 flex items-center gap-2">
        <span className="w-1 h-5 bg-indigo-500 rounded-full" />
        Hakkımda & İstatistikler
      </h2>
      <div className="space-y-2">
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Hakkımda metni</span>
          <textarea
            value={value.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            placeholder="Kısa kendinizi anlatan paragraf..."
            rows={4}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none resize-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Derece / Bölüm</span>
          <input
            type="text"
            value={value.degree}
            onChange={(e) => onChange({ degree: e.target.value })}
            placeholder="Yazılım Mühendisliği"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Okul / Üniversite</span>
          <input
            type="text"
            value={value.school}
            onChange={(e) => onChange({ school: e.target.value })}
            placeholder="Manisa Celal Bayar Üniversitesi"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">GPA (opsiyonel)</span>
          <input
            type="text"
            value={value.gpa}
            onChange={(e) => onChange({ gpa: e.target.value })}
            placeholder="3.62"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs text-slate-400 block mb-1">Uzmanlık alanları (virgülle ayırın)</span>
          <input
            type="text"
            value={value.expertise}
            onChange={(e) => onChange({ expertise: e.target.value })}
            placeholder="Fullstack, Web Development"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none"
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-xs text-slate-400 block mb-1">Yıl deneyim</span>
            <input
              type="text"
              value={value.yearsExperience}
              onChange={(e) => onChange({ yearsExperience: e.target.value })}
              placeholder="2+"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-400 block mb-1">Proje sayısı</span>
            <input
              type="text"
              value={value.projectsCount}
              onChange={(e) => onChange({ projectsCount: e.target.value })}
              placeholder="5+"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-400 block mb-1">Teknoloji sayısı</span>
            <input
              type="text"
              value={value.technologiesCount}
              onChange={(e) => onChange({ technologiesCount: e.target.value })}
              placeholder="15+"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-400 block mb-1">Müşteri sayısı (opsiyonel)</span>
            <input
              type="text"
              value={value.clientsCount}
              onChange={(e) => onChange({ clientsCount: e.target.value })}
              placeholder="5+"
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/40 outline-none"
            />
          </label>
        </div>
      </div>
    </section>
  )
}
