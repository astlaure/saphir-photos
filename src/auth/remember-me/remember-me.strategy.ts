import { Strategy } from 'passport-remember-me-extended';
import TokenUtil from './token.util';

const RememberMeStrategy = new Strategy({}, async (token, done) => {
  try {
    const user = await TokenUtil.consume(token);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}, async (user, done) => {
  try {
    const token = await TokenUtil.issue(user);
    return done(null, token);
  } catch (err) {
    return done(err);
  }
});

export default RememberMeStrategy;
