# AquaGuard — Smart Community Water Monitor

> BIT1210 Physics for Computing · Mount Kenya University · 2026

A full-stack IoT dashboard for monitoring community water quality, level, theft detection and M-Pesa billing.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Fonts**: Syne (display) + DM Sans (body)
- **Backend**: Node.js + Express + PostgreSQL (separate repo)
- **AI**: Google Gemini API
- **Payments**: M-Pesa Daraja API

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Environment variables

Create `.env.local`:

```env
# Backend API (Node.js server)
NEXT_PUBLIC_API_URL=http://localhost:4000

# Auth secret (for JWT or next-auth)
AUTH_SECRET=your-secret-here

# Google Gemini
GEMINI_API_KEY=your-gemini-key

# M-Pesa Daraja
MPESA_CONSUMER_KEY=your-key
MPESA_CONSUMER_SECRET=your-secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your-passkey
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
```

## Project Structure

```
aquaguard/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── globals.css             # Tailwind v4 + design tokens
│   ├── page.tsx                # Landing page
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard (protected)
│   └── api/
│       └── auth/               # Auth API routes
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx     # Animated hero with live sensor preview
│   │   ├── StatsBar.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── SensorShowcase.tsx  # Physics principles per sensor
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   └── auth/
│       └── AuthModal.tsx       # Login + signup modal (event-driven)
└── lib/                        # Utilities (add auth helpers here)
```

## Auth System

The auth modal is **event-driven** — any component can open it:

```ts
// Open login modal
window.dispatchEvent(new CustomEvent("aquaguard:auth", { detail: { mode: "login" } }));

// Open signup modal  
window.dispatchEvent(new CustomEvent("aquaguard:auth", { detail: { mode: "signup" } }));
```

### To connect real auth:
1. Replace the `setTimeout` in `AuthModal.tsx` `handleSubmit` with a real fetch to `/api/auth/login`
2. Store the JWT token in an httpOnly cookie
3. Add middleware in `middleware.ts` to protect `/dashboard` routes

## Sensor Thresholds

| Sensor | Warning | Critical |
|--------|---------|----------|
| Water level | < 30% | < 10% |
| TDS (ppm) | > 300 | > 600 |
| Flow rate | > 5 L/min at night | Sustained 2AM–5AM |
| Sound | > 70 dB spike | > 85 dB sustained |

## Deployment

- **Frontend**: [Vercel](https://vercel.com) — `vercel deploy`
- **Backend**: [Render.com](https://render.com) — free tier PostgreSQL included

## Hardware BOM (Total: ~KES 8,420)

| Component | Purpose | Cost |
|-----------|---------|------|
| ESP32 NodeMCU-32S | Main MCU + WiFi | KES 2,500 |
| HC-SR04 | Water level | KES 200 |
| TDS Sensor | Water quality | KES 1,500 |
| YF-S201 | Flow tracking | KES 500 |
| KY-038 | Sound / vandalism | KES 300 |

---

AquaGuard — Clean water, tracked intelligently.
