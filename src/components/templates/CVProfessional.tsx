import type { CVData } from '../../types'

function formatDate(date: string) {
  if (!date) return ''
  const [y, m] = date.split('-')
  const months = 'Ocak Şubat Mart Nisan Mayıs Haziran Temmuz Ağustos Eylül Ekim Kasım Aralık'.split(' ')
  return m ? `${months[parseInt(m, 10) - 1]} ${y}` : y
}

export function CVProfessional({ data }: { data: CVData }) {
  const { personal, experience, education, skills } = data

  return (
    <div className="min-h-full flex flex-col font-sans text-slate-800">
      <header className="bg-slate-700 text-white px-8 py-6">
        <h1 className="text-2xl font-display font-bold tracking-tight">
          {personal.fullName || 'Ad Soyad'}
        </h1>
        {personal.title && (
          <p className="text-slate-200 text-sm mt-1">{personal.title}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-slate-300 text-sm">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && (
            <a href={personal.linkedin} className="text-blue-200 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          )}
          {personal.website && (
            <a href={personal.website} className="text-blue-200 hover:underline" target="_blank" rel="noopener noreferrer">Web</a>
          )}
        </div>
      </header>

      <div className="flex-1 px-8 py-6 space-y-5">
        {personal.summary && (
          <section>
            <h2 className="text-xs font-display font-semibold uppercase tracking-wider text-slate-600 border-b border-slate-400 pb-1 mb-2">
              Özet
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">{personal.summary}</p>
          </section>
        )}

        {experience.some((e) => e.company || e.role) && (
          <section>
            <h2 className="text-xs font-display font-semibold uppercase tracking-wider text-slate-600 border-b border-slate-400 pb-1 mb-2">
              İş Deneyimi
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-2 flex-wrap">
                    <div>
                      <span className="font-semibold text-slate-900">{exp.role || 'Pozisyon'}</span>
                      {exp.company && <span className="text-slate-600"> · {exp.company}</span>}
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {exp.startDate && formatDate(exp.startDate)}
                      {exp.startDate && (exp.endDate || exp.current) && ' – '}
                      {exp.current ? 'Şu an' : exp.endDate ? formatDate(exp.endDate) : ''}
                    </span>
                  </div>
                  {exp.location && <p className="text-xs text-slate-500 mt-0.5">{exp.location}</p>}
                  {exp.description && (
                    <p className="text-sm text-slate-700 mt-1.5 whitespace-pre-line leading-relaxed">
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
            <h2 className="text-xs font-display font-semibold uppercase tracking-wider text-slate-600 border-b border-slate-400 pb-1 mb-2">
              Eğitim
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline gap-2 flex-wrap">
                    <div>
                      <span className="font-semibold text-slate-900">{edu.degree || 'Derece'}</span>
                      {edu.field && <span className="text-slate-600">, {edu.field}</span>}
                      {edu.school && <span className="text-slate-600"> · {edu.school}</span>}
                    </div>
                    <span className="text-xs text-slate-500">
                      {edu.startDate && formatDate(edu.startDate)}
                      {edu.startDate && edu.endDate && ' – '}
                      {edu.endDate && formatDate(edu.endDate)}
                    </span>
                  </div>
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
            <h2 className="text-xs font-display font-semibold uppercase tracking-wider text-slate-600 border-b border-slate-400 pb-1 mb-2">
              Beceriler
            </h2>
            <p className="text-sm text-slate-700">{skills.join(', ')}</p>
          </section>
        )}
      </div>
    </div>
  )
}
