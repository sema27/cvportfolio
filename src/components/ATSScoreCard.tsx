import { useMemo } from 'react'
import type { CVData } from '../types'
import { calculateATSScore, getATSScoreLabel } from '../utils/atsScore'

interface ATSScoreCardProps {
  data: CVData
}

export function ATSScoreCard({ data }: ATSScoreCardProps) {
  const { score, checks } = useMemo(() => calculateATSScore(data), [data])
  const label = getATSScoreLabel(score)
  const tips = checks.filter((c) => c.tip && !c.passed)

  const scoreColor =
    score >= 85
      ? 'text-emerald-400'
      : score >= 70
        ? 'text-green-400'
        : score >= 50
          ? 'text-amber-400'
          : score >= 30
            ? 'text-orange-400'
            : 'text-red-400'

  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-700/80 p-4 backdrop-blur-sm sticky top-24">
      <h2 className="font-display font-semibold text-slate-200 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-emerald-500 rounded-full" />
        ATS Uyumluluk Puanı
      </h2>
      <p className="text-xs text-slate-400 mb-3">
        CV’niz otomatik tarama sistemlerinde (ATS) ne kadar iyi parse edilir ve eşleşir?
      </p>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-600"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={score >= 85 ? 'text-emerald-400' : score >= 70 ? 'text-green-400' : score >= 50 ? 'text-amber-400' : 'text-orange-400'}
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className={`absolute text-lg font-bold ${scoreColor}`}>{score}</span>
        </div>
        <div>
          <p className={`font-display font-semibold ${scoreColor}`}>{label}</p>
          <p className="text-xs text-slate-500">100 üzerinden</p>
        </div>
      </div>

      <ul className="space-y-1.5 text-sm">
        {checks.map((c) => (
          <li key={c.label} className="flex items-center gap-2">
            {c.passed ? (
              <span className="text-emerald-400" aria-hidden>✓</span>
            ) : (
              <span className="text-slate-500" aria-hidden>○</span>
            )}
            <span className={c.passed ? 'text-slate-300' : 'text-slate-400'}>
              {c.label}
              {c.maxPoints > 0 && (
                <span className="text-slate-500 text-xs ml-1">
                  ({c.points}/{c.maxPoints})
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {tips.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-700">
          <p className="text-xs font-medium text-amber-300 mb-2">Öneriler</p>
          <ul className="text-xs text-slate-400 space-y-1">
            {tips.map((t) => (
              <li key={t.label}>• {t.tip}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
