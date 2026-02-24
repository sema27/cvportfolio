import { jsPDF } from 'jspdf'
import type { CVData } from '../types'

const MARGIN = 18
const PAGE_HEIGHT = 297
const CONTENT_WIDTH = 210 - MARGIN * 2
const LINE_HEIGHT = 5.5
const SECTION_GAP = 6
const FONT = 'helvetica'

export function exportToPdf(data: CVData): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  let y = MARGIN
  const maxY = PAGE_HEIGHT - MARGIN

  function checkPageBreak(needed: number) {
    if (y + needed > maxY) {
      doc.addPage()
      y = MARGIN
    }
  }

  function addParagraph(text: string, fontSize: number, isBold = false) {
    doc.setFontSize(fontSize)
    doc.setFont(FONT, isBold ? 'bold' : 'normal')
    const lines = doc.splitTextToSize(text || '', CONTENT_WIDTH)
    for (const line of lines) {
      checkPageBreak(LINE_HEIGHT)
      doc.text(line, MARGIN, y)
      y += LINE_HEIGHT
    }
    doc.setFont(FONT, 'normal')
  }

  function addSectionTitle(title: string) {
    checkPageBreak(SECTION_GAP + LINE_HEIGHT * 1.5)
    y += SECTION_GAP
    doc.setFontSize(11)
    doc.setFont(FONT, 'bold')
    doc.text(title, MARGIN, y)
    y += LINE_HEIGHT * 1.3
  }

  // Başlık
  doc.setFontSize(18)
  doc.setFont(FONT, 'bold')
  doc.text(data.personal.fullName || 'Ad Soyad', MARGIN, y)
  y += LINE_HEIGHT * 1.4

  if (data.personal.title) {
    doc.setFontSize(11)
    doc.setFont(FONT, 'normal')
    doc.text(data.personal.title, MARGIN, y)
    y += LINE_HEIGHT
  }

  const contact: string[] = []
  if (data.personal.email) contact.push(data.personal.email)
  if (data.personal.phone) contact.push(data.personal.phone)
  if (data.personal.location) contact.push(data.personal.location)
  if (data.personal.linkedin) contact.push('LinkedIn: ' + data.personal.linkedin)
  if (data.personal.website) contact.push('Web: ' + data.personal.website)
  if (contact.length > 0) {
    doc.setFontSize(9)
    doc.text(contact.join(' | '), MARGIN, y)
    y += LINE_HEIGHT * 1.2
  }

  y += 3

  if (data.personal.summary) {
    addSectionTitle('Özet')
    addParagraph(data.personal.summary, 10)
  }

  const filledExp = data.experience.filter((e) => e.company || e.role)
  if (filledExp.length > 0) {
    addSectionTitle('İş Deneyimi')
    for (const exp of filledExp) {
      const role = exp.role || 'Pozisyon'
      const company = exp.company ? `, ${exp.company}` : ''
      const dates = [exp.startDate, exp.current ? 'Şu an' : exp.endDate].filter(Boolean).join(' – ') || ''
      addParagraph(`${role}${company}${dates ? ` (${dates})` : ''}`, 10, true)
      if (exp.location) addParagraph(exp.location, 9)
      if (exp.description) addParagraph(exp.description, 9)
    }
  }

  const filledEdu = data.education.filter((e) => e.school || e.degree)
  if (filledEdu.length > 0) {
    addSectionTitle('Eğitim')
    for (const edu of filledEdu) {
      const line = [edu.degree, edu.field, edu.school].filter(Boolean).join(', ')
      const dates = [edu.startDate, edu.endDate].filter(Boolean).join(' – ')
      addParagraph(dates ? `${line} (${dates})` : line, 10, true)
      if (edu.description) addParagraph(edu.description, 9)
    }
  }

  if (data.skills.length > 0) {
    addSectionTitle('Beceriler')
    addParagraph(data.skills.join(', '), 10)
  }

  doc.save('ozgecmis.pdf')
}
