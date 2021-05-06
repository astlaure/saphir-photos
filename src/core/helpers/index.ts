import hbs from 'hbs';
import moduloHelper from './modulo.helper';
import urlHelper from './url.helper';
import concatHelper from './concat.helper';
import isEqualHelper from './is-equal.helper';
import i18nHelper from './i18n.helper';

const registerHelpers = () => {
  hbs.registerHelper('modulo', moduloHelper);
  hbs.registerHelper('url', urlHelper);
  hbs.registerHelper('concat', concatHelper);
  hbs.registerHelper('isEqual', isEqualHelper);
  hbs.registerHelper('t', i18nHelper);
};

export default {
  registerHelpers,
};
