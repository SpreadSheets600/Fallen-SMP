import passport from 'passport';
import { setLoginSession } from '../../lib/auth';

export default async function callback(req, res) {
  passport.authenticate('discord', { failureRedirect: '/' }, async (err, user) => {
    if (err) {
      console.error(err);
      return res.redirect('/login-error');
    }

    const session = { ...user };

    await setLoginSession(res, session);

    res.redirect('/dashboard');
  })(req, res);
}