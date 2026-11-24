import { getCollection } from 'astro:content';

export type Lang = 'tr' | 'en';
export const languages: Lang[] = ['tr', 'en'];
export const categories = {
  tr: { bi: 'Veri Analitiği ve İş Zekâsı', ml: 'Makine Öğrenmesi', nlp: 'Doğal Dil İşleme', dl: 'Derin Öğrenme' },
  en: { bi: 'Data Analytics & BI', ml: 'Machine Learning', nlp: 'Natural Language Processing', dl: 'Deep Learning' },
};
const order = ['instacart', 'the-movies', 'house-prices', 'regression-models', 'ham-or-spam', 'movie-reviews', 'lda-topic-modeling', 'olist-bad-reviews', 'tensorflow-playground', 'multiclass-classification', 'salary-prediction', 'ecg-classification'];
const orderById = new Map(order.map((id, index) => [id, index]));
export const projects = (await getCollection('projects')).map(entry => entry.data)
  .sort((a, b) => (orderById.get(a.id) ?? order.length) - (orderById.get(b.id) ?? order.length) || a.id.localeCompare(b.id));
export const socials = {
  LinkedIn: 'https://www.linkedin.com/in/burak-g%C3%B6k%C3%A7e-6b371b23b/',
  GitHub: 'https://github.com/Burak-Gokce',
};
export const route = (path = '') => import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
export const home = (lang: Lang) => route(lang + '/');
export const detail = (lang: Lang, id: string) => home(lang) + (lang === 'tr' ? 'projeler/' : 'projects/') + id + '/';
export const asset = (file: string) => route('portfolio-assets/' + file);
export const bio = {
  tr: 'Ekonometri altyapımı Akbank’taki üç yıllık bankacılık ve operasyon deneyimimle birleştiriyorum. Veri analizi, makine öğrenmesi ve iş zekâsı projeleriyle karar almaya temel oluşturacak bulgular üretiyorum.',
  en: 'I combine a background in econometrics with three years of banking and operations experience at Akbank. My work in data analytics, machine learning, and business intelligence turns data into evidence for decision-making.',
};
export const timeline = [
  { date: ['Devam ediyor','In progress'], org: ['Workintech','Workintech'], title: ['Data Scientist & AI','Data Scientist & AI'], description: ['Makine öğrenmesi, derin öğrenme ve veri bilimi eğitimi.','Training in machine learning, deep learning, and data science.'] },
  { date: ['Ekim 2026','October 2026'], org: ['Workintech','Workintech'], title: ['Data Analyst Programı','Data Analyst Program'], description: ['432 saatlik tamamlanmış program.','Completed 432-hour program.'] },
  { date: ['Haziran 2023 – Temmuz 2026','June 2023 – July 2026'], org: ['Akbank','Akbank'], title: ['Müşteri Hizmetleri Yetkilisi','Customer Service Officer'], description: ['Gişe ve hesap işlemleri, kasa ve ATM yönetimi, gün sonu ve operasyonel kontroller.','Branch and account transactions, cash and ATM operations, end-of-day processes, and operational controls.'] },
  { date: ['2022 – Devam ediyor','2022 – Present'], org: ['İstanbul Üniversitesi','Istanbul University'], title: ['Yönetim Bilişim Sistemleri','Management Information Systems'], description: ['',''] },
  { date: ['2013–2020','2013–2020'], org: ['İstanbul Üniversitesi','Istanbul University'], title: ['Ekonometri lisansı','Bachelor’s in Econometrics'], description: ['',''] },
];
export const skills = [
  { name: ['Veri analizi','Data analytics'], items: ['Python','SQL','Pandas','NumPy','Matplotlib','Seaborn'] },
  { name: ['İş zekâsı ve veri modelleme','BI & data modeling'], items: ['Power BI','Looker Studio','BigQuery','dbt'] },
  { name: ['Makine öğrenmesi ve NLP','Machine learning & NLP'], items: ['Scikit-learn','NLTK','LDA','CountVectorizer'] },
  { name: ['Derin öğrenme ve araçlar','Deep learning & tools'], items: ['TensorFlow','Keras','RNN','LSTM','Jupyter','Git','Docker'] },
];
export const teams: Record<string, { names: string; contribution: string[] }> = {
  instacart: { names: 'Damla Eraslan · Burak Gökçe · Buse Hancı Akdoğan', contribution: ['BigQuery ve dbt ile veri modelleme, Power BI ile yedi KPI’ın görselleştirilmesi ve tekrar satın alma davranışının incelenmesi.', 'Data modeling in BigQuery and dbt, visualization of seven KPIs in Power BI, and analysis of repeat purchasing behavior.'] },
  'the-movies': { names: 'Damla Eraslan · Gülay Yıldırım · Burak Gökçe · Gökberk Ozan', contribution: ['BigQuery ve dbt ile analiz, Power BI görselleştirmesi ve Python ile gişe geliri tahmin modellerinin karşılaştırılması.', 'Analysis with BigQuery and dbt, Power BI visualization, and comparison of box office prediction models in Python.'] },
};
export const media: Record<string, { file: string; caption: string[] }[]> = {
  instacart: [
    { file: 'instacart-kpi.webp', caption: ['Sipariş, müşteri ve ürün KPI’ları','Order, customer, and product KPIs'] },
    { file: 'instacart-time.webp', caption: ['Gün ve saat bazında alışveriş yoğunluğu','Shopping activity by day and hour'] },
    { file: 'instacart-model.webp', caption: ['Tekrar satın alma model karşılaştırması','Repeat purchase model comparison'] },
  ],
  'the-movies': [
    { file: 'movies-overview.webp', caption: ['Film analizi ve finansal özet','Film analysis and financial overview'] },
    { file: 'movies-budget.webp', caption: ['Bütçe, gişe geliri ve zarar oranı','Budget, box office revenue, and loss rate'] },
    { file: 'movies-model.webp', caption: ['Gişe geliri tahmin modeli karşılaştırması','Box office prediction model comparison'] },
  ],
  'house-prices': [{ file: 'kaggle-submission.webp', caption: ['Başarılı Kaggle gönderim kaydı','Successful Kaggle submission record'] }],
};
