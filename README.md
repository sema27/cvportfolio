# CV Oluşturucu

Resume Maker Pro tarzında, form doldurup canlı önizleme ile CV oluşturup PDF indirebileceğiniz tek sayfa uygulama.

## Özellikler

- **Çift panel**: Solda form, sağda anlık CV önizlemesi
- **Kişisel bilgiler**: Ad, ünvan, iletişim, özet, LinkedIn, web
- **İş deneyimi**: Birden fazla deneyim ekleyip düzenleme
- **Eğitim**: Birden fazla eğitim kaydı
- **Beceriler**: Etiket şeklinde ekleme (Enter veya virgül ile)
- **İki şablon**: Modern (koyu başlık) ve Klasik (sade)
- **PDF indir**: Önizlemeyi A4 PDF olarak indirme

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

## Build

```bash
npm run build
npm run preview   # dist ile önizleme
```

## Teknolojiler

- React 18 + TypeScript
- Vite
- Tailwind CSS
- jsPDF + html2canvas (PDF export)
