# KIO - Enterprise AI Ecosystem Landing Page

## Overview
Enterprise landing page for KIO, an AI assistant ecosystem. Dark, premium design with orange (#ff6a00) and deep blue (#003366) accents. Bilingual (EN/DE) support with language toggle.

## Recent Changes
- 2026-02-22: New consolidated "Interessenvertretung" overview page with IHK section, security tiers, onboarding, pricing model
- 2026-02-22: Navigation updated with Interessenvertretung in Branchen dropdown; Verbände/PublicAffairs now serve as deep-dive subpages
- 2026-02-20: Rebuilt pricing page (/preise) with interactive configurator: 4-step left panel + sticky live summary, animated price transitions
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
- `client/src/pages/Interessenvertretung.tsx` - "Professionelle Interessenvertretung" overview page (German)
- `client/src/pages/Verbaende.tsx` - "KIO für Verbände" deep-dive subpage (German)
- `client/src/pages/PublicAffairs.tsx` - "KIO für Public Affairs" deep-dive subpage (German)
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
- `/interessenvertretung` - Consolidated overview: Interessenvertretung (Verbände, Public Affairs, IHK) with security tiers, onboarding, pricing
- `/verbaende` - "KIO für Verbände" deep-dive subpage (German only, links back to /interessenvertretung)
- `/public-affairs` - "KIO für Public Affairs" deep-dive subpage (German only, links back to /interessenvertretung)
- `/preise` - Interactive pricing configurator with 4 steps, live summary panel (German only)
- `/kio-oekosystem` - KIO Plattform overview with hero, how-it-works, architecture, updates teaser, security
- `/kio-oekosystem/updates` - Filterable product development log (data from updates.json)

### Home Page Sections
1. Hero: "Enterprise Knowledge. Orchestrated."
2. Target Groups: Professionelle Interessenvertretung (links to /interessenvertretung), Regulierte Branchen & Beratung (links to /verbaende), Industry & Mittelstand
3. Architecture: KIO Agent Mesh diagram
4. Digital Sovereignty: GDPR, EU hosting, access control
5. CTA: Contact form for executive briefings

### Interessenvertretung Overview Sections
1. Hero: Dark blue background, "KI-Infrastruktur für professionelle Interessenvertretung"
2. Why Structure: "Warum Struktur entscheidend ist" with 4 bullet points
3. Drei Organisationsformen: 3 cards (Verbände → /verbaende, Politikberatung → /public-affairs, IHK → #ihk)
4. Architektur & Sicherheit: 3 security tiers (Shared/Mandantenisoliert/Dediziert) + 3 trust statements
5. IHK deep-dive: 3 features (Nachvollziehbarkeit, Audit-Logging, Public-Sector-Architektur) + CTA
6. Einführung & Projektumfang: 3 fact cards (Erstgespräch, Pilotgruppe, Knowledge-Basis)
7. Preismodell: CTA linking to pricing page
8. Final CTA: "Fundierte Positionen entstehen nicht schneller – aber besser."

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

### Pricing Configurator (/preise)
Layout: Left panel (config) + Right panel (sticky live summary)
1. Step 1 – Users: Slider 1–500, default 10, base price 49€/user
2. Step 2 – Working Mode: Daily Assistance (49€/user) or Knowledge Work (119€/user)
3. Step 3 – Company Knowledge: 7-step slider (100MB=0€ to 1TB=399€/month flat)
4. Step 4 – Additional Sources: Checkboxes (Company data +19€/user, Market data +29€/user, Monitoring +39€/user)
Formula: (users × mode_price) + knowledge_price + (users × addon_sum)
Summary: Dynamic text paragraph + price breakdown + animated total
FAQ accordion at bottom

## Saved Concepts
- **KIO Data Flow SVG**: Three.js/Canvas visualization with KIO core in center, internal tools (ERP, CRM, Miro, Outlook, SharePoint, Teams, Atlassian, Database) on the left in blue, external sources (North Data, Statista, DIP, Lobbyregister, Dun & Bradstreet) on the right in violet. Bezier cables connect nodes to KIO core with animated pulses. Includes brand logos (Microsoft, Miro, Atlassian, Statista SVG paths). Component at `client/src/components/HeroAnimation.tsx`. Currently NOT used on homepage but kept for future use.

## User Preferences
- Light/white background with dark text for content sections
- Dark blue (#05284F / #003366) hero sections with white text
- Orange (#ff6a00) accents throughout
- Navigation adapts: white text over hero, dark text when scrolled
- Bilingual German/English
