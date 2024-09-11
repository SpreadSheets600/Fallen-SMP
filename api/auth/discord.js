import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { getSession } from '../../lib/auth';

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/auth/callback`,
  scope: ['identify', 'email', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
  // Here you would typically save the profile to your database
  return done(null, profile);
}));

export default async function handler(req, res) {
  const session = await getSession(req, res);
  passport.authenticate('discord')(req, res, () => {});
}