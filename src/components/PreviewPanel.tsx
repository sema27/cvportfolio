import type { ComponentType } from 'react'
import type { CVData } from '../types'
import { CVModern } from './templates/CVModern'
import { CVClassic } from './templates/CVClassic'
import { CVProfessional } from './templates/CVProfessional'
import { CVMinimal } from './templates/CVMinimal'

export type TemplateId = 'modern' | 'classic' | 'professional' | 'minimal'

interface PreviewPanelProps {
  data: CVData
  template: TemplateId
  id: string
}

const TEMPLATES: Record<TemplateId, ComponentType<{ data: CVData }>> = {
  modern: CVModern,
  classic: CVClassic,
  professional: CVProfessional,
  minimal: CVMinimal,
}

export function PreviewPanel({ data, template, id }: PreviewPanelProps) {
  const Template = TEMPLATES[template]
  return (
    <div className="flex-1 min-w-0 flex items-start justify-center p-6 overflow-auto">
      <div
        id={id}
        className="w-full max-w-[210mm] bg-white text-slate-800 shadow-[0_0_40px_-10px_rgba(0,0,0,0.25)] rounded-xl overflow-hidden ring-1 ring-slate-800/50"
        style={{ minHeight: '297mm' }}
      >
        {Template && <Template data={data} />}
      </div>
    </div>
  )
}
