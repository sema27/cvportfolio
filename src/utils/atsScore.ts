import type { CVData } from '../types'

export interface ATSCheck {
  passed: boolean
  label: string
  tip?: string
  points: number
  maxPoints: number
}

export function calculateATSScore(data: CVData): { score: number; checks: ATSCheck[] } {
  const checks: ATSCheck[] = []
  const { personal, experience, education, skills } = data

  const normalizedSkills = skills.map((s) => s.toLowerCase())
  const allText =
    [
      personal.fullName,
      personal.title,
      personal.summary,
      personal.location,
      personal.website,
      personal.linkedin,
      ...experience.flatMap((e) => [e.company, e.role, e.location, e.description]),
      ...education.flatMap((e) => [e.school, e.degree, e.field, e.description]),
      skills.join(' '),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

  // İletişim bilgileri (25 puan)
  const hasEmail = personal.email?.trim().length > 0
  const hasPhone = personal.phone?.trim().length > 0
  checks.push({
    passed: hasEmail,
    label: 'E-posta adresi',
    tip: !hasEmail ? 'E-posta ekleyin; ATS eşleştirmede kullanılır.' : undefined,
    points: hasEmail ? 12 : 0,
    maxPoints: 12,
  })
  checks.push({
    passed: hasPhone,
    label: 'Telefon numarası',
    tip: !hasPhone ? 'Telefon numaranızı ekleyin.' : undefined,
    points: hasPhone ? 13 : 0,
    maxPoints: 13,
  })

  // Kimlik (15 puan)
  const hasName = personal.fullName?.trim().length > 0
  const hasTitle = personal.title?.trim().length > 0
  checks.push({
    passed: hasName,
    label: 'Ad Soyad',
    points: hasName ? 8 : 0,
    maxPoints: 8,
  })
  checks.push({
    passed: hasTitle,
    label: 'Profesyonel ünvan',
    tip: !hasTitle ? 'Hedef rolü yansıtan bir ünvan ekleyin.' : undefined,
    points: hasTitle ? 7 : 0,
    maxPoints: 7,
  })

  // Özet (15 puan)
  const summaryLen = personal.summary?.trim().length ?? 0
  const summaryGood = summaryLen >= 80 && summaryLen <= 400
  const summaryPartial = summaryLen > 0 && summaryLen < 80
  checks.push({
    passed: summaryGood,
    label: 'Özet (80–400 karakter)',
    tip: !summaryGood
      ? summaryPartial
        ? 'Özeti biraz uzatın; anahtar kelimeler ekleyin.'
        : summaryLen > 400
          ? 'Özeti kısaltın; 2–4 cümle yeterli.'
          : 'Profesyonel bir özet ekleyin; ATS anahtar kelime eşleştirmesi yapar.'
      : undefined,
    points: summaryGood ? 15 : summaryPartial || (summaryLen > 400 && summaryLen <= 600) ? 8 : 0,
    maxPoints: 15,
  })

  // Deneyim (25 puan)
  const filledExp = experience.filter((e) => (e.company || e.role) && e.description?.trim().length > 0)
  const hasExpWithDates = filledExp.some((e) => e.startDate || e.endDate || e.current)
  const hasMultipleExp = filledExp.length >= 2
  const avgExpDescLen =
    filledExp.length > 0
      ? filledExp.reduce((sum, e) => sum + (e.description?.trim().length ?? 0), 0) / filledExp.length
      : 0
  const expDescGood = avgExpDescLen >= 120
  const expDescPartial = avgExpDescLen >= 60 && avgExpDescLen < 120
  checks.push({
    passed: filledExp.length >= 1,
    label: 'En az bir iş deneyimi (şirket/rol + açıklama)',
    tip: filledExp.length === 0 ? 'En az bir deneyim ekleyin; şirket, rol ve kısa açıklama yazın.' : undefined,
    points: filledExp.length >= 1 ? 15 : 0,
    maxPoints: 15,
  })
  checks.push({
    passed: hasExpWithDates,
    label: 'Deneyimde tarih bilgisi',
    tip: !hasExpWithDates && filledExp.length > 0 ? 'Başlangıç/bitiş tarihi ekleyin.' : undefined,
    points: hasExpWithDates ? 10 : 0,
    maxPoints: 10,
  })

  checks.push({
    passed: hasMultipleExp,
    label: 'Birden fazla iş deneyimi',
    tip: !hasMultipleExp
      ? 'Son 5–10 yıl içinden en az iki pozisyon eklemeniz önerilir.'
      : undefined,
    points: hasMultipleExp ? 8 : 0,
    maxPoints: 8,
  })

  checks.push({
    passed: expDescGood,
    label: 'Deneyim açıklamalarının detay seviyesi',
    tip: !expDescGood && filledExp.length > 0
      ? expDescPartial
        ? 'Madde madde sorumluluk ve sonuçlar ekleyin; rakamsal etkiler yazın.'
        : 'Görevlerinizi açıklayıcı şekilde, madde madde yazın (ör. “Geliri %15 artırdım”).'
      : undefined,
    points: expDescGood ? 7 : expDescPartial ? 4 : 0,
    maxPoints: 7,
  })

  // Eğitim (10 puan)
  const filledEdu = education.filter((e) => e.school?.trim() || e.degree?.trim())
  checks.push({
    passed: filledEdu.length >= 1,
    label: 'En az bir eğitim (okul veya derece)',
    tip: filledEdu.length === 0 ? 'Eğitim bilginizi ekleyin.' : undefined,
    points: filledEdu.length >= 1 ? 10 : 0,
    maxPoints: 10,
  })

  // Beceriler (10 puan)
  const skillsCount = skills.length
  const skillsGood = skillsCount >= 5
  const skillsPartial = skillsCount >= 2
  checks.push({
    passed: skillsGood,
    label: 'Beceriler (en az 5 önerilir)',
    tip: !skillsGood ? (skillsPartial ? 'Birkaç beceri daha ekleyin; ilanlardaki kelimelerle eşleştirin.' : 'Beceriler bölümünü doldurun.') : undefined,
    points: skillsGood ? 10 : skillsPartial ? 5 : 0,
    maxPoints: 10,
  })

  // Anahtar kelime eşleşmesi (title / summary / skills)
  const hasKeywordMatchWithTitleOrSummary =
    normalizedSkills.length > 0 &&
    normalizedSkills.some((skill) => skill.length > 2 && (personal.title?.toLowerCase().includes(skill) || personal.summary?.toLowerCase().includes(skill)))

  checks.push({
    passed: hasKeywordMatchWithTitleOrSummary,
    label: 'İlan anahtar kelimeleri (beceriler) özet/ünvanda geçiyor',
    tip: !hasKeywordMatchWithTitleOrSummary && normalizedSkills.length > 0
      ? 'En önemli 2–3 beceriyi profesyonel ünvan veya özet bölümünde de geçirin.'
      : undefined,
    points: hasKeywordMatchWithTitleOrSummary ? 8 : 0,
    maxPoints: 8,
  })

  // Genel uzunluk kontrolü (çok kısa / çok uzun CV)
  const totalChars = allText.length
  const lengthOk = totalChars >= 800 && totalChars <= 8000
  const lengthPartial = totalChars >= 400 && totalChars < 800
  const lengthTooLong = totalChars > 8000

  checks.push({
    passed: lengthOk && !lengthTooLong,
    label: 'CV uzunluğu',
    tip: lengthTooLong
      ? 'CV çok uzun; en güncel ve ilgili deneyimlere odaklanarak kısaltın.'
      : !lengthOk
        ? lengthPartial
          ? 'Biraz daha detay ekleyin; görev ve başarılarınızı açın.'
          : 'CV çok kısa; deneyim, eğitim ve beceri bölümlerini doldurun.'
        : undefined,
    points: lengthOk && !lengthTooLong ? 7 : lengthPartial ? 3 : 0,
    maxPoints: 7,
  })

  const total = checks.reduce((s, c) => s + c.points, 0)
  const maxTotal = checks.reduce((s, c) => s + c.maxPoints, 0)
  const score = maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0

  return { score: Math.min(100, score), checks }
}

export function getATSScoreLabel(score: number): string {
  if (score >= 85) return 'Mükemmel'
  if (score >= 70) return 'İyi'
  if (score >= 50) return 'Orta'
  if (score >= 30) return 'Geliştirilmeli'
  return 'Eksik'
}
