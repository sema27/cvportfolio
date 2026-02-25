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

### Portfolio (Yeni)

- **Link kopyala**: Doldurulan portfolio verisini URL içine ekleyip paylaşılabilir bağlantı üretir.
- **JSON indir**: Portfolio verisini `.json` dosyası olarak dışa aktarır (yedekleme/taşıma).
- **JSON yükle**: Daha önce indirilen `.json` dosyasını içe aktarır.
- **Linkten açma**: Paylaşım linki açıldığında portfolio verisi otomatik yüklenir.

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

<img width="1919" height="945" alt="image" src="https://github.com/user-attachments/assets/dfe2e320-2d54-4e68-812b-2acaab39d979" />
