import path from 'path';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.resolve(process.cwd(), 'web/lang/{{lng}}.json'),
      addPath: path.resolve(process.cwd(), 'web/lang/{{lng}}.json'),
    },
    debug: false,
    supportedLngs: ['en', 'fr'],
    fallbackLng: 'en',
    preload: ['en', 'fr'],
    defaultNS: 'translation',
    initImmediate: true,
  });

export default i18next;
