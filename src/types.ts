export interface PersonalInfo {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  linkedin?: string
  website?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

export interface CVData {
  personal: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: string[]
}

export const emptyPersonal: PersonalInfo = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  linkedin: '',
  website: '',
}

export const emptyExperience = (): Experience => ({
  id: crypto.randomUUID(),
  company: '',
  role: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
})

export const emptyEducation = (): Education => ({
  id: crypto.randomUUID(),
  school: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  description: '',
})
