# Why I Saved It — Deployment Guide

## Your project files
```
wisi/
├── index.html       ← the app
├── manifest.json    ← PWA config + share target
├── sw.js            ← service worker (enables install + offline)
├── netlify.toml     ← routing config for Netlify
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## Step 1 — Deploy to Netlify (free, 5 mins)

1. Go to **netlify.com** and sign up for free
2. From your dashboard click **"Add new site" → "Deploy manually"**
3. Drag and drop your entire `wisi/` folder onto the upload area
4. Netlify gives you a live HTTPS URL like `https://your-app.netlify.app`
5. Done — your app is live!

> Want a custom name? Go to Site Settings → Change site name → type something like `why-i-saved-it`

---

## Step 2 — Install on your Android phone

1. Open Chrome on your Android phone
2. Go to your Netlify URL
3. Chrome will show a banner: **"Add Why I Saved It to Home Screen"**
4. Tap Install → the app icon appears on your home screen like a native app

---

## Step 3 — Test the share target

1. Open TikTok on your Android phone
2. Find a restaurant video
3. Tap the **Share** button
4. Scroll through the share sheet — you'll see **"SavedIt"** as an option
5. Tap it → your app opens with the URL pre-filled
6. Add context, hit Extract, done!

---

## Getting your Anthropic API key

1. Go to **console.anthropic.com**
2. Sign up / log in
3. Go to API Keys → Create Key
4. Paste it into the app — it saves in your browser automatically

New accounts get free credits to start with.

---

## Note on iPhone

The share sheet integration doesn't work on iPhone (Apple doesn't support
Web Share Target on iOS). iPhone users can still:
- Open the app from their home screen (Add to Home Screen via Safari)
- Copy the TikTok link manually and paste it into the URL field

This is a known platform limitation — great thing to mention in your interview
as a V2 / native app upgrade path.

---

## Updating the app

Changed something in index.html? Just drag the folder to Netlify again —
it deploys in seconds.
