import passport from 'passport';
import LocalStrategy from './local/local.strategy';
import User from '../users/user.model';
import RememberMeStrategy from './remember-me/remember-me.strategy';

passport.use(LocalStrategy);
passport.use(RememberMeStrategy);

passport.serializeUser((user, done) => {
  if (!user) {
    return done(null, false);
  }
  return done(null, (user as User).id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

export default passport;
