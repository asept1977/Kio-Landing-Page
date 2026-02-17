# KIO - Enterprise AI Ecosystem Landing Page

## Overview
Enterprise landing page for KIO, an AI assistant ecosystem. Dark, premium design with orange (#ff6a00) and deep blue (#003366) accents. Bilingual (EN/DE) support with language toggle.

## Recent Changes
- 2026-02-11: Built enterprise landing page with all sections
- 2026-02-11: Bilingual DE/EN support via i18n system
- 2026-02-11: Contact form with email, company, interest, message fields
- 2026-02-11: Dark enterprise theme with glassmorphism effects

## Project Architecture
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + framer-motion
- **Backend**: Express.js with PostgreSQL (Drizzle ORM)
- **Routing**: wouter (frontend), Express (backend API)
- **State**: TanStack Query for data fetching

### Key Files
- `client/src/pages/Home.tsx` - Main landing page with all sections
- `client/src/pages/Verbaende.tsx` - "KIO für Verbände" subpage (German)
- `client/src/pages/PublicAffairs.tsx` - "KIO für Public Affairs" subpage (German)
- `client/src/pages/KioOekosystem.tsx` - KIO Plattform overview page (German)
- `client/src/pages/KioUpdates.tsx` - Filterable product updates page (German)
- `client/src/data/updates.json` - Product update entries (add new updates here without code changes)
- `client/src/components/Navigation.tsx` - Fixed nav with lang toggle, two dropdowns (Branchen + KIO Plattform)
- `client/src/components/ContactForm.tsx` - Enterprise lead form
- `client/src/components/Footer.tsx` - Minimal footer
- `client/src/lib/i18n.ts` - Translations (EN/DE)
- `client/src/index.css` - Dark enterprise theme variables
- `shared/schema.ts` - Lead model (email, company, interest, message)
- `server/routes.ts` - POST /api/leads endpoint

### Routes
- `/` - Main landing page (bilingual EN/DE)
- `/verbaende` - "KIO für Verbände" subpage (German only)
- `/public-affairs` - "KIO für Public Affairs" subpage (German only)
- `/preise` - Pricing page with interactive configurator (German only)
- `/kio-oekosystem` - KIO Plattform overview with hero, how-it-works, architecture, updates teaser, security
- `/kio-oekosystem/updates` - Filterable product development log (data from updates.json)

### Home Page Sections
1. Hero: "Enterprise Knowledge. Orchestrated."
2. Target Groups: Public Affairs, Associations (links to /verbaende), Industry & Mittelstand
3. Architecture: KIO Agent Mesh diagram
4. Digital Sovereignty: GDPR, EU hosting, access control
5. CTA: Contact form for executive briefings

### Verbände Subpage Sections
1. Hero: "Strategische Handlungsfähigkeit."
2. Use Cases: 3 vertical timeline cards (Problem/Lösung/Impact)
3. Referenzen: BVS Bayern
4. Final CTA: "Strategiegespräch vereinbaren"

### Public Affairs Subpage Sections
1. Hero: "Politische Wirkung."
2. Use Cases: 3 vertical timeline cards (Legislative Monitoring, Stakeholder-Intelligence, Positionspapiere)
3. Referenzen: Miller & Meier Consulting, 365Sherpas
4. Final CTA: "Strategiegespräch vereinbaren"

## Saved Concepts
- **KIO Data Flow SVG**: Three.js/Canvas visualization with KIO core in center, internal tools (ERP, CRM, Miro, Outlook, SharePoint, Teams, Atlassian, Database) on the left in blue, external sources (North Data, Statista, DIP, Lobbyregister, Dun & Bradstreet) on the right in violet. Bezier cables connect nodes to KIO core with animated pulses. Includes brand logos (Microsoft, Miro, Atlassian, Statista SVG paths). Component at `client/src/components/HeroAnimation.tsx`. Currently NOT used on homepage but kept for future use.

## User Preferences
- Light/white background with dark text for content sections
- Dark blue (#05284F / #003366) hero sections with white text
- Orange (#ff6a00) accents throughout
- Navigation adapts: white text over hero, dark text when scrolled
- Bilingual German/English
