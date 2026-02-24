export interface PortfolioPersonal {
  fullName: string
  title: string
  tagline: string
  email: string
  phone: string
  location: string
  cvLink: string
  linkedin: string
  github: string
  website: string
  avatarLetters: string // örn. "SNŞ" - baş harfler
}

export interface PortfolioAbout {
  bio: string
  degree: string
  school: string
  gpa: string
  expertise: string // örn. "Fullstack, Web Development"
  yearsExperience: string
  projectsCount: string
  technologiesCount: string
  clientsCount: string
}

export interface SkillItem {
  name: string
  percent: number
}

export interface SkillCategory {
  id: string
  title: string
  items: SkillItem[]
}

export interface PortfolioProject {
  id: string
  title: string
  shortDescription: string
  tags: string[]
  link: string
  imageUrl: string
  featured: boolean
}

export interface PortfolioExperience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  bullets: string[]
}

export interface PortfolioData {
  personal: PortfolioPersonal
  about: PortfolioAbout
  skillCategories: SkillCategory[]
  projects: PortfolioProject[]
  experience: PortfolioExperience[]
}

export const emptyPortfolioPersonal: PortfolioPersonal = {
  fullName: '',
  title: '',
  tagline: '',
  email: '',
  phone: '',
  location: '',
  cvLink: '',
  linkedin: '',
  github: '',
  website: '',
  avatarLetters: '',
}

export const emptyPortfolioAbout: PortfolioAbout = {
  bio: '',
  degree: '',
  school: '',
  gpa: '',
  expertise: '',
  yearsExperience: '',
  projectsCount: '',
  technologiesCount: '',
  clientsCount: '',
}

export function emptySkillCategory(id: string): SkillCategory {
  return { id, title: '', items: [] }
}

export function emptyPortfolioProject(id: string): PortfolioProject {
  return {
    id,
    title: '',
    shortDescription: '',
    tags: [],
    link: '',
    imageUrl: '',
    featured: false,
  }
}

export function emptyPortfolioExperience(id: string): PortfolioExperience {
  return {
    id,
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    current: false,
    bullets: [],
  }
}

const PORTFOLIO_STORAGE_KEY = 'cvportfolio-portfolio-data'

export function savePortfolioToStorage(data: PortfolioData): void {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data))
  } catch (_) {}
}

export function loadPortfolioFromStorage(): PortfolioData | null {
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PortfolioData
  } catch (_) {
    return null
  }
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export function getInitialPortfolioData(): PortfolioData {
  return {
    personal: { ...emptyPortfolioPersonal },
    about: { ...emptyPortfolioAbout },
    skillCategories: [
      { id: generateId(), title: '', items: [] },
    ],
    projects: [emptyPortfolioProject(generateId())],
    experience: [emptyPortfolioExperience(generateId())],
  }
}
