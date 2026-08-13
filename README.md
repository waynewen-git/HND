# HND Official Website

Premium musical instruments brand website — electric guitars, professional amp heads, and diode Bluetooth speakers.

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS 4** with dark/light theme
- **Framer Motion** for animations
- **Zustand** for cart state

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero carousel |
| `/products` | Product categories overview |
| `/products/[category]` | Category listing (guitars, amps, speakers) |
| `/products/[category]/[slug]` | Product detail |
| `/shop` | Shop with filter & sort |
| `/cart` | Shopping cart |
| `/checkout` | Checkout (payment placeholder) |
| `/configure` | Configurator entry (Phase 2: 3D) |
| `/about` | About HND |
| `/support` | FAQ |
| `/contact` | Contact form |
| `/stores` | Experience centers |
| `/news` | News & blog |
| `/account` | User account (demo login) |

## Product Catalog (Mock Data)

- **6 Electric Guitars** (HND-G01–G06): $699–$899, 4 colors each
- **4 Amp Heads** (HND-A01–A04): $599–$699, 2 colors each
- **1 Bluetooth Speaker** (HND-S01): $699, 2 colors

## Phase 2 (Planned)

- 3D visual configurator (React Three Fiber)
- Full order history & saved configurations
- Real payment integration
- Chinese locale + Taobao redirect
