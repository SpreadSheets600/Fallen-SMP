const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
require("dotenv").config();

const app = express();

// Initialize Passport
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ["identify", "email", "guilds"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Store or update user information in your database here
      process.nextTick(() => done(null, profile));
    }
  )
);

// Setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000 // 1 hour
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static('public'));

// Routes
app.get("/auth/discord", passport.authenticate("discord"));
app.get(
  "/auth/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (req, res) => res.redirect("/dashboard")
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/api/user", (req, res) => {
  res.json({ loggedIn: req.isAuthenticated() });
});

app.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/auth/discord");
  
  const user = req.user;
  const userGuilds = user.guilds || [];
  const isMember = userGuilds.some(guild => guild.id === process.env.FALLENSMP_GUILD_ID);

  res.send(`
    <h1>Welcome to the FallenSMP Dashboard, ${user.username}!</h1>
    <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="User Avatar" style="width: 100px; height: 100px; border-radius: 50%;">
    <p>Discord ID: ${user.id}</p>
    <p>Email: ${user.email}</p>
    <p>Account Created: ${new Date(user.createdTimestamp).toLocaleDateString()}</p>
    <p>FallenSMP Discord Member: ${isMember ? 'Yes' : 'No'}</p>
    ${isMember ? '<p>You are ready to play on the FallenSMP server!</p>' : '<p>Please join our Discord server to play on FallenSMP.</p>'}
    <a href="/logout">Logout</a>
  `);
});

module.exports = app;
