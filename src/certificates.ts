type Certificate = {
  id: string;
  title: { tr: string; en: string };
  issuer: string;
  date: string;
  kind: 'completion' | 'participation';
  hours?: number;
  featured?: boolean;
};

const records: Certificate[] = [
  { id: 'workintech-data-analyst', issuer: 'Workintech', title: { tr: 'Data Analyst', en: 'Data Analyst' }, date: '2026', kind: 'completion', hours: 432, featured: true },
  { id: 'miuul-python-data-science', issuer: 'Miuul', title: { tr: 'Python Programming for Data Science', en: 'Python Programming for Data Science' }, date: '2023-01-10', kind: 'completion' },
  { id: 'btk-microsoft-excel', issuer: 'BTK Akademi', title: { tr: 'Microsoft Excel Temelleri', en: 'Microsoft Excel Fundamentals' }, date: '2022-10-31', kind: 'participation' },
  { id: 'udemy-sql', issuer: 'Udemy', title: { tr: 'SQL Kursu: Sıfırdan Sektörün Yükseklerine | 2020', en: 'SQL Course: From Beginner to Industry-Ready | 2020' }, date: '2022-06-18', kind: 'completion', hours: 8 },
  { id: 'udemy-machine-learning', issuer: 'Udemy', title: { tr: '(2020) Python ile Makine Öğrenmesi (Machine Learning)', en: '(2020) Machine Learning with Python' }, date: '2022-02-27', kind: 'completion', hours: 28.5 },
  { id: 'btk-python-tensorflow', issuer: 'BTK Akademi', title: { tr: 'Veri Bilimi İçin Python ve Tensorflow', en: 'Python and TensorFlow for Data Science' }, date: '2022-01-30', kind: 'participation' },
  { id: 'btk-python-programming', issuer: 'BTK Akademi', title: { tr: 'Sıfırdan İleri Seviye Python Programlama', en: 'Python Programming: Beginner to Advanced' }, date: '2021-09-10', kind: 'participation' },
];

export const certificates = [...records].sort((a,b) =>
  Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.date.localeCompare(a.date)
);
