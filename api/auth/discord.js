import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: `${
        process.env.VERCEL_URL || "http://localhost:3000"
      }/api/auth/callback`,
      scope: ["identify", "email", "guilds"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you would typically save the profile to your database
      return done(null, profile);
    }
  )
);

export default function handler(req, res) {
  passport.authenticate("discord", {
    session: false,
    callbackURL: `${
      process.env.VERCEL_URL || "http://localhost:3000"
    }/api/auth/callback`,
  })(req, res, () => {});
}
