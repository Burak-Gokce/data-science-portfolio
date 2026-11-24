# Burak Gökçe · Data Scientist portföyü

Astro, TypeScript ve Chart.js ile hazırlanmış statik TR/EN portföy. Türkçe ana sayfa varsayılan giriş. Projeler dört kategoride, detaylar iki dilde.

## Yerel çalıştırma

Node.js 24 ve pnpm 11 ile geliştirilmiştir. Proje klasöründe şu komutları çalıştırın.

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Terminalde gösterilen yerel adresi tarayıcıda açın. Varsayılan adres `http://localhost:4321/`. İngilizce sürüm `/en/`.

```powershell
pnpm build
pnpm test
pnpm preview
```

`pnpm test` iki dilde içerik ve sayfa eşleşmelerini, statik bağlantıları/varlıkları, beklenen CV dosyalarını ve temel gizlilik kurallarını `dist/` üzerinden denetler. Görsel ve PDF denetimleri ayrıca elle yapılır.

## İçerik güncelleme

- Yeni proje için `src/content/projects/` altında mevcut bir JSON yapısını örnek alın. Dosya adı ve `id` aynı olmalı. Kategori `bi`, `ml`, `nlp` veya `dl`. İki dilde başlık, problem, veri, yöntem, sonuç ve sınırlamalar girin. `github` alanı yalnız doğrulanmış bir proje bağlantısı alır, mevcut değilse `null` kullanılır.
- Yeni proje otomatik olarak iki dilde sayfa ve proje listesi girdisi üretir. Belirli bir sıralama için `src/data.ts` içindeki listeyi güncelleyin. Aynı dosyada deneyim, yetkinlik, ekip katkısı ve proje görseli kayıtları bulunur.
- Sertifika için `src/certificates.ts` dosyasına iki dilde başlığı, belge türünü, kurumu, tarihi ve belgede varsa süreyi girin. Belge sahibinin ad ve soyadını koruyan, doğrulama bilgileri gizlenmiş WebP görselini `public/portfolio-assets/certificates/<id>.webp` olarak ekleyin. Orijinal PDF yerel kaynak arşivinde kalır.
- `src/metrics.ts` iki dilin ortak sayısal kaynağıdır. Yalnız sağlayıcısı ve değerlendirme kapsamı belli değerleri girin. Eksik ölçümler için `null` kullanın. Ekran görüntüsü ve tablo sayıları tutarlı olmalı.
- `public/portfolio-assets/` yalnız incelemeden geçmiş, yayımlanabilir türevler içindir. TR ve EN PDF CV dosyaları ayrı tutulur. Orijinal CV, ham veri, Power BI dosyası ve `materials/` yerel arşivde kalır.

## GitHub Pages hazırlığı

Hedef depo `Burak-Gokce/data-science-portfolio`. Ayrı yayın onayı alındıktan sonra depo ayarlarında **Pages → Source → GitHub Actions** seçilir. `.github/workflows/pages.yml` dosyası `main` dalındaki gönderimlerde veya elle tetiklendiğinde hedef depo için çalışır. Pages adresini taklit eden yerel üretim derlemesi için:

```powershell
$env:PORTFOLIO_SITE = 'https://burak-gokce.github.io'
$env:PORTFOLIO_BASE = '/data-science-portfolio'
pnpm build
pnpm test
node scripts/verify-release.mjs --output
```

İş akışı takip edilen dosyaları kontrol eder, kilitli pnpm bağımlılıklarını kurar, derleme ve bağlantı testlerini çalıştırır. Yayına yalnız doğrulanan `dist/` yüklenir. Git deposunda yerel dosya adaylarını listelemek için `node scripts/verify-release.mjs --candidate`, indeks içeriğini kontrol etmek için `node scripts/verify-release.mjs --tracked` çalıştırılabilir.

Yayın öncesi kaynak kodunu, herkese açık depo ve geçmişini, `dist/` içeriğini, tüm görselleri ve indirilebilir PDF’leri kişisel telefon, ev adresi ve referans bilgileri açısından kontrol edin. Bu kontrol görünür metni, bağlantıları ve meta verileri kapsar. İletişim yalnızca LinkedIn ve GitHub üzerinden sağlanır. Görsel paylaşım izinlerini ve dış bağlantı hedeflerini yayın öncesi teyit edin.
