export const input = ['src/**/*.{ts,tsx}'];
export const output = './';
export const options = {
  debug: false,
  func: {
    list: ['t'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    input: ['src/**/*.{js,jsx,ts,tsx}'],
  },
  trans: {
    component: 'Trans',
    i18nKey: 'i18nKey',
    defaultsKey: 'defaults',
    fallbackKey: true,
  },
  lngs: ['en', 'pt'],
  defaultLng: 'en',
  defaultNs: 'translation',
  resource: {
    loadPath: 'src/locales/{{lng}}/{{ns}}.json',
    savePath: 'src/locales/{{lng}}/{{ns}}.json',
  },
};
