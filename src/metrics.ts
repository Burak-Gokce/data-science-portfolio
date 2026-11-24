export type Metric = {
  labels: string[][];
  series: { title: string[]; values: (number | null)[]; unit?: string }[];
  source: string | string[];
};
export const metrics: Record<string, Metric> = {
  instacart: {
    labels: [['Çoğunluk baseline’ı','Majority baseline'], ['Logistic Regression'], ['Balanced Logistic Regression'], ['Random Forest']],
    series: [
      { title: ['F1'], values: [0, .10, .34, .35] },
      { title: ['ROC-AUC'], values: [null,.712,.722,.738] },
      { title: ['PR-AUC'], values: [null,.267,.265,.289] },
      { title: ['Accuracy'], values: [90.22,90.23,80.31,84.85], unit: '%' },
      { title: ['Recall'], values: [0,.05,.51,.41] },
      { title: ['Precision'], values: [0,.50,.25,.30] },
    ],
    source: 'Instacart_08',
  },
  'the-movies': {
    labels: [['Linear Regression'],['Gradient Boosting'],['Tuned Gradient Boosting'],['XGBoost'],['Random Forest']],
    series: [{ title: ['Test R²'], values: [.523,.499,.497,.475,.458] }],
    source: 'The_Movies_07',
  },
  'house-prices': {
    labels: [['Decision Tree · baseline'],['Ridge'],['Random Forest'],['Extra Trees']],
    series: [{ title: ['5 katlı CV RMSLE','Five-fold CV RMSLE'], values: [.214965,.152918,.146626,.142746] }],
    source: 'House Prices · 34, 72–75',
  },
  'regression-models': {
    labels: [['Lasso'],['Ayarlı Lasso','Tuned Lasso'],['ElasticNet'],['Ayarlı ElasticNet','Tuned ElasticNet']],
    series: [{ title: ['Test RMSE'], values: [356.10,363.68,357.17,393.98] }],
    source: ['Regresyon Modelleri · 143–176', 'Regression Models · 143–176'],
  },
  'movie-reviews': {
    labels: [['Unigram'],['Bigram']],
    series: [{ title: ['5 katlı CV accuracy','Five-fold CV accuracy'], values: [81.55,82.80], unit: '%' }],
    source: 'Movie Reviews · 15, 19',
  },
  'olist-bad-reviews': {
    labels: [['Konu 0','Topic 0'],['Konu 1','Topic 1'],['Konu 2','Topic 2']],
    series: [{ title: ['Seçili alt kümede yorum sayısı','Review count in selected subset'], values: [194,91,129] }],
    source: 'Olist Bad Reviews · 64',
  },
  'multiclass-classification': {
    labels: [['Baseline'],['50 epoch','50 epochs'],['1.000 epoch','1,000 epochs']],
    series: [{ title: ['Test accuracy'], values: [14.29,65,56.67], unit: '%' }],
    source: 'Multiclass Classification · 27–35',
  },
  'salary-prediction': {
    labels: [['Son maaş baseline’ı','Last-salary baseline'],['SimpleRNN'],['LSTM']],
    series: [{ title: ['Test MAE'], values: [605.15,278.11,244.51], unit: 'USD' }],
    source: 'RNN & LSTM Salary Prediction · 34, 38, 46',
  },
  'ecg-classification': {
    labels: [0,1,2,3,4].map(x => ['Sınıf '+x,'Class '+x]),
    series: [
      { title: ['Test sınıf dağılımı','Test class distribution'], values: [14494,445,1158,128,1286] },
      { title: ['Model tahminleri','Model predictions'], values: [17511,0,0,0,0] },
    ],
    source: 'ECG Classification · 47–52',
  },
};
