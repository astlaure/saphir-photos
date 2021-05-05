import hbs from 'hbs';
import moduloHelper from './modulo.helper';
import urlHelper from './url.helper';
import concatHelper from './concat.helper';
import isEqualHelper from './is-equal.helper';

const registerHelpers = () => {
  hbs.registerHelper('modulo', moduloHelper);
  hbs.registerHelper('url', urlHelper);
  hbs.registerHelper('concat', concatHelper);
  hbs.registerHelper('isEqual', isEqualHelper);
}

export default {
  registerHelpers,
}
