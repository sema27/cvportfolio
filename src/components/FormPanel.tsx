import type { CVData, Experience, Education } from '../types'
import { emptyExperience, emptyEducation } from '../types'
import { PersonalForm } from './forms/PersonalForm'
import { ExperienceForm } from './forms/ExperienceForm'
import { EducationForm } from './forms/EducationForm'
import { SkillsForm } from './forms/SkillsForm'

interface FormPanelProps {
  data: CVData
  onPersonalChange: (p: Partial<CVData['personal']>) => void
  onExperienceChange: (list: Experience[]) => void
  onEducationChange: (list: Education[]) => void
  onSkillsChange: (skills: string[]) => void
}

export function FormPanel({
  data,
  onPersonalChange,
  onExperienceChange,
  onEducationChange,
  onSkillsChange,
}: FormPanelProps) {
  const addExperience = () => {
    onExperienceChange([...data.experience, emptyExperience()])
  }
  const removeExperience = (id: string) => {
    onExperienceChange(data.experience.filter((e) => e.id !== id))
  }
  const updateExperience = (id: string, upd: Partial<Experience>) => {
    onExperienceChange(
      data.experience.map((e) => (e.id === id ? { ...e, ...upd } : e))
    )
  }

  const addEducation = () => {
    onEducationChange([...data.education, emptyEducation()])
  }
  const removeEducation = (id: string) => {
    onEducationChange(data.education.filter((e) => e.id !== id))
  }
  const updateEducation = (id: string, upd: Partial<Education>) => {
    onEducationChange(
      data.education.map((e) => (e.id === id ? { ...e, ...upd } : e))
    )
  }

  return (
    <aside className="w-[420px] shrink-0 border-r border-slate-800/80 bg-slate-900/40 overflow-y-auto">
      <div className="p-4 space-y-5">
        <PersonalForm value={data.personal} onChange={onPersonalChange} />
        <ExperienceForm
          items={data.experience}
          onAdd={addExperience}
          onRemove={removeExperience}
          onUpdate={updateExperience}
        />
        <EducationForm
          items={data.education}
          onAdd={addEducation}
          onRemove={removeEducation}
          onUpdate={updateEducation}
        />
        <SkillsForm value={data.skills} onChange={onSkillsChange} />
      </div>
    </aside>
  )
}
