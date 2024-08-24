const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/script.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`
    document.addEventListener("DOMContentLoaded", () => {
      const firebaseConfig = {
        apiKey: "${process.env.FIREBASE_API_KEY}",
        authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
        projectId: "${process.env.FIREBASE_PROJECT_ID}",
        storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
        messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
        appId: "${process.env.FIREBASE_APP_ID}"
      };

      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const perf = getPerformance(app);

    });
  `);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
