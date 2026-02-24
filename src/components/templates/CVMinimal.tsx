import type { CVData } from '../../types'

function formatDate(date: string) {
  if (!date) return ''
  const [y, m] = date.split('-')
  const months = 'Ocak Şubat Mart Nisan Mayıs Haziran Temmuz Ağustos Eylül Ekim Kasım Aralık'.split(' ')
  return m ? `${months[parseInt(m, 10) - 1]} ${y}` : y
}

export function CVMinimal({ data }: { data: CVData }) {
  const { personal, experience, education, skills } = data

  return (
    <div className="min-h-full flex flex-col font-sans text-slate-800">
      <header className="px-8 pt-8 pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
          {personal.fullName || 'Ad Soyad'}
        </h1>
        {personal.title && (
          <p className="text-slate-500 text-sm mt-0.5">{personal.title}</p>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-xs text-slate-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>·</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>·</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && (
            <>
              <span>·</span>
              <a href={personal.linkedin} className="text-slate-700 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </>
          )}
          {personal.website && (
            <>
              <span>·</span>
              <a href={personal.website} className="text-slate-700 hover:underline" target="_blank" rel="noopener noreferrer">Web</a>
            </>
          )}
        </div>
      </header>

      <div className="flex-1 px-8 py-5 space-y-5">
        {personal.summary && (
          <section>
            <h2 className="text-[11px] font-display font-semibold uppercase tracking-widest text-slate-400 mb-2">
              Özet
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{personal.summary}</p>
          </section>
        )}

        {experience.some((e) => e.company || e.role) && (
          <section>
            <h2 className="text-[11px] font-display font-semibold uppercase tracking-widest text-slate-400 mb-2">
              İş Deneyimi
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-2 flex-wrap">
                    <span className="font-medium text-slate-900">{exp.role || 'Pozisyon'}</span>
                    <span className="text-xs text-slate-400">
                      {exp.startDate && formatDate(exp.startDate)}
                      {exp.startDate && (exp.endDate || exp.current) && ' – '}
                      {exp.current ? 'Şu an' : exp.endDate ? formatDate(exp.endDate) : ''}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {exp.company}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-slate-600 mt-1.5 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.some((e) => e.school || e.degree) && (
          <section>
            <h2 className="text-[11px] font-display font-semibold uppercase tracking-widest text-slate-400 mb-2">
              Eğitim
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline gap-2 flex-wrap">
                    <span className="font-medium text-slate-900">
                      {edu.degree}
                      {edu.field && `, ${edu.field}`}
                    </span>
                    <span className="text-xs text-slate-400">
                      {edu.startDate && formatDate(edu.startDate)}
                      {edu.startDate && edu.endDate && ' – '}
                      {edu.endDate && formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{edu.school}</p>
                  {edu.description && (
                    <p className="text-sm text-slate-600 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-display font-semibold uppercase tracking-widest text-slate-400 mb-2">
              Beceriler
            </h2>
            <p className="text-sm text-slate-600">{skills.join(' · ')}</p>
          </section>
        )}
      </div>
    </div>
  )
}
