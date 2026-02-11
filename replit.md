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
- `client/src/components/Navigation.tsx` - Fixed nav with lang toggle
- `client/src/components/ContactForm.tsx` - Enterprise lead form
- `client/src/components/Footer.tsx` - Minimal footer
- `client/src/lib/i18n.ts` - Translations (EN/DE)
- `client/src/index.css` - Dark enterprise theme variables
- `shared/schema.ts` - Lead model (email, company, interest, message)
- `server/routes.ts` - POST /api/leads endpoint

### Sections
1. Hero: "Enterprise Knowledge. Orchestrated."
2. Target Groups: Public Affairs, Associations, Industry & Mittelstand
3. Architecture: KIO Agent Mesh diagram
4. Digital Sovereignty: GDPR, EU hosting, access control
5. CTA: Contact form for executive briefings

## User Preferences
- Dark enterprise design
- Orange (#ff6a00) and deep blue (#003366) accents
- Bilingual German/English
