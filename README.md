# 🏏 IPL Meme League — Powered by Google AI

> **A real-time second-screen engagement platform for IPL live match viewers.**  
> Built for Google Hackathon 2026 by [@iamatul369](https://github.com/iamatul369)

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vitejs.dev/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-latest-764abc?logo=redux)](https://redux-toolkit.js.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-ff0080)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🎯 Problem Statement

Cricket fans who watch IPL live matches passively lose engagement during breaks, slow overs, and strategic timeouts. Traditional second-screen experiences (polls, trivia) feel generic and fail to create a community vibe. 

**IPL Meme League** transforms passive viewers into active creators by letting them share reactions, memes, and short clips in real-time during a live match — making every ball, boundary, and wicket a moment worth celebrating!

---

## 💡 Product Vision

A **dopamine-driven**, **real-time social engagement layer** on top of IPL live streaming — where fans:
- React to live match moments with memes and short videos
- Compete on a live leaderboard to win sponsor rewards
- Feel the energy of a stadium even while watching from home

---

## ✨ Features

### 🟡 1. Team-Personalized Onboarding
- Select your favorite IPL team on app open
- The **entire app theme changes** to your team's official colors (CSK Yellow, RCB Red-Black, MI Blue-Gold, and 7 more!)
- Official IPL team logos loaded directly from the IPL CDN
- **Splash screen** with animated cricket ball and IPL anthem audio plays on every launch

### 📱 2. Live Meme Feed
- Real-time vertical feed of memes, images, and short videos shared by fans
- **Three content post modes:**
  - 🤖 **AI Meme** — prompt the Google AI to generate a cricket meme image instantly
  - ✍️ **Text** — post a quick text reaction
  - 📁 **Upload** — select an image/video from your device to share
- **Caption support** for all AI-generated memes
- **DRS Loader** — when AI is generating your meme, a "Third Umpire is Reviewing 🚦" animation plays for an immersive, cricket-native UX

### 😄 3. Cricket Emoji Reactions with Sound Effects
- 5 dedicated cricket/fun emojis: 🔥 😂 🏆 💥 🏏
- **Each emoji plays a unique sound effect** when tapped (cheer, pop, bat hit)
- Reaction counts update in real-time via Redux store
- **+5 engagement points** awarded per reaction

### 💬 4. Comments & Sharing
- **Inline comment thread** on every post — expand/collapse with animation
- **Share** button that copies a deep link to clipboard
- **+10 points** for every comment posted

### 🏆 5. Live Leaderboard
- Real-time ranking of all fans by engagement points
- **Gold 🥇 / Silver 🥈 / Bronze 🥉** rank icons for top 3
- Your own profile is highlighted with a special glow border
- **Confetti explosion 🎉** rains down every time you open the Leaderboard
- **Emotional IPL background music** plays exclusively on this screen and stops when you navigate away
- Points awarded for: Reacting (+5), Commenting (+10), Posting (+50)

### 🎥 6. Creator Studio
- Access front-facing **camera** directly in the browser (HTML5 MediaDevices API)
- Capture a photo, then click **"AI Generate Meme"** to run mock Gemini Vision processing
- Applies an IPL-themed text overlay to the captured image
- Share directly to the feed for **+50 points**
- **Cheer sound effect plays** when a meme is posted

---

## 🎨 IPL Team Themes

| Team | Primary Color | Secondary | Accent |
|------|-------------|-----------|--------|
| CSK  | 🟡 Yellow `#F9CD05` | Blue `#0081E9` | Orange |
| RCB  | 🔴 Red `#EC1C24` | Black `#000` | Gold `#D1AB3E` |
| MI   | 🔵 Blue `#004BA0` | Navy | Gold `#D1AB3E` |
| KKR  | 🟣 Purple `#3A225D` | Black | Gold |
| SRH  | 🟠 Orange `#FF822A` | Black | White |
| DC   | 🔵 Dark Blue `#00008B` | Red `#EF1B23` | Blue |
| RR   | 🩷 Pink `#EA1A85` | Navy `#001D48` | White |
| PBKS | 🔴 Red `#ED1B24` | Dark Red | White |
| GT   | 🔵 Blue `#0B4973` | Navy | Gold `#D6A848` |
| LSG  | 🟡 Orange `#F9A436` | Dark Blue | Red |

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 (Vite) |
| State Management | Redux Toolkit |
| Routing | React Router DOM v6 |
| Animations | Framer Motion |
| Audio Engine | Howler.js |
| Confetti | react-confetti |
| Icons | Lucide React |
| Typography | Google Fonts — Outfit |
| AI Image Generation | Pollinations.ai (mock Gemini Vision) |
| Avatars | DiceBear Avataaars API |

---

## 🗂️ Project Structure

```
src/
├── assets/
│   ├── ipl.mp3                    # IPL opening anthem
│   └── YTDown_Shorts_IPL-Slow...  # Emotional leaderboard BGM
│
├── store/
│   ├── store.js                   # Redux store config
│   ├── appSlice.js                # Team selection, user, points, sound
│   └── feedSlice.js               # Posts, reactions, comments
│
├── components/
│   ├── Onboarding.jsx             # Team selector + splash screen
│   ├── Navigation.jsx             # Bottom tab bar
│   ├── Feed.jsx                   # Live feed + AI post creator
│   ├── Creator.jsx                # Camera + Gemini AI meme studio
│   └── Leaderboard.jsx            # Rankings + confetti + BGM
│
├── App.jsx                        # Router, layout, theme controller
├── main.jsx                       # Redux Provider + BrowserRouter
└── index.css                      # Design system + all IPL themes
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/iamatul369/GOOGLE-APL-1.git
cd GOOGLE-APL-1

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

> **💡 Pro Tip:** For the best second-screen experience, open Chrome DevTools (F12) → Toggle Device Toolbar → Select **iPhone 14 Pro** to view in mobile mode!

### Build for Production

```bash
npm run build
```

---

## 🧠 AI Integration

### Current (POC)
The app uses **[Pollinations.ai](https://image.pollinations.ai)** as a free, open image generation endpoint to mock the Gemini Vision API call. When a user submits a prompt:

1. The app constructs a URL: `https://image.pollinations.ai/prompt/{encoded_prompt}?seed={timestamp}`
2. The image is **pre-loaded in the background** before posting to the feed
3. A **"Third Umpire DRS" animation** plays while the model generates the image
4. On success → the post appears in the feed with the generated image
5. On failure → a graceful fallback image is used

### Planned (Production)
- **Gemini 1.5 Flash API** for real-time meme template generation
- **Gemini Vision** for analyzing what's on screen and generating context-aware memes
- **Imagen 3** for high-quality meme image synthesis
- **Vertex AI** for the real-time match context pipeline

---

## 📊 Engagement & Points System

| Action | Points Awarded |
|--------|---------------|
| React to a post | +5 pts |
| Add a comment | +10 pts |
| Share a post | +0 pts (social reach) |
| Create & Post a meme | +50 pts |

Points accumulate across the match. At end of season, top fans win prizes from sponsors!

---

## 🔮 Future Scope

### 🏗️ Phase 2 — Real AI Integration
- **Gemini Live API** — analyze the live match video stream and auto-suggest meme templates relevant to the current ball/over
- **Gemini Vision** — process user-captured images and intelligently apply IPL meme overlays
- **Imagen 3** — high-fidelity meme image generation from natural language prompts
- **Multimodal prompts** — combine match score data + player faces + stadium context to generate hyper-relevant memes

### 🌐 Phase 3 — Backend & Real-Time
- **Firebase Realtime Database / Firestore** for true multi-user live feed
- **WebSocket / Firebase Live Updates** — see reactions increment in real-time across all viewers watching the same match
- **Google Cloud Run** for serverless AI inference backend
- **User authentication** with Google Sign-In

### 📡 Phase 4 — Match Context Pipeline
- **IPL API integration** — pull live score, current batsmen, bowlers, over-by-over data
- **Match situation awareness** — if a wicket falls, auto-trigger a themed meme template popup for the user to share instantly
- **Dynamic team matchup theming** — if CSK vs MI is live, the app shows both team colors split-themed

### 🎮 Phase 5 — Gamification & Monetization
- **Season-long leaderboard** with cumulative points
- **Sponsor reward redemption** — exchange points for merchandise, discounts, free streaming passes
- **Fan badges** — "Six Hitter", "Wicket Taker", "Meme Lord" based on activity
- **Team rivalry mode** — CSK fans vs RCB fans compete on the leaderboard in real-time
- **Fantasy integration** — bonus points when your fantasy team player performs well

### 📺 Phase 6 — Broadcast Integration
- **On-screen ticker** — top-voted meme of the over appears on the live broadcast
- **Hotstar / JioCinema SDK** — deep embed inside streaming apps as a side panel
- **Second-screen sync** — the feed auto-refreshes when a boundary or wicket is detected on the stream
- **AR Filters** — use Google ARCore to apply team jersey overlays on camera selfies

---

## 🤝 Built With Love For

This project was built as a **Proof of Concept (POC)** for the **Google Hackathon 2026**, demonstrating how Google AI technologies (Gemini, Imagen, Vertex AI) can transform passive sports viewers into active community participants.

---

## 📄 License

MIT © 2026 [@iamatul369](https://github.com/iamatul369)

---

<p align="center">
  Made with ❤️ and 🏏 for every IPL fan who deserves more than just watching!
</p>
